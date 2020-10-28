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
          <el-button @click="update(row._id)" type="primary">更新</el-button>
          <el-button @click="remove(row._id)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹框 -->
    <el-dialog @close="resetDialog" :title="getDialogTitle" :visible.sync="dialogVisible">
      <el-form>
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="特价类型">
          <el-switch v-model="type"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </el-dialog>
    <!-- <div slot="footer">pagination</div> -->
  </page-layout>
</template>
<script>
import {
  fetchFoodsCategoryList,
  deleteFoodsCategory,
  createFoodsCategory,
  updateFoodsCategory,
} from "@/helper/request.js";
import { pick } from "@/helper/utils.js";
export default {
  name: "foods-category",
  data() {
    return {
      dialogVisible: true,
      form: { name: "", type: -1 },
      dataList: [],
      loading: false,
      editingId: "",
    };
  },
  computed: {
    getDialogTitle() {
      return this.editingId ? "编辑" : "添加";
    },
    type: {
      get() {
        return this.form.type === 0;
      },
      set(val) {
        this.form.type = val ? 0 : -1;
      },
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
      const { name, type } = this.form;
      if (!name) {
        this.$message.error("请输入名称");
        return;
      }
      const editingId = this.editingId;
      const payload = { name, type: type ? -1 : 0 };
      this.loading = true;
      (editingId ? updateFoodsCategory(editingId, payload) : createFoodsCategory(payload))
        .then(() => {
          return fetchFoodsCategoryList();
        })
        .then(() => {
          this.loading = false;
          this.$message.success(`${editingId ? "更新" : "添加"}成功`);
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
      this.editingId = id;
      Object.assign(this.form, pick(this.form, Object.keys(this.form)));
      this.showDialog();
    },
    remove(id) {
      deleteFoodsCategory(id)
        .then(() => {})
        .catch((err) => {});
    },
  },
};
</script>
