<template>
  <div class="page-layout">
    <div class="page-layout__header">
      <slot name="header"></slot>
    </div>
    <div class="page-layout__body">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "page-layout",
};
</script>
<style lang="less" scoped>
.page-layout {
  &__header {
    margin-bottom: 40px;
  }
}
</style>
