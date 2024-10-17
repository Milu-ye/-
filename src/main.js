import './assets/base.css'
import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import 'js-cookie'
import { showLoadingRequest, cloudeRequest } from './utils/request'
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
console.log(app)
// router.beforeEach((to, from, next) => {
//   if (to.path != '/login') {
//     if (Cookies.get('token') == 'aaabbb') {
//       next()
//     } else {
//       router.push({
//         path: '/login'
//       })
//     }
//   } else {
//     next()
//   }
// })
