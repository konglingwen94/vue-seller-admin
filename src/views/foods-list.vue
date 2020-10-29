<template>
  <div id="foods-list">
      <el-table :data="dataList" border>
          <el-table-column prop="name" label="名称"></el-table-column>
      </el-table>
  </div>
</template>

<script>
import { fetchFoodsList, deleteFoods } from "@/helper/request";
export default {
  name: "foods-list",
  data: () => ({
    dataList: [],
    loading: false,
  }),
  created() {
    this.loading = true;

    fetchFoodsList()
      .then((res) => {
        this.dataList = res;
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
      });
  },
};
</script>
