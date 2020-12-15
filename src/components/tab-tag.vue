<template>
  <div :class="{ 'tab-tag--active': active }" class="tab-tag" @click="$emit('click')">
    <slot></slot>
    <span @click.stop="$emit('close')" v-if="closable" class="icon-close">
      <i class="el-icon-close icon-close--inner"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: "tab-tag",
  props: {
    closable: { type: Boolean, default: true },
    active: { type: Boolean, default: false },
  },
};
</script>

<style scoped lang="less">
.tab-tag {
  border: 1px solid #aaa;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  display: inline-block;
  align-items: center;
  padding: 3px 8px;
  padding-right: 18px;
  cursor: pointer;
  border-radius: 2px;
  & + & {
    margin-left: 2px;
  }
  &--active {
    background: #42b983;
    color: #fff;
  }
}
.icon-close {
  border-radius: 50%;
  position: absolute;
  right: 3px;
  top: 50%;
  transform: translateY(-50%);
  //   display: inline-block;
  text-align: center;
  width: 20px;
  height: 20px;
  font-size: 10px;
  &:hover {
    background: #ddd;
  }
  &--inner {
    vertical-align: middle;
  }
}
</style>
