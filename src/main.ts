import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'
import router from './router'
import store from './store'
import icons from './global/register-icon'

// 针对ElMessage和ElLoading等组件引入样式
import 'element-plus/theme-chalk/el-message.css'

const app = createApp(App)
app.use(icons)
app.use(store)
app.use(router)
app.mount('#app')
