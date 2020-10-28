import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "element-ui/lib/theme-chalk/index.css";
import registerElementComponents from '@/helper/registerElementComponents'
import registerCustomComponents from '@/helper/registerCustomComponents'


registerCustomComponents(Vue)
registerElementComponents(Vue)


Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
