const express = require("express");
const app = express();
require("dotenv").config({ path: `mysql/.env` }); // 반드시 mysql위에 있어야 함.
const mysql = require("mysql2/promise");
const pool = require("./mysql/index"); // MySQL 커넥션 풀 불러오기
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
require("dotenv").config({ path: `nodemailer/.env` }); // nodemailer
const nodemailer = require("./nodemailer"); // nodemailer
// const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const e = require("express");

// 환경변수 설정
dotenv.config();

app.use(cors());
// const corsOptions = {
//   origin: ["https://www.directiso.kr", "https://directiso.kr"], // SSL 적용 도메인
//   methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
//   credentials: true,
// };
// app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// function insertQuote(
//   name,
//   email,
//   product,
//   employee,
//   standards,
//   auditType,
//   locale,
//   document,
//   response,
//   auditFee
// ) {
//   pool.getConnection((err, connection) => {
//     if (err) {
//       console.error("데이터베이스 연결 중 오류가 발생했습니다.");
//       console.error(err);
//       return;
//     }

//     const query = `
//             INSERT INTO quote (name, email, product, employee, standards, audit_type, locale, document, response, audit_fee)
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//         `;
//     const values = [
//       name,
//       email,
//       product,
//       employee,
//       standards.join(", "),
//       auditType,
//       locale,
//       document,
//       response,
//       auditFee,
//     ];

//     connection.query(query, values, (error, results, fields) => {
//       connection.release(); // 커넥션 반환

//       if (error) {
//         console.error(
//           "데이터베이스에 견적 정보를 저장하는 중 오류가 발생했습니다."
//         );
//         console.error(error);
//         return;
//       }

//       console.log("견적 정보가 성공적으로 데이터베이스에 저장되었습니다.");
//     });
//   });
// }

async function insertQuote(
  name,
  email,
  contact,
  phone,
  product,
  biz_type,
  employee,
  standards,
  auditType,
  locale,
  consulting,
  document,
  response,
  internal_auditor,
  auditFee
) {
  try {
    const query = `
        INSERT INTO quote (name, email, contact_name, contact, product, biz_type, employee, standards, audit_type, locale, consulting, document, response, internal_auditor, audit_fee)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `;
    const values = [
      name,
      email,
      contact,
      phone,
      product,
      biz_type,
      employee,
      standards.join(","),
      auditType,
      locale,
      consulting,
      document,
      response,
      internal_auditor,
      auditFee,
    ];

    const [results] = await pool.query(query, values);
    console.log("견적 정보가 성공적으로 데이터베이스에 저장되었습니다.");
    return results; // 반환된 결과를 필요에 따라 사용할 수 있음
  } catch (error) {
    console.error(
      "데이터베이스에 견적 정보를 저장하는 중 오류가 발생했습니다."
    );
    console.error(error);
    throw error; // 에러를 호출자에게 전파
  }
}

// JSON 파일 로드 함수
function loadJson(filePath) {
  try {
    const data = fs.readFileSync(path.join(__dirname, filePath), {
      encoding: "utf-8",
    });
    return JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error(`파일을 찾을 수 없습니다: ${filePath}`);
    } else {
      console.error(`파일을 읽는 중 오류가 발생했습니다: ${err.message}`);
    }
    return {};
  }
}

// 해당 조건에 맞는 MD 추출 함수
function findMd(standards, auditType, employee) {
  const jsonData = loadJson("standard.json");
  let totalMd = 0;
  const riskLevel = "medium"; // 항상 medium 리스크 레벨을 사용

  for (let standard of standards) {
    const standardData = jsonData[standard] || {};
    if (Object.keys(standardData).length === 0) {
      console.warn(`경고: ${standard}에 대한 데이터가 없습니다.`);
      continue;
    }

    let found = false;
    for (let rangeKey in standardData) {
      const [low, high] = rangeKey.split("-").map(Number);

      if (low <= employee && employee <= high) {
        found = true;
        const mdValue = standardData[rangeKey][riskLevel][auditType];
        totalMd += mdValue;
        break; // 해당 범위에 대한 심사일수를 찾으면 더 이상의 범위는 확인하지 않음
      }
    }

    if (!found) {
      console.warn(`경고: 종업원 수 ${employee}명에 대한 범위가 없습니다.`);
    }
  }

  return totalMd;
}

function calculateQuote(standards, auditType, employee) {
  const jsonData = loadJson("quote.json");
  let totalFee = 0;

  standards.forEach((standard) => {
    const standardData = jsonData[standard];
    if (!standardData) {
      console.warn(`경고: ${standard}에 대한 데이터가 없습니다.`);
      return;
    }

    let found = false;
    Object.keys(standardData).forEach((rangeKey) => {
      const [low, high] = rangeKey.split("-").map(Number);
      if (employee >= low && employee <= high) {
        const fee = standardData[rangeKey][auditType];
        if (fee) {
          totalFee += fee * 1000;
          found = true;
        }
      }
    });

    if (!found) {
      console.warn(
        `경고: 종업원 수 ${employee}명에 대한 범위가 없습니다. 최대 10,700명이 넘는 경우는 10,700명으로 입력해주세요. `
      );
    }
  });

  // 표준이 2개 이상인 경우 총 금액의 80% 적용
  if (standards.length > 1) {
    totalFee *= 0.8; // 전체 금액에서 20% 할인
  }

  return totalFee;
}

