<template>
  <page-layout class="ratings">
     

    <div slot="header">
      <el-button @click="deleteMany" :disabled="!selectionIdList.length" type="danger"
        >删除勾选的数据</el-button
      >
    </div>

    <el-table border :data="dataList" @selection-change="selectionChange">
      <el-table-column label="评价内容" type="selection"></el-table-column>
      <el-table-column label="评价商品" prop="food.name"></el-table-column>
      <el-table-column label="评价内容" prop="text"></el-table-column>
      <el-table-column label="评分（0-5）" prop="score"> </el-table-column>
      <el-table-column label="评价等级">
        <template v-slot="{ row }">{{ row.rateType === 0 ? "好评" : "差评" }}</template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template v-slot="{ row }">{{ new Date(row.createdAt).toLocaleString() }}</template>
      </el-table-column>

      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button type="danger" @click="deleteOne(row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div slot="footer">
      <el-pagination
        background
        layout="prev,pager,next"
        :total="total"
        :page-size="pageSize"
        :current-page.sync="currentPage"
        @current-change="updateList"
      ></el-pagination>
    </div>
  </page-layout>
</template>

<script>
import { fetchRatings, deleteOneRating, deleteManyRatings } from "@/helper/request";
export default {
  name: "page-rating",
  created() {
    this.updateList();
  },
  data() {
    return {
      dataList: [],
      selectionIdList: [],
      currentPage: 1,
      total: 0,
      pageSize: 10,
    };
  },
  methods: {
    selectionChange(selection) {
      this.selectionIdList = selection.map((item) => item._id);
    },
    async deleteMany() {
      try {
        await this.$confirm("您勾选的数据以经删除将无法恢复，是否继续?", {
          type: "warning",
        });
      } catch (error) {
        return;
      }
      const idList = this.selectionIdList;

      deleteManyRatings({ idList }).then(() => {
        this.$message.success(`成功删除 ${idList.length} 条数据`);
        this.updateList(
          idList.length >= this.dataList.length ? Math.max(this.currentPage - 1, 1) : this.currentPage
        );
      });
    },
    deleteOne(id) {
      deleteOneRating(id)
        .then(() => {
          this.$message.success("删除成功");
          this.updateList(this.dataList.length === 1 ? Math.max(this.currentPage - 1, 1) : this.currentPage);
        })
        .catch((err) => this.$message.error(err.message));
    },
    updateList(page = 1) {
      fetchRatings({ page })
        .then((res) => {
          this.dataList = res.data;
          this.currentPage = res.pagination.page;
          this.total = res.total;
          this.pageSize = res.pagination.pageSize;
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
  },
};
</script>

<style></style>
