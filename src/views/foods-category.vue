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

    <!-- 弹框 -->
    <el-dialog :title="getDialogTitle" :visible.sync="dialogVisible">
      <el-form>
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <!-- <el-form-item> -->
        <!-- </el-form-item> -->
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </el-dialog>
    <!-- <div slot="footer">pagination</div> -->
  </page-layout>
</template>
<script>
import { fetchFoodsCategoryList, updateFoodsCategory } from "@/helper/request.js";
export default {
  name: "foods-category",
  data() {
    return {
      dialogVisible: true,
      form: { name: "" },
      dataList: [],
      loading: false,
      editingId: "",
    };
  },
  computed: {
    getDialogTitle() {
      return this.editingId ? "编辑" : "添加";
    },
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
    showDialog() {
      this.dialogVisible = true;
    },
    hideDialog() {
      this.dialogVisible = false;
    },
    resetDialog() {
      this.form.name = "";
      this.editingId = "";
    },
    submit() {
      if (!this.form.name) {
        this.$message.error("请输入名称");
        return;
      }

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
    add() {
      this.showDialog();
    },
    update(id) {
      this.showDialog();
    },
    remove(id) {},
    // fetchList(){

    // }
  },
};
</script>