// 심사신청 시 견적 정보 가져오기
async function getApplications(email) {
  try {
    const query =
      "SELECT * FROM quote WHERE email = ? ORDER BY created DESC LIMIT 1";
    const [results] = await pool.query(query, [email]);
    console.log("208 견적 정보:", results[0]);
    if (results.length === 0) {
      console.log("견적 정보가 없습니다.");
      return null;
    }
    return results[0];
  } catch (error) {
    console.error(
      "데이터베이스에서 견적 정보를 조회하는 중 오류가 발생했습니다.",
      error
    );
    return null;
  }
}

// 견적 요청 API
app.post("/api/quote", async (req, res) => {
  const {
    name,
    email,
    contact,
    phone,
    product,
    biz_type,
    employee,
    standards,
    auditType,
    locale,
    consulting,
    document,
    response,
    internal_auditor,
  } = req.body;

  console.log("229", req.body);
  console.log("종업원수 데이터 타입", typeof employee);
  console.log("name 데이터 타입", typeof name);

  // 입력값 검증
  if (
    !name ||
    !email ||
    !contact ||
    !phone ||
    !product ||
    !biz_type ||
    !employee ||
    standards.length === 0 ||
    !auditType ||
    !locale
  ) {
    res.status(400).json({ error: "모든 필수 필드를 입력해주세요." });
    return;
  }

  // 견적 산출
  let auditFee = calculateQuote(standards, auditType, employee);
  console.log(`249 견적: ${auditFee.toLocaleString()}원`);

  if (consulting) {
    auditFee += 100000;
  }
  if (document) {
    auditFee += 50000;
  }
  if (response) {
    auditFee += 50000;
  }
  if (internal_auditor) {
    auditFee += 150000;
  }

  await insertQuote(
    name,
    email,
    contact,
    phone,
    product,
    biz_type,
    employee,
    standards,
    auditType,
    locale,
    consulting,
    document,
    response,
    internal_auditor,
    auditFee
  );

  emailData = {
    name,
    email,
    contact,
    phone,
    product,
    biz_type,
    employee,
    standards,
    auditType,
    locale,
    consulting,
    document,
    response,
    internal_auditor,
    auditFee,
  };

  await sendEmail(emailData);

  return res.json({
    message: "견적산출이 끝났습니다! 견적을 확인해주세요.",
    quote: `${auditFee.toLocaleString()}원`,
    email: email,
    end_message: "만족하셨다면 인증심사를 신청하세요!",
  });
});

// 파일 업로드 경로 설정 및 multer 구성
const UPLOAD_FOLDER = "uploads/";
// fs.existsSync(UPLOAD_FOLDER) || fs.mkdirSync(UPLOAD_FOLDER);
if (!fs.existsSync(UPLOAD_FOLDER)) {
  fs.mkdir(UPLOAD_FOLDER, { recursive: true }, (err) => {
    if (err) throw err;
  });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_FOLDER);
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname).toLowerCase();
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "");
    const uniqueId = uuidv4();
    const newFilename = `${timestamp}_${uniqueId}${extension}`;
    cb(null, newFilename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB 제한
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== ".pdf" && ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      // .png 확장자 추가
      return cb(
        new Error("PDF, JPG, JPEG, PNG 파일만 업로드 가능합니다."),
        false
      );
    }
    cb(null, true);
  },
});

// 업로드 API
app.post(
  "/api/upload",
  upload.single("file"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    res.status(200).json({
      message: "File uploaded successfully",
      filename: req.file.originalname,
      new_filename: req.file.filename,
    });
  },
  (error, req, res, next) => {
    if (error) {
      res.status(400).json({ error: error.message });
      return res.status(500).json({ error: error.message });
    }
  }
);

app.get("/api/apply", async (req, res) => {
  const quoteId = req.query.id;
  console.log("325 견적 ID:", quoteId);

  if (!quoteId) {
    return res.status(400).json({ error: "견적 ID가 필요합니다." });
  }

  try {
    const applications = await getApplications(quoteId);
    console.log("333 견적 정보:", applications);

    res.json(applications);
  } catch (error) {
    console.error("서버 내부 오류:", error);
    res.status(500).json({ error: "서버 처리 중 오류가 발생했습니다." });
  }
});

// 이메일 첨부 파일 압축 API
async function compressFile(source, out) {
  const archive = archiver("zip", { zlib: { level: 9 } }); // 압축 레벨 설정
  const stream = fs.createWriteStream(out);

  return new Promise((resolve, reject) => {
    archive.on("error", (err) => reject(err)).pipe(stream);

    stream.on("close", () => resolve());
    archive.append(fs.createReadStream(source), {
      name: path.basename(source),
    });
    archive.finalize();
  });
}

