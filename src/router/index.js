import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/foods-catefory",
    name: "foods-catefory",

    component: () => import(/* webpackChunkName: "foods-category" */ "../views/foods-category.vue"),
  },
  {
    path: "/foods-list",
    name: "foods-list",

    component: () => import(/* webpackChunkName: "foods-list" */ "../views/foods-list.vue"),
  },
  {
    path: "/foods/:id/edit",
    name: "foods-editor",

    component: () => import(/* webpackChunkName: "foods-editor" */ "../views/foods-editor.vue"),
  },
  {
    path: "/foods/add",
    name: "foods-editor",

    component: () => import(/* webpackChunkName: "foods-editor" */ "../views/foods-editor.vue"),
  },
  {
    path: "/ratings",
    name: "ratings",

    component: () => import(/* webpackChunkName: "ratings" */ "../views/rating.vue"),
  },
  {
    path: "/seller/dashboard",
    name: "seller-dashboard",

    component: () => import(/* webpackChunkName: "seller-dashboard" */ "../views/seller-dashboard.vue"),
  },
  {
    path: "/seller/setting",
    name: "seller-setting",

    component: () => import(/* webpackChunkName: "seller-setting" */ "../views/seller-setting.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
