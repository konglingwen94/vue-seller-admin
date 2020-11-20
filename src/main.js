import Vue from "vue";
import VeHistogram from 'v-charts/lib/histogram.common.js'
import App from './App.vue'

import router from "./router";
import "element-ui/lib/theme-chalk/index.css";
import registerElementComponents from '@/helper/registerElementComponents'
import registerCustomComponents from '@/helper/registerCustomComponents'

Vue.component(VeHistogram.name, VeHistogram)

registerCustomComponents(Vue)
registerElementComponents(Vue)


Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
