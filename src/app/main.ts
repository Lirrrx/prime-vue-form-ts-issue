import './assets/main.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

import App from './App.vue'
import router from './router'
import { theme } from './providers/theme'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: theme,
  },
})
app.use(ToastService)

app.mount('#app')
