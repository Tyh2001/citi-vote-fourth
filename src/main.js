import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import { RadioGroup, Radio, Checkbox, CheckboxGroup } from 'vant'
import tyhUi from 'tyh-ui2'
import 'tyh-ui2/style/index.css'
import 'vant/lib/index.css'

createApp(App)
  .use(router)
  .use(store)
  .use(tyhUi)
  .use(RadioGroup)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Radio)
  .mount('#app')
