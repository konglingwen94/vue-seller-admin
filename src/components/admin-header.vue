<template>
  <div id="admin-header">
    <div class="menuToggle">
      <span @click="$root.$emit('menu-toggle')">切换菜单</span>
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
.menuToggle {
  cursor: pointer;
}
</style>