<template>
  <div class="container mt-5">
    <div>
      <img
        src="@/assets/qtop.png"
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
                v-model="name"
                maxlength="10"
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
                v-model="email"
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
                v-model="contact"
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
                v-model="phone"
                maxlength="13"
                @input="filterInput"
              />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="product" class="form-label fw-bold"
                >주요 제품/서비스<small class="fw-light">
                  &nbsp;&nbsp; &nbsp;&nbsp; ex) 15글자 이내작성로 대표적인 것만
                  간단히 기재</small
                ></label
              >
              <input
                type="text"
                class="form-control"
                id="product"
                name="product"
                required
                v-model="product"
                maxlength="15"
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
                  v-model="bizType"
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
                  v-model="bizType"
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
                  v-model="bizType"
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
                v-model="employee"
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
                  v-model="standards"
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
                  v-model="standards"
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
                  v-model="standards"
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
                  v-model="standards"
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
                  v-model="auditType"
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
                  v-model="auditType"
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
                  v-model="auditType"
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
                      v-model="locale"
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
                      v-model="locale"
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
                      v-model="locale"
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
                      v-model="locale"
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
                      v-model="locale"
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
                      v-model="locale"
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
                      v-model="locale"
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
                      v-model="locale"
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
                      v-model="locale"
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
                  v-model="consulting"
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
                  v-model="document"
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
                  v-model="response"
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
                  v-model="internal_auditor"
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
        <div class="text-center">
          <button
            class="btn btn-primary my-5 apply-btn"
            @click="getAuditFee"
            :disabled="quote_result"
          >
            견적 요청
          </button>
        </div>
        <div v-if="loading" class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-2">견적을 계산하고 있습니다. 잠시만 기다려주세요...</p>
        </div>
      </div>
    </div>
    <div v-if="quote_result">
      <div class="alert alert-primary fs-5" role="alert">
        {{ quote_result.message }}
      </div>
    </div>
    <div
      class="container mb-5 border shadow p-3"
      id="responseContainer"
      v-if="quote_result"
    >
      <!-- <hr style="width: 50%; margin-bottom: 30px" /> -->
      <h2 class="fw-bold">견적금액: {{ quote_result.quote }}</h2>
      <!-- <p>접수코드: {{ quote_result.quote_id }}</p> -->
      <span class="text-primary"
        ><em>{{ quote_result.end_message }}</em></span
      >
      <p class="fs-5 my-3 text-primary"></p>
      <div class="text-center">
        <button class="btn btn-danger apply-btn" @click="goToApply">
          인증 신청
        </button>
      </div>
    </div>
    <div class="qbottom text-center mt-5">
      <img
        src="@/assets/qbottom.png"
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
  </div>
</template>

<script>
import axios from 'axios' // axios를 임포트합니다.
export default {
  name: 'HomeView',
  data() {
    return {
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
      quote_result: null,
      loading: false
    }
  },
  mounted() {},
  methods: {
    filterInput(event) {
      // 입력값에서 숫자와 하이픈만 허용합니다.
      this.phone = event.target.value.replace(/[^0-9-]/g, '')
    },

    async getAuditFee() {
      this.loading = true // 로딩 시작

      // 필수 입력값 체크
      if (!this.name) {
        alert('기업명을 입력해주세요.')
        this.loading = false // 입력값이 부족하므로 로딩 종료
        return
      }
      if (!this.email) {
        alert('이메일을 입력해주세요.')
        this.loading = false // 입력값이 부족하므로 로딩 종료
        return
      }
      if (!this.contact) {
        alert('담당자명을 입력해주세요.')
        this.loading = false // 입력값이 부족하므로 로딩 종료
        return
      }
      if (!this.phone) {
        alert('연락처를 입력해주세요.')
        this.loading = false // 입력값이 부족하므로 로딩 종료
        return
      }
      if (!this.product) {
        alert('주요 제품/서비스를 입력해주세요.')
        this.loading = false // 입력값이 부족하므로 로딩 종료
        return
      }
      if (!this.bizType) {
        alert('업종을 선택해주세요.')
        this.loading = false // 입력값이 부족하므로 로딩 종료
        return
      }
      if (!this.employee) {
        alert('종업원 수를 입력해주세요.')
        this.loading = false // 입력값이 부족하므로 로딩 종료
        return
      }
      if (this.standards.length === 0) {
        alert('인증표준을 선택해주세요.')
        this.loading = false // 입력값이 부족하므로 로딩 종료
        return
      }
      if (!this.auditType) {
        alert('심사유형을 선택해주세요.')
        this.loading = false // 입력값이 부족하므로 로딩 종료
        return
      }
      if (!this.locale) {
        alert('지역을 선택해주세요.')
        this.loading = false // 입력값이 부족하므로 로딩 종료
        return
      }

      this.$nextTick(() => {
        this.scrollToBottom() // DOM 업데이트가 완료된 후 스크롤을 아래로 이동
      })

      // 파라미터 데이터 생성
      const data = {
        name: this.name,
        email: this.email,
        contact: this.contact,
        phone: this.phone,
        product: this.product,
        biz_type: this.bizType,
        employee: this.employee,
        standards: this.standards,
        auditType: this.auditType,
        locale: this.locale,
        consulting: this.consulting,
        document: this.document,
        response: this.response,
        internal_auditor: this.internal_auditor
      }

      // console.log('파라미터 데이터: ', data)

      // 요청 전 3초간 대기
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // axios로 서버에 견적 요청
      try {
        const response = await axios.post('/api/quote', data)
        // console.log('견적 결과: ', response.data)
        // 결과를 화면에 표시
        this.quote_result = response.data
        this.$nextTick(() => {
          this.scrollToBottom() // DOM 업데이트가 완료된 후 스크롤을 아래로 이동
        })
      } catch (error) {
        console.error('견적 요청 실패: ', error)
      } finally {
        this.loading = false // 로딩 종료
      }
    },

    scrollToBottom() {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      })
    },

    goToApply() {
      this.$router.push({
        path: '/apply',
        query: { id: this.quote_result.email }
      })
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
</style>
