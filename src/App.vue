<template>
  <div id="app">
    <el-container>
      <el-aside width="200px">
        <admin-menubar></admin-menubar>
      </el-aside>
      <el-container>
        <el-header>
          <admin-header></admin-header>
        </el-header>
        <el-main>
         <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import AdminMenubar from "@/components/admin-menubar";
import AdminHeader from "@/components/admin-header";
export default {
  components: {
    AdminMenubar,AdminHeader
  },
};
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>
