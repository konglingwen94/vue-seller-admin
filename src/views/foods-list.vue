<template>
  <page-layout id="foods-list">
    <el-table v-loading="loading" :data="dataList" border>
      <el-table-column type="expand">
        <div style="display:flex;justify-content:space-between;align-items:center" slot-scope="props">
          <div class="left" style="width:400px">
            <el-form label-position="left" class="">
              <el-form-item label="商品 ID">
                <div>{{ props.row._id }}</div>
              </el-form-item>

              <el-form-item label="商品分类">
                <span>{{ props.row.category && props.row.category.name }}</span>
              </el-form-item>
              <el-form-item label="商品信息">
                <span>{{ props.row.info }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.description }}</span>
              </el-form-item>
            </el-form>
          </div>
          <div class="right" style="width:200px">
            <el-image :src="props.row.image"></el-image>
          </div>
        </div>
      </el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="price" label="售价"></el-table-column>
      <el-table-column prop="oldPrice" label="原价"></el-table-column>
      <el-table-column prop="rating" label="评价数"></el-table-column>
      <!-- <el-table-column prop="info" label="信息"></el-table-column> -->
      <el-table-column label="是否在售">
        <template v-slot="{ row }">
          <span :style="`color:${row.online ? 'green' : 'red'}`">{{ row.online ? "在售" : "已下架" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sellCount" label="销量"></el-table-column>

      <el-table-column width="300px" label="操作">
        <template v-slot="{ row }">
          <el-button type="primary" @click="updateOne(row._id)">更新</el-button>
          <el-button type="danger" @click="deleteOne(row._id)">删除</el-button>
          <el-button type="success" @click="updateOneFoodStatus(row, row.online)">{{
            row.online ? "下架" : "上架"
          }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer">
      <el-pagination
        v-if="dataList.length"
        @current-change="handlePageChange"
        :current-page.sync="currentPage"
        background
        :total="total"
        layout="prev,pager,next"
      ></el-pagination>
    </div>
  </page-layout>
</template>

<script>
import { fetchFoodsList, deleteOneFoods, disableOneFood, enableOneFood } from "@/helper/request";
export default {
  name: "foods-list",
  data: () => ({
    dataList: [],
    loading: false,
    total: 30,
    currentPage: 1,
  }),
  methods: {
    handlePageChange(page = 1) {
      this.loading = true;
      fetchFoodsList({ page })
        .then((res) => {
          this.dataList = res.data;
          this.total = res.total;
          this.currentPage = res.pagination.page;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    updateOneFoodStatus(row, online) {
      const id=row.id

      const action = online ? disableOneFood(id) : enableOneFood(id);

      action
        .then(() => {
          row.online=!online
          this.$message.success(`${online ? "下架" : "上架"}成功`);
        })
        .catch((err) => this.$message.error(err.message));
    },
    async deleteOne(id) {
      try {
        await this.$confirm("此食品以经删除将无法恢复，是否继续", "提示", {
          type: "warning",
        });
      } catch (error) {
        return;
      }

      deleteFoods(id)
        .then(() => {
          this.dataList.splice(
            this.dataList.findIndex((item) => item._id === id),
            1
          );
          this.$message.success("删除成功");
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
    this.handlePageChange();
    // fetchFoodsList()
    //   .then((res) => {
    //     this.dataList = res;
    //     this.loading = false;
    //   })
    //   .catch((err) => {
    //     this.loading = false;
    //   });
  },
};
</script>
