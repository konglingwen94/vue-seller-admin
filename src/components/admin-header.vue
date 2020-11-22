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
    <div class="user">user</div>
  </div>
</template>
<script>
import store from "@/store";
 
export default {
  name: "admin-header",
  data() {
    return {
      state: store.state,
    };
  },
  methods: {
    setAsideMenuCollapse: store.setAsideMenuCollapse,
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
