import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import veProgress from "vue-ellipse-progress";
import VueClipboard from 'vue3-clipboard'

const app = createApp(App).use(veProgress);
app.use(VueClipboard, {
    autoSetContainer: true,
    appendToBody: true,
  })
  
app.mount('#app')