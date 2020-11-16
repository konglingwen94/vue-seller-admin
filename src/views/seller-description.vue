<template>
  <div class="seller">
      <pre>{{data}}</pre>
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