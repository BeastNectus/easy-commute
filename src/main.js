import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./index.css"
import '@mdi/font/css/materialdesignicons.min.css';

import 'vue3-toastify/dist/index.css';

const app = createApp(App)

app.use(router)


app.mount('#app')
