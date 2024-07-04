import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
// 다른 아이콘 스타일을 사용하려면 해당 라인을 추가하세요
// import { fab } from '@fortawesome/free-brands-svg-icons'
// import { far } from '@fortawesome/free-regular-svg-icons'

// 아이콘 라이브러리에 추가
library.add(fas)
// library.add(fab)
// library.add(far)

export default {
  install: (app) => {
    app.component('font-awesome-icon', FontAwesomeIcon)
  }
}
