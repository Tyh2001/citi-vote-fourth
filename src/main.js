import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import { RadioGroup, Radio, Checkbox, CheckboxGroup } from 'vant'
import { TyhButton, TyhInput, TyhIcon } from 'tyh-ui2'
import 'tyh-ui2/style/index.css'
import 'vant/lib/index.css'

createApp(App)
  .use(router)
  .use(store)
  .use(TyhInput)
  .use(RadioGroup)
  .use(TyhButton)
  .use(TyhIcon)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Radio)
  .mount('#app')
