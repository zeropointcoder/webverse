import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import App from './App.vue'
import router from './router/index.js'

createApp(App)
    .use(createPinia())
    .use(router)
    .mount('#app')
