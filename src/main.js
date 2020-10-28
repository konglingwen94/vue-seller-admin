import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "element-ui/lib/theme-chalk/index.css";

import {
  Breadcrumb,
  BreadcrumbItem,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Header,
  Button,
  Container,
  Aside,
  Main,
  Table,
  TableColumn,
} from "element-ui";

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Button);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Menu);
Vue.use(Submenu);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
