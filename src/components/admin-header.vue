<template>
  <div id="admin-header">
    <div class="left">
      <div class="menuToggle">
        <span class="menuToggle__icon" @click="$root.$emit('menu-toggle')">切换菜单</span>
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
export default {
  name: "admin-header"
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