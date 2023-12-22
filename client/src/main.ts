import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import { createPinia } from 'pinia'
import App from './App.vue'

//  CSS
import './styles/main.css'
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
const pinia = createPinia()
app.use(router).use(pinia)

// Install all modules under `modules/`
const modules: any = import.meta.glob('./modules/*.ts', { eager: true })
for (const path in modules)
  modules[path].install(app)

app.mount('#app')
