import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'
import { i18n } from '@/i18n/index.js'

async function prepareApp() {
  const {worker} = await import("./mocks/browser.js")
  return worker.start();
}

const app = createApp(App)

prepareApp().then(() => {
  app.mount('#app')
})


app.use(i18n)
app.use(createPinia())
app.use(router)


