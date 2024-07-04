<template>
  <div class="container mt-5">
    <div>
      <img
        src="@/assets/atop.png"
        alt="견적의뢰상단이미지"
        style="width: 100%"
      />
    </div>
    <div>
      <div>
        <h2 class="fw-bold mt-5 noto-sans-kr-extra-bold">기업 정보</h2>
        <p>기본정보를 입력해 주세요.</p>
        <div class="border p-3 rounded bg-light">
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="name" class="form-label fw-bold">기업명</label>
              <input
                type="text"
                class="form-control"
                id="name"
                name="name"
                required
                v-model="quote_result.name"
                disabled
              />
            </div>
            <div class="col-md-6">
              <label for="email" class="form-label fw-bold">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                name="email"
                required
                v-model="quote_result.email"
              />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="phone" class="form-label fw-bold"
                >담당자명<small class="fw-light">
                  &nbsp;&nbsp; &nbsp;&nbsp; ex) 홍길동/과장</small
                ></label
              >
              <input
                type="text"
                class="form-control"
                id="contact"
                name="contact"
                required
                v-model.trim="quote_result.contact_name"
                maxlength="6"
              />
            </div>
            <div class="col-md-6">
              <label for="phone" class="form-label fw-bold"
                >담당자 연락처<small class="fw-light">
                  &nbsp;&nbsp; &nbsp;&nbsp; ex) 010-1234-578</small
                ></label
              >
              <input
                type="tel"
                class="form-control"
                id="phone"
                name="phone"
                required
                v-model="quote_result.contact"
                maxlength="13"
                @input="filterInput"
              />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="phone" class="form-label fw-bold"
                >주요 제품/서비스<small class="fw-light">
                  &nbsp;&nbsp; &nbsp;&nbsp; ex) 건축공사, 페인트의 제조,
                  경영컨설팅 서비스</small
                ></label
              >
              <input
                type="text"
                class="form-control"
                id="product"
                name="product"
                required
                v-model="quote_result.product"
                disabled
              />
            </div>
            <div class="col-md-6">
              <label for="bizType" class="form-label pt-sm-2 fw-bold"
                >업종</label
              ><br />
              <!-- 제목과 첫 체크박스 사이에 줄바꿈 추가 -->
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="bizType"
                  id="manufacture"
                  value="manufacture"
                  required
                  v-model="quote_result.biz_type"
                  disabled
                />
                <label
                  class="form-check-label noto-sans-kr-light"
                  for="manufacture"
                  >제조업</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="bizType"
                  id="construction"
                  value="construction"
                  v-model="quote_result.biz_type"
                  disabled
                />
                <label
                  class="form-check-label noto-sans-kr-light"
                  for="construction"
                  >건설/설치/시공업</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="bizType"
                  id="service"
                  value="service"
                  v-model="quote_result.biz_type"
                  disabled
                />
                <label class="form-check-label noto-sans-kr-light" for="service"
                  >기타</label
                >
              </div>
            </div>
          </div>
        </div>

        <h2 class="fw-bold mt-5 noto-sans-kr-extra-bold">인증표준 정보</h2>
        <p>견적산출을 위한 정보를 입력해주세요.</p>
        <div class="border p-3 rounded bg-light">
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="name" class="form-label fw-bold"
                >종업원 수
                <small class="fw-light">
                  &nbsp;&nbsp;*유효한 종업원 수</small
                ></label
              >
              <input
                type="number"
                class="form-control"
                id="employee"
                name="employee"
                min="0"
                step="1"
                required
                v-model="quote_result.employee"
                disabled
              />
            </div>
            <div class="col-md-6"></div>
          </div>

          <div class="row mb-3 mt-3">
            <div class="col-md-6">
              <label for="name" class="form-label fw-bold">인증표준 </label>
              <br />
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="qms"
                  value="qms"
                  name="standards"
                  :checked="quote_result.standards.includes('qms')"
                  disabled
                />
                <label class="form-check-label noto-sans-kr-light" for="qms"
                  >ISO 9001</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="ems"
                  value="ems"
                  name="standards"
                  :checked="quote_result.standards.includes('ems')"
                  disabled
                />
                <label class="form-check-label noto-sans-kr-light" for="ems"
                  >ISO14001</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="ohsms"
                  value="ohsms"
                  name="standards"
                  :checked="quote_result.standards.includes('ohsms')"
                  disabled
                />
                <label class="form-check-label noto-sans-kr-light" for="ohsms"
                  >ISO45001</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="cms"
                  value="cms"
                  name="standards"
                  :checked="quote_result.standards.includes('cms')"
                  disabled
                />
                <label class="form-check-label noto-sans-kr-light" for="cms"
                  >ISO22716</label
                >
              </div>
            </div>
            <div class="col-md-6">
              <label for="auditType" class="form-label fw-bold">심사유형</label
              ><br />
              <!-- 제목과 첫 체크박스 사이에 줄바꿈 추가 -->
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="auditType"
                  id="initial"
                  value="initial"
                  required
                  v-model="quote_result.audit_type"
                  disabled
                />
                <label class="form-check-label noto-sans-kr-light" for="initial"
                  >최초심사</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="auditType"
                  id="surveillance"
                  value="surveillance"
                  v-model="quote_result.audit_type"
                  disabled
                />
                <label
                  class="form-check-label noto-sans-kr-light"
                  for="surveillance"
                  >사후심사</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="auditType"
                  id="renewal"
                  value="renewal"
                  v-model="quote_result.audit_type"
                  disabled
                />
                <label class="form-check-label noto-sans-kr-light" for="renewal"
                  >갱신심사</label
                >
              </div>
            </div>
          </div>

          <div class="row mb-3 mt-3">
            <div class="col-md-12">
              <label for="auditType" class="form-label fw-bold">지역</label
              ><br />
              <!-- 제목과 첫 체크박스 사이에 줄바꿈 추가 -->
              <div class="row">
                <!-- 서울/경기 -->
                <div class="col-4 col-md-4 col-lg-2">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="locale"
                      id="seoul"
                      value="seoul"
                      required
                      v-model="quote_result.locale"
                      disabled
                    />
                    <label
                      class="form-check-label noto-sans-kr-light"
                      for="seoul"
                      >서울/경기</label
                    >
                  </div>
                </div>
                <!-- 강원 -->
                <div class="col-4 col-md-4 col-lg-2">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="locale"
                      id="kangwon"
                      value="kangwon"
                      v-model="quote_result.locale"
                      disabled
                    />
                    <label
                      class="form-check-label noto-sans-kr-light"
                      for="kangwon"
                      >강원</label
                    >
                  </div>
                </div>
                <!-- 충청 -->
                <div class="col-4 col-md-4 col-lg-2">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="locale"
                      id="chungcheong"
                      value="chungcheong"
                      v-model="quote_result.locale"
                      disabled
                    />
                    <label
                      class="form-check-label noto-sans-kr-light"
                      for="chungcheong"
                      >충청</label
                    >
                  </div>
                </div>
                <!-- 나머지 지역 반복 -->
                <!-- 전라 -->
                <div class="col-4 col-md-4 col-lg-2">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="locale"
                      id="junla"
                      value="junla"
                      v-model="quote_result.locale"
                      disabled
                    />
                    <label
                      class="form-check-label noto-sans-kr-light"
                      for="junla"
                      >전라</label
                    >
                  </div>
                </div>
                <!-- 경상 -->
                <div class="col-4 col-md-4 col-lg-2">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="locale"
                      id="gyungsang"
                      value="gyungsang"
                      v-model="quote_result.locale"
                      disabled
                    />
                    <label
                      class="form-check-label noto-sans-kr-light"
                      for="gyungsang"
                      >경상</label
                    >
                  </div>
                </div>
                <!-- 베트남 -->
                <div class="col-4 col-md-4 col-lg-2">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="locale"
                      id="vietnam"
                      value="vietnam"
                      v-model="quote_result.locale"
                      disabled
                    />
                    <label
                      class="form-check-label noto-sans-kr-light"
                      for="vietnam"
                      >베트남</label
                    >
                  </div>
                </div>
                <!-- 인도네시아 -->
                <div class="col-4 col-md-4 col-lg-2">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="locale"
                      id="indonesia"
                      value="indonesia"
                      v-model="quote_result.locale"
                      disabled
                    />
                    <label
                      class="form-check-label noto-sans-kr-light"
                      for="indonesia"
                      >인도네시아</label
                    >
                  </div>
                </div>
                <!-- 캄보디아 -->
                <div class="col-4 col-md-4 col-lg-2">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="locale"
                      id="cambodia"
                      value="cambodia"
                      v-model="quote_result.locale"
                      disabled
                    />
                    <label
                      class="form-check-label noto-sans-kr-light"
                      for="cambodia"
                      >캄보디아</label
                    >
                  </div>
                </div>
                <!-- 필리핀 -->
                <div class="col-4 col-md-4 col-lg-2">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="locale"
                      id="philippines"
                      value="philippines"
                      v-model="quote_result.locale"
                      disabled
                    />
                    <label
                      class="form-check-label noto-sans-kr-light"
                      for="philippines"
                      >필리핀</label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 class="fw-bold mt-5 noto-sans-kr-extra-bold">선택 정보</h2>
        <p>필요한 선택항목을 추가하세요. 인증획득이 더욱 원활해집니다.</p>
        <div class="border p-3 rounded bg-light">
          <div class="row mb-md-2">
            <div class="col-md-6">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value="consulting"
                  id="consulting"
                  name="consulting"
                  v-model="isConsultingChecked"
                  disabled
                />
                <label class="form-check-label text-primary" for="consulting">
                  시스템 구축 지도 / 자문 &nbsp;&nbsp;<small
                    class="noto-sans-kr-light text-muted"
                  >
                    (+ 100,000원)</small
                  >
                </label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value="document"
                  id="document"
                  name="document"
                  v-model="isDocumentChecked"
                  disabled
                />
                <label class="form-check-label text-primary" for="document">
                  시스템 문서 지원&nbsp;&nbsp;<small
                    class="noto-sans-kr-light text-muted"
                  >
                    (+ 50,000원)</small
                  >
                </label>
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-6">
              <div class="form-check muted">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value="response"
                  id="response"
                  name="response"
                  v-model="isResponseChecked"
                  disabled
                />
                <label class="form-check-label text-primary" for="response">
                  심사대응 지원&nbsp;&nbsp;<small
                    class="noto-sans-kr-light text-muted"
                  >
                    (+ 50,000원)</small
                  >
                </label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value="internal_auditor"
                  id="internal_auditor"
                  name="internal_auditor"
                  v-model="isInternalAuditorChecked"
                  disabled
                />
                <label
                  class="form-check-label text-primary"
                  for="internal_auditor"
                >
                  내부심사원 교육 &nbsp;&nbsp;<small
                    class="noto-sans-kr-light text-muted"
                  >
                    (+ 150,000원)</small
                  >
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- 사업자등록증 첨부 -->
        <h2 class="fw-bold mt-5 noto-sans-kr-extra-bold">사업자등록증 첨부</h2>
        <p>사업자등록증을 첨부해주세요.</p>
        <div class="border p-3 rounded bg-light">
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="bizReg" class="form-label fw-bold"
                >사업자등록증 첨부
                <small class="text-danger"
                  >(pdf, image파일만 가능, 최대용량 3MB )</small
                ></label
              >
              <input
                class="form-control"
                type="file"
                accept="application/pdf, image/*"
                accept-charset="utf-8"
                required
                @change="uploadFile"
              />
            </div>
            <div class="col-md-6">
              <label class="form-label fw-bold"
                >문의 및 요청사항<small class="fw-light">
                  &nbsp;&nbsp; &nbsp;&nbsp; 문의사항이나 요청사항을
                  입력해주세요.</small
                ></label
              >
              <textarea
                class="form-control"
                name="message"
                id="message"
                cols="30"
                rows="1"
                placeholder=""
                v-model="message"
                @input="checkInput"
                maxlength="50"
              ></textarea>
              <p>{{ message.length }}/50</p>
            </div>
          </div>
        </div>
        <div class="text-center">
          <button
            class="btn btn-primary my-5 apply-btn"
            @click="doApply"
            :disabled="applicationResult"
          >
            인증신청
          </button>
        </div>
        <div class="abottom text-center mt-5">
          <img
            src="@/assets/abottom.png"
            alt="견적의뢰하단이미지"
            style="width: 50%"
          />
        </div>
        <div class="footer text-center my-5">
          <img
            src="@/assets/footer.png"
            alt="견적의뢰하단이미지"
            style="width: 100%"
          />
        </div>
        <div v-if="loading" class="text-center">
          <span>네트워크 환경에 따라 최대 30초까지 소요될 수 있습니다. </span>
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p>{{ elapsedSeconds }}초 경과</p>
        </div>
        <div
          v-if="applicationResult"
          class="alert alert-success mb-5"
          role="alert"
        >
          {{ applicationMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios' // axios를 임포트합니다.
export default {
  name: 'HomeView',
  data() {
    return {
      id: '',
      name: '',
      email: '',
      contact: '',
      phone: '',
      product: '',
      bizType: '',
      employee: 1,
      standards: [],
      auditType: '',
      locale: '',
      consulting: false,
      document: false,
      response: false,
      internal_auditor: false,
      quote_result: {
        name: '',
        email: '',
        contact_name: '',
        contact: '',
        product: '',
        biz_type: '',
        employee: 1,
        standards: [],
        audit_type: '',
        locale: '',
        consulting: 'false',
        document: 'false',
        response: 'false',
        internal_auditor: 'false'
      },
      loading: false,
      quoteId: '0',
      filename: '',
      message: '',
      elapsedSeconds: 0,
      timer: null, // 타이머를 저장할 변수 추가
      applicationResult: false,
      applicationMessage: ''
    }
  },
  created() {
    this.id = this.$route.query.id
    // console.log('넘어온 견적번호: ', this.id)
  },
  computed: {
    isConsultingChecked() {
      return this.quote_result.consulting === '1'
    },
    isDocumentChecked() {
      return this.quote_result.document === '1'
    },
    isResponseChecked() {
      return this.quote_result.response === '1'
    },
    isInternalAuditorChecked() {
      return this.quote_result.internal_auditor === '1'
    }
  },
  mounted() {
    if (this.id) {
      this.getQuote(this.id)
    }
  },
  methods: {
    filterInput(event) {
      // 입력값에서 숫자와 하이픈만 허용합니다.
      this.quote_result.contact = event.target.value.replace(/[^0-9-]/g, '')
    },
    // 글자수 제한
    checkInput() {
      // 스크립트 태그 및 기타 잠재적으로 위험한 내용을 필터링
      this.message = this.message.replace(/<script.*?>.*?<\/script>/gi, '')
      this.message = this.message.replace(/javascript:/gi, '')
      this.message = this.message.replace(/onerror=|onload=|onclick=/gi, '')
    },

    // 페이지가 로드되면 넘어온 접수번호에 해당하는 데이터를 불러옵니다.
    getQuote(quoteId) {
      // console.log('견적번호로 데이터 불러오기: ', quoteId)
      // axios로 서버에 견적 요청
      axios
        .get(`/api/apply?id=${quoteId}`)
        .then((response) => {
          let standardsArray = []
          if (Array.isArray(response.data.standards)) {
            standardsArray = response.data.standards.map((s) => s.trim())
          } else if (typeof response.data.standards === 'string') {
            standardsArray = response.data.standards
              .split(',')
              .map((s) => s.trim())
          }
          this.quote_result = {
            ...this.quote_result,
            ...response.data,
            standards: standardsArray
          }
        })
        .catch((error) => {
          console.error('견적 요청 실패: ', error)
        })
    },

    uploadFile(event) {
      // console.log('파일 업로드 이벤트: ', event)
      const file = event.target.files[0]
      if (!file) {
        alert('파일을 선택해주세요.')
        return
      }

      const formData = new FormData()
      formData.append('file', file)

      // 파일 크기 제한 (3MB)
      const maxFileSize = 3 * 1024 * 1024 // 3MB
      if (file.size > maxFileSize) {
        alert('파일 크기가 3MB를 초과합니다. 파일 크기를 확인해주세요.')
        event.target.value = '' // 파일 선택창 초기화
        return
      }

      axios
        .post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          alert('파일 업로드 성공!')
          // console.log('파일 업로드 성공: ', response)
          // console.log('업로드된 파일메세지: ', response.data.message)
          // console.log('업로드된 status: ', response.status)
          // console.log('업로드된 filename: ', response.data.filename)
          // console.log('업로드된 filepath: ', response.data.new_filename)
          this.filename = response.data.new_filename
        })
        .catch((error) => {
          console.error('파일 업로드 실패: ', error)
        })
    },

    async doApply() {
      if (!this.filename) {
        alert('사업자등록증을 업로드해주세요.')
        return
      }

      this.loading = true
      this.elapsedSeconds = 0
      this.timer = setInterval(() => {
        this.elapsedSeconds += 1 // 경과 시간 증가
      }, 1000) // 1초마다 실행

      const applyData = {
        filename: this.filename,
        message: this.message,
        quote_id: this.id
      }

      this.$nextTick(() => {
        this.scrollToBottom() // DOM 업데이트가 완료된 후 스크롤을 아래로 이동
      })

      try {
        await axios.post('/api/apply', applyData)
        // console.log('인증신청 성공: ', response)
        // alert('인증신청이 완료되었습니다.')
        this.loading = false
        this.applicationResult = true
        this.applicationMessage =
          '인증신청이 완료되었습니다. 전담 매니저가 곧 연락드리도록 하겠습니다. 감사합니다.'

        // this.$router.push('/')
      } catch (error) {
        console.error('인증신청 실패: ', error)
        alert('인증신청에 실패했습니다. 다시 시도해주세요.')
      } finally {
        this.loading = false
        clearInterval(this.timer) // 타이머 중지
      }
    },

    scrollToBottom() {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      })
    },

    beforeDestroy() {
      // 컴포넌트가 파괴되기 전 타이머를 중지
      if (this.timer) {
        clearInterval(this.timer)
      }
    }
  }
}
</script>

<style scoped>
* {
  font-family: 'Noto Sans KR', sans-serif;
  /* font-family: 'sans-serif'; */
}
.mobile-only {
  display: none; /* 기본적으로는 보이지 않음 */
}

@media (max-width: 768px) {
  .mobile-only {
    display: block; /* 모바일 화면에서만 보임 */
  }
}

.apply-btn {
  border-radius: 20px; /* 둥근 모서리를 위한 반지름 설정 */
  padding: 10px 20px; /* 버튼 내부의 여백 */
  background-color: #4caf50; /* 버튼의 배경 색상 */
  color: white; /* 버튼의 글자 색상 */
  border: none; /* 버튼 테두리 제거 */
  cursor: pointer; /* 마우스 오버 시 커서 변경 */
  transition: background-color 0.3s; /* 색상 변경 애니메이션 효과 */
}

.apply-btn:hover {
  background-color: #45a049; /* 마우스 오버 시 배경 색상 변경 */
}
</style>
