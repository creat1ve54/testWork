import './assets/styles/index.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { createVfm } from 'vue-final-modal'
import { mask } from 'vue-the-mask'

const app = createApp(App)

const vfm = createVfm()
app.use(vfm)
app.use(createPinia())
app.use(router)

app.directive('mask', mask)

app.mount('#app')
