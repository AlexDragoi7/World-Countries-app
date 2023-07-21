import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ToastPlugin from 'vue-toast-notification'
import ElementPlus from 'element-plus'

import App from './App.vue'
import router from './router'

import 'element-plus/dist/index.css'
import './styles.css'
import 'vue-toast-notification/dist/theme-bootstrap.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastPlugin)
app.use(ElementPlus)

app.mount('#app')
