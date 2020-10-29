<template>
  <div id="foods-list">
    <!-- <pre>{{ dataList[0] }}</pre> -->
    <el-table v-loading="loading" :data="dataList" border>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="oldPrice" label="原价"></el-table-column>
      <el-table-column prop="rating" label="评价数"></el-table-column>
      <el-table-column prop="info" label="信息"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column prop="sellCount" label="销量"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button type="primary" @click="updateOne(row._id, )">更新</el-button>
          <el-button type="danger" @click="deleteOne(row._id)">删除</el-button>
        </template>
      </el-table-column>
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
  methods: {
    async deleteOne(id) {
      try {
        await this.$confirm("此食品以经删除将无法恢复，是否继续", "提示", { type: "warning" });
      } catch (error) {
        return;
      }

      deleteFoods(id)
        .then(() => {
          this.dataList.splice(
            this.dataList.findIndex((item) => item._id === id),
            1
          );
          this.$message.success('删除成功');
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    updateOne(id) {
      this.$router.push(`/foods/${id}/edit`);
    },
  },
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
