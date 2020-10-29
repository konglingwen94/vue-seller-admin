<template>
  <div class="admin-menubar">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      router
      @select="handleSelect"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <el-submenu index="/1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">食品管理</span>
        </template>
        <el-menu-item index="/foods-list">
          <i class="el-icon-setting"></i>
          食品列表
        </el-menu-item>
        <el-menu-item index="/foods/add">
          <i class="el-icon-setting"></i>
          添加食品
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/foods-catefory">
        <i class="el-icon-menu"></i>
        <span slot="title">食品分类</span>
      </el-menu-item>
      <el-menu-item index="/rating" >
        <i class="el-icon-document"></i>
        <span slot="title">店铺评价</span>
      </el-menu-item>
      <el-menu-item index="/4">
        <i class="el-icon-setting"></i>
        <span slot="title">设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template> 

<script>
export default {
  name: "admin-menubar",
  data() {
    return {
      isCollapse: false
    };
  },
  created() {
    this.$root.$on("menu-toggle", () => {
      this.isCollapse = !this.isCollapse;
    });
  },
  methods: {
    handleSelect(index, indexPath) {
      console.log(index, indexPath);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 800px;
}
</style>