<template>
  <page-layout class="ratings">
    <!-- <pre>{{dataList[0]}}</pre> -->
    <el-table border :data="dataList">
      <el-table-column label="评价内容" prop="text"></el-table-column>
      <el-table-column label="评分" prop="score"></el-table-column>

      <el-table-column label="创建时间">
        <template v-slot="{row}">{{new Date(row.createdAt).toLocaleString()}}</template>
      </el-table-column>

      <el-table-column>
        <template v-slot="{row}">
          <el-button type="danger" @click="deleteOne(row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div slot="footer">
      <el-pagination
        background
        layout="prev,pager,next"
        :total="total"
        :page-size="pageCount"
        :current-page.sync="
        current"
        @current-change="updateList"
      ></el-pagination>
    </div>
  </page-layout>
</template>

<script>
import { fetchRatings, deleteOneRating } from "@/helper/request";
export default {
  name: "page-rating",
  created() {
    this.updateList();
  },
  data() {
    return {
      dataList: [],
      current: 1,
      total:0,
      pageCount:10
    };
  },
  methods: {
    deleteOne(id) {
      deleteOneRating(id)
        .then(() => {
          this.$message.success("删除成功");
          this.dataList.splice(
            this.dataList.findIndex(item => item._id === id),
            1
          );
        })
        .catch(err => this.$message.error(err.message));
    },
    updateList(page = 1) {
      fetchRatings({page})
        .then(res => {
          const data = res;
          res = {
            data: data.slice(0, 10),
            total: 100,
            pagination: { page: 3, pageCount: 10 }
          };
          this.dataList = res.data;
          this.currentPage = res.pagination.page;
          this.total = res.total;
          this.pageCount = res.pagination.pageCount;
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    }
  }
};
</script>

<style>
</style>