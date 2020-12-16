<template>
  <page-layout id="foods-category">
    <div slot="header">
      <el-button @click="add">添加分类</el-button>
    </div>

    <el-table v-loading="loading" border :data="dataList">
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="商品数量" prop="foodsCount"></el-table-column>
      <el-table-column label="活动类型">
        <template v-slot="{ row }">
          <span>{{ getType(row.type) }}</span>
        </template>
      </el-table-column>
      <el-table-column width="250px" label="操作">
        <template v-slot="{ row }">
          <el-button size="small" @click="update(row._id, row)" type="primary">更新</el-button>
          <el-button size="small" @click="remove(row._id)" type="danger">删除</el-button>
          <el-button size="small" @click="$router.push({name:'foods-add',query:{categoryID:row._id}})">添加商品</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加分类弹框 -->
    <el-dialog @close="resetDialog" :title="getDialogTitle" :visible.sync="dialogVisible">
      <el-form label-width="auto" label-suffix=" :">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动类型"> 
          <el-select style="width:100%" v-model="formType" clearable placeholder="请选择优惠类型（可选）">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </el-dialog>
  </page-layout>
</template>
<script>
import {
  fetchFoodsCategoryList,
  deleteOneFoodsCategory,
  createOneFoodsCategory,
  updateOneFoodsCategory
} from "@/helper/request.js";
import { pick } from "@/helper/utils.js";

export default {
  name: "foods-category",
  data() {
    return {
      options: [
        { value: 0, label: "满减" },
        { value: 1, label: "折扣" },
        { value: 2, label: "特价" },
        { value: 3, label: "支持发票" },
        { value: 4, label: "外卖保" }
      ],
      dialogVisible: false,
      form: { name: "", type: -1 },
      dataList: [],
      loading: false,
      editingId: ""
    };
  },
  computed: {
    getDialogTitle() {
      return this.editingId ? "编辑" : "添加";
    },
    formType: {
      set(val) {
        this.form.type = val === "" ? -1 : val;
      },
      get() {
        return this.form.type === -1 ? "" : this.form.type;
      }
    }
  },
  created() {
    this.loading = true;
    fetchFoodsCategoryList()
      .then(res => {
        this.dataList = res;
        this.loading = false;
      })
      .catch(err => {
        this.loading = false;
      });
  },
  methods: {
    getType(type) {
      switch (type) {
        case 0:
          return "满减";
        case 1:
          return "折扣";
        case 2:
          return "特价";
        case 3:
          return "支持发票";
        case 4:
          return "外卖保";
      }
    },
    showDialog() {
      this.dialogVisible = true;
    },
    hideDialog() {
      this.dialogVisible = false;
    },
    resetDialog() {
      this.form.name = "";
      this.form.type = -1;
      this.editingId = "";
    },
    submit() {
      const { name, type } = this.form;
      if (!name) {
        this.$message.error("请输入名称");
        return;
      }
      const editingId = this.editingId;
      const payload = { name, type };

      this.loading = true;
      (editingId
        ? updateFoodsCategory(editingId, payload)
        : createOneFoodsCategory(payload)
      )
        .then(() => {
          return fetchFoodsCategoryList();
        })
        .then(res => {
          this.dataList = res;
        })
        .then(() => {
          this.loading = false;
          this.$message.success(`${editingId ? "更新" : "添加"}成功`);
          this.hideDialog();
        })
        .catch(err => {
          this.loading = false;
          this.$message.error(err.message);
        });
    },
    add() {
      this.showDialog();
    },
    update(id, row) {
      this.editingId = id;
      Object.assign(this.form, pick(row, Object.keys(this.form)));

      this.showDialog();
    },
    async remove(id) {
      try {
        await this.$confirm("此操作将永久删除该数据, 是否继续?", {
          type: "warning"
        });
      } catch (error) {
        return;
      }
      deleteOneFoodsCategory(id)
        .then(() => {
          const delIndex = this.dataList.findIndex(item => item._id === id);
          this.dataList.splice(delIndex, 1);
          this.$message.success("删除成功");
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    }
  }
};
</script>
