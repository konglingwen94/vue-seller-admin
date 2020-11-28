import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "",
  //   name: "Home",
  //   redirect: "seller/dashboard",
  //   component: Home,
  // },
  {
    path: "foods-catefory",
    name: "foods-catefory",

    component: () => import(/* webpackChunkName: "foods-category" */ "@/views/foods-category.vue"),
  },
  {
    path: "foods-list",
    name: "foods-list",

    component: () => import(/* webpackChunkName: "foods-list" */ "@/views/foods-list.vue"),
  },
  {
    path: "foods/:id/edit",
    name: "foods-editor",

    component: () => import(/* webpackChunkName: "foods-editor" */ "@/views/foods-editor.vue"),
  },
  {
    path: "foods/add",
    name: "foods-add",

    component: () => import(/* webpackChunkName: "foods-editor" */ "@/views/foods-editor.vue"),
  },
  {
    path: "ratings",
    name: "ratings",

    component: () => import(/* webpackChunkName: "ratings" */ "@/views/rating.vue"),
  },
  {
    path: "seller/dashboard",
    name: "seller-dashboard",

    component: () => import(/* webpackChunkName: "seller-dashboard" */ "@/views/seller-dashboard.vue"),
  },
  {
    path: "seller/configuration",
    name: "seller-configuration",

    component: () =>
      import(/* webpackChunkName: "seller-configuration" */ "@/views/seller-configuration.vue"),
  },
  {
    path: "setting",
    name: "setting",

    component: () => import(/* webpackChunkName: "setting" */ "@/views/setting.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes: [
    {
      name: "authLayout",
      path: "/auth",
      component: () => import(/* webpackChunkName:'auth' */ "@/layout/auth.vue"),
      children: [
        {
          name: "login",
          path: "login",
          component: () => import("@/views/login"),
        },
      ],
    },
    {
      name: "basicLayout",
      path: "/",
      component: () => import(/* webpackChunkName:'basiclayout' */ "@/layout/basic.vue"),
      children: routes,
    },
    {
      path: "*",
      redirect: "/seller/dashboard",
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.path === "/auth/login") {
    return next();
  }
  const accessToken = localStorage.getItem("token");

  return accessToken ? next() : next("/auth/login");
});

export default router;
