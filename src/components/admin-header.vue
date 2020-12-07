<template>
  <div id="admin-header">
    <div class="left">
      <div class="menuToggle">
        <span class="menuToggle__icon" @click="setAsideMenuCollapse(!state.asideMenuCollapse)">
          <i :class="`el-icon-s-${state.asideMenuCollapse ? 'unfold' : 'fold'}`"></i>
        </span>
      </div>
      <div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="/">活动管理</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="user">
      <el-dropdown >
        <span  >{{account.username}} <i class="el-icon-arrow-down el-icon--right"></i> </span>
        <el-dropdown-menu slot="dropdown">
           
           
          <el-dropdown-item @click.native="logout"  >退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import store from "@/store";

export default {
  name: "admin-header",
  data() {
    return {
      state: store.state,
      account:this._account
    };
  },
  inject:{
    _account:'account'
  },
  methods: {
    setAsideMenuCollapse: store.setAsideMenuCollapse,
    logout(){
      window.localStorage.clear()
      window.location.href="/auth/login"
    }
  },
};
</script>
<style lang="less" scoped>
#admin-header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}
.left {
  display: flex;
  align-items: center;
}
.menuToggle {
  display: flex;
  align-items: center;
  margin-right: 11px;
  cursor: pointer;
}
</style>
