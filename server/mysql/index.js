require("dotenv").config();
const mysql = require("mysql2/promise"); // 프로미스 지원 모듈 사용

const pool = mysql.createPool({
  connectionLimit: 10, // 동시 연결 최대 수
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

pool.getConnection((err, connection) => {
  if (err) throw err; // 연결 실패
  console.log("Connected as ID " + connection.threadId);
  connection.release(); // 연결 반환
});

module.exports = pool;
