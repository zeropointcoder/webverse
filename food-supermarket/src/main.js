import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import 'vue-toastification/dist/index.css'
import App from './App.vue'
import router from './router/index.js'
import Toast from 'vue-toastification'

createApp(App)
    .use(createPinia())
    .use(router)
    .use(Toast, {
        position: 'top-right',
        timeout: 2500
    })
    .mount('#app')
