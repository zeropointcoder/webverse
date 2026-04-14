import { createApp } from 'vue'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import App from './App.vue'
import router from './router'

createApp(App)
    .use(router)
    .mount('#app')
