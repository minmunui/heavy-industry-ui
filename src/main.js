import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { i18n } from '@/i18n/index.js'


import '@picocss/pico/css/pico.min.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


async function prepareApp() {
  if (import.meta.env.VITE_APP_API_MSW === 'true') {
    const { worker } = await import('./mocks/browser.js')
    return worker.start()
  }
  return Promise.resolve()
}

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives
})

app.use(i18n)
app.use(vuetify)

prepareApp().then(() => {
  app.mount('#app')

})
app.use(createPinia())
app.use(router)
app.config.globalProperties.$refreshInterval = 5

