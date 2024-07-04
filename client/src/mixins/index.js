import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'
// axios.defaults.baseURL = 'http://52.78.185.86:3000'
// axios.defaults.baseURL = 'https://www.iso1top.com'
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8' // 주고 받는 것은 json형태로 함.
axios.defaults.headers['Access-Control-Allow-Origin'] = '*' // 모든 요청을 허용함.

export default {
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    async $get(url) {
      return (
        await axios.get(url).catch((e) => {
          console.log(e)
        })
      ).data // get방식은 바로 data를 뽑아오게 되어 있음.
    },
    async $post(url, data) {
      return await axios.post(url, data).catch((e) => {
        console.log(e)
      })
    },
    async $put(url, data) {
      return await axios.put(url, data).catch((e) => {
        console.log(e)
      })
    },
    async $delete(url) {
      return await axios.delete(url).catch((e) => {
        console.log(e)
      })
    }
  }
}
