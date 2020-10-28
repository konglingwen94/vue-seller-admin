<template>
  <page-layout id="foods-category">
    <div slot="header">
      <el-button @click="add"> 添加分类</el-button>
    </div>

    <el-table border :data="dataList">
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="特价优惠">
        <template v-slot="{ row }">
          <span>{{ row.type === 1 ? "是" : "否" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button @click="update(row.id)" type="primary">更新</el-button>
          <el-button @click="remove(row.id)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </page-layout>
</template>
<script>
import { fetchFoodsCategoryList, updateFoodsCategory } from "@/helper/request.js";
export default {
  name: "foods-category",
  data() {
    return {
      dataList: [],
      loading: false,
    };
  },
  created() {
    this.loading = true;
    fetchFoodsCategoryList()
      .then((res) => {
        this.dataList = res;
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
      });
  },
  methods: {
    add() {},
    update(id) {
      this.loading = true;
      updateFoodsCategory(id)
        .then(() => {
          return fetchFoodsCategoryList();
        })
        .then(() => {
          this.loading = false;
          this.$message.success("更新成功");
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error(err.message);
        });
    },
    remove(id) {},
    // fetchList(){

    // }
  },
};
</script>
