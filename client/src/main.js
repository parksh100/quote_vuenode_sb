import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mixins from './mixins'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import fontawesome from './plugins/fontawesome'

const app = createApp(App)
app.use(store)
app.use(router)
app.mixin(mixins)
app.use(fontawesome)
app.mount('#app')
