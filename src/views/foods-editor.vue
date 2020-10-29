<template>
  <div id="foods-editor">
    <el-form label-width="100px">
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="售价">
        <el-input-number v-model="form.price"></el-input-number>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { fetchOneFoods } from "@/helper/request";
import { pick } from "@/helper/utils";
export default {
  name: "foods-editor",
  data: () => ({
    form: {
      name: "",
      oldPrice: 0,
      price: 0,
      // image:0,
    },
  }),
  computed: {
    pageTitle() {
      return this.$route.params.id ? "更新商品" : "添加商品";
    },
  },
  created() {
    if (this.pageTitle === "更新商品") {
      const id = this.$route.params.id;
      fetchOneFoods(id)
        .then((res) => {
          Object.assign(this.form, pick(res, Object.keys(this.form)));
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    }
  },
};
</script>
