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
<style lang="less" scoped>
.page-layout {
  &__ header {
    margin-bottom: 40px;
  }
}
</style>
