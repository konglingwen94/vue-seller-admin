<template>
  <div>
    <el-container>
      <el-aside width="auto">
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
    AdminMenubar,
    AdminHeader,
  },

  provide() {
    try {
      var account = JSON.parse(localStorage.getItem("adminInfo"));
    } catch (error) {
      return;
    }
     
    return {
      account 
    };
  },
};
</script>
<style lang="less">
.el-header,
.el-footer {
  // background-color: #b3c0d1;
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
