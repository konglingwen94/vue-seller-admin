import {
  Dialog,
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
  Input,
  Form,
  FormItem,
  Message,
} from "element-ui";

export default (Vue) => {
  Vue.prototype.$message = Message;
  Vue.use(Input);
  Vue.use(FormItem);
  Vue.use(Form);
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
  Vue.use(Dialog);
  Vue.use(Submenu);
};
