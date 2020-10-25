<template>
  <div id="admin-header">
    <div class="menuToggle">
      <span @click="$root.$emit('menu-toggle')">切换菜单</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "admin-header"
};
</script>
<style lang="less" scoped>
.menuToggle {
  cursor: pointer;
}
</style>