// 인증신청 데이터 이메일 전송 API
app.post("/api/apply", upload.single("file"), async (req, res) => {
  console.log("신청서 제출 데이터:", req.body);
  console.log("347 첨부파일:", req.body.filename);
  const filename = req.body.filename;
  const message = req.body.message;
  const email = req.body.quote_id;
  // const contact_name = req.body.contact_name;
  // const contact = req.body.contact;

  console.log("filename:", filename, "email:", email, "message:", message);

  const applications = await getApplications(email);
  if (!applications || applications.length === 0) {
    return res
      .status(404)
      .json({ error: "견적 ID에 해당하는 신청 정보를 찾을 수 없습니다." });
  }
  console.log("446 applications:", applications);

  //   if (!req.file) {
  //     return res.status(400).json({ error: "파일이 첨부되지 않았습니다." });
  //   }

  const originalPath = path.join(__dirname, "uploads", filename);
  const compressedPath = path.join(__dirname, "uploads", `${filename}.zip`);

  // const attachmentPath = path.join(__dirname, "uploads", filename);
  //   console.log(`364 첨부파일 경로: ${attachmentPath}`);
  console.log("457 originalPath:", originalPath);
  console.log("457 compressedPath:", compressedPath);

  // 파일 압축
  await compressFile(originalPath, compressedPath);

  // audit_fee를 1천원 구분자 추가해서 표기
  applications.audit_fee = applications.audit_fee
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  console.log("371 applications.audit_fee:", applications.audit_fee);

  // 이메일 데이터 준비
  const emailData = {
    from: process.env.GOOGLE_MAIL,
    to: "xislounge@gmail.com",
    subject: `Wow! ISO인증 심사신청서 접수 - ${applications.name}`,
    html: `
    <p>ISO인증 심사 신청서가 접수되었습니다. 아래 정보를 확인해주세요.</p>\n\n
    <p>심사비: ${applications.audit_fee}</p>\n
    <p>회사명: ${applications.name}</p>\n
    <p>이메일: ${email}</p>\n
    <p>담당자명: ${applications.contact_name}</p>\n
    <p>연락처: ${applications.contact}</p>\n
    <p>제품명: ${applications.product}</p>\n
    <p>적용표준:  ${applications.standards}</p>\n
    <p>심사유형:  ${applications.audit_type}</p>\n
    <p>지역:  ${applications.locale}</p>\n
    <p>컨설팅옵션:  ${applications.consulting}</p>\n
    <p>문서옵션:  ${applications.document}</p>\n
    <p>심사대응옵션:  ${applications.response}</p>\n
    <p>내부심사교육:  ${applications.internal_auditor}</p>\n
    <p>문의/요청사항: ${message}</p>\n\n
    <p>첨부된 사업자등록증을 확인해주세요.</p>
    
    `,
    attachments: [
      {
        filename: `${filename}.zip`,
        path: compressedPath,
      },
    ],
  };

  // nodemailer 모듈을 이용해 이메일 전송
  try {
    await nodemailer.send(emailData);
    res.status(200).json({
      message:
        "인증심사 신청이 완료되었습니다. 심사원을 배정하겠습니다. 배정된 심사원이 연락드릴 것입니다.",
    });
  } catch (error) {
    console.error("이메일 전송 실패:", error);
    res.status(500).json({ error: "이메일 전송 중 오류가 발생했습니다." });
  }
});

// 견적산출 시도 이메일 발송 함수
async function sendEmail(emailData) {
  try {
    console.log("발송이메일 주소:", process.env.GOOGLE_MAIL);
    console.log("이메일 데이터:", emailData);
    const message = {
      from: process.env.GOOGLE_MAIL,
      to: "xislounge@gmail.com",
      subject: `Wow! ${emailData.name}님이 ISO인증 심사 견적을 받으셨습니다.`,
      html: `
            <p>견적액: ${emailData.auditFee.toLocaleString()}원</p>
            <p>견적 내용:</p>
            <ul>
                <li>기업명: ${emailData.name}</li>
                <li>이메일: ${emailData.email}</li>
                <li>담당자명: ${emailData.contact}</li>
                <li>담당자 연락처: ${emailData.phone}</li>
                <li>제품명: ${emailData.product}</li>
                <li>업종: ${emailData.biz_type}</li>
                <li>종업원 수: ${emailData.employee}명</li>
                <li>적용 표준: ${emailData.standards.join(", ")}</li>
                <li>심사 유형: ${emailData.auditType}</li>
                <li>지역: ${emailData.locale}</li>
                <li>컨설팅 옵션: ${
                  emailData.consulting ? "포함" : "미포함"
                }</li>
                <li>문서 옵션: ${emailData.document ? "포함" : "미포함"}</li>
                <li>심사 대응 옵션: ${
                  emailData.response ? "포함" : "미포함"
                }</li>
                <li>내부 심사 교육: ${
                  emailData.internal_auditor ? "포함" : "미포함"
                }</li>
            </ul>
            
        `,
    };
    await nodemailer.send(message);
    return true;
  } catch (error) {
    console.error("이메일 전송 실패:", error);
    return false;
  }
}

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
