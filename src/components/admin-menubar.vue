<template>
  <div class="admin-menubar">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      router
      :collapse="state.asideMenuCollapse"
    >
      <el-submenu index="/seller">
        <template slot="title">
          <i class="el-icon-platform-eleme"></i>
          <span slot="title">店铺管理</span>
        </template>
        <el-menu-item index="/seller/configuration"> <i class="el-icon-s-operation"></i>店铺配置 </el-menu-item>
        <el-menu-item index="/seller/dashboard"> <i class="el-icon-s-data"></i>店铺统计 </el-menu-item>
      </el-submenu>

      <el-submenu index="/1">
        <template slot="title">
          <i class="el-icon-s-management"></i>
          <span slot="title">商品管理</span>
        </template>
        <el-menu-item index="/foods-list">
          <i class="el-icon-s-data"></i>
          商品列表
        </el-menu-item>
        <el-menu-item index="/foods/add">
          <i class="el-icon-circle-plus"></i>
          添加商品
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/foods-category">
        <i class="el-icon-menu"></i>
        <span slot="title">分类管理</span>
      </el-menu-item>
      <el-menu-item index="/ratings">
        <i class="el-icon-s-comment"></i>
        <span slot="title">评价管理</span>
      </el-menu-item>

      
      <el-menu-item index="/administrator">
        <i class="el-icon-user-solid"></i>
        <span slot="title">管理员</span>
      </el-menu-item>
      <el-menu-item index="/setting">
        <i class="el-icon-setting"></i>
        <span slot="title">设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { state } from "@/store";
export default {
  name: "admin-menubar",
  data() {
    return {
      state,
    };
  },
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 800px;
}
</style>
