import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "element-ui/lib/theme-chalk/index.css";
import {Button} from 'element-ui'

Vue.use(Button)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
