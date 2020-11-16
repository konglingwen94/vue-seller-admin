<template>
  <div class="seller">
      <pre>{{data}}</pre>
      <el-card title="店铺介绍"></el-card>
  </div>
</template>

<script>
import { fetchSeller } from "@/helper/request";
export default {
  name: "page-seller",
  data() {
    return {
      data: {}
    };
  },
  created() {
    fetchSeller()
      .then(res => {
        this.data = res;
      })
      .catch(err => {
        this.$message.error(err.message);
      });
  }
};
</script>

<style>
</style>