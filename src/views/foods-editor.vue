<template>
  <page-layout id="foods-editor">
    <div slot="header">
      <el-page-header @back="$router.back()" :content="pageTitle"></el-page-header>
    </div>

    <el-form label-width="auto" label-suffix=" :">
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select placeholder="请选择分类" v-model="form.menuID">
          <el-option
            v-for="item in categoryOpts"
            :key="item.value"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="信息">
        <el-input v-model="form.info"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 8 }" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="原价">
        <el-input-number :step="0.1" v-model="form.oldPrice"></el-input-number>
      </el-form-item>
      <el-form-item label="售价">
        <el-input-number :step="0.1" :min="0" v-model.number="form.price"></el-input-number>
      </el-form-item>
      <el-form-item label="缩略图">
        <el-upload
          list-type="picture"
          accept=".jpg, .png, jpeg"
          :on-success="
            (file, res, fileList) => {
              form.image = file.path;

              if (fileList.length > 1) {
                fileList.shift()
                deleteUploadedFile(file)
                  
              }
            }
          "
          :on-error="
            (err) => {
              $message.error(err.message);
            }
          "
          :on-remove="handleRemoveUpload"
          action="/api/uploads"
          :file-list="fileList"
        >
          <el-button>上传缩略图</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" @click="submit" type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </page-layout>
</template>
<script>
import {
  fetchFoodsCategoryList,
  fetchOneFoods,
  updateOneFoods,
  deleteUploadedFile
} from "@/helper/request";
import { pick } from "@/helper/utils";

export default {
  name: "foods-editor",
  data: () => ({
    categoryOpts: [],
    form: {
      name: "",
      oldPrice: 0,
      price: 0,
      image: "",
      info: "",
      description: "",
      menuID: ""
    },
    fileList: [],
    loading: false
  }),
  computed: {
    pageTitle() {
      return this.$route.params.id ? "更新商品" : "添加商品";
    }
  },
  created() {
    // 获取商品分类
    fetchFoodsCategoryList()
      .then(res => {
        this.categoryOpts = res;
        // this.loading = false;
      })
      .catch(err => {
        this.$message.error(err.message);
        // this.loading = false;
      });

    if (this.pageTitle === "更新商品") {
      const id = this.$route.params.id;
      fetchOneFoods(id)
        .then(res => {
          Object.assign(this.form, pick(res, Object.keys(this.form)));
          this.fileList = [
            {
              name: res.name,
              url: res.image
            }
          ];
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    }
  },
  methods: {
    handleRemoveUpload(file) {
      this.form.image = "";
      this.deleteUploadedFile(file);
    },
    deleteUploadedFile(file) {
      if (!file.response) return;
      const filename = file.response.path.split("/").pop();
      deleteUploadedFile(filename)
         
        .catch(err => {
          this.$message.error(err.message);
        });
    },
    submit() {
      const {
        name,
        image,
        info,
        description,
        oldPrice,
        menuID,
        price
      } = this.form;

      if (!name) {
        this.$message.error("请输入名称");
        return;
      }
      if (!info) {
        this.$message.error("请输入商品信息");
        return;
      }
      //   if (!description) {
      //     this.$message.error("请输入商品描述");
      //     return;
      //   }
      if (!menuID) {
        this.$message.error("请选择商品分类");
        return;
      }
      if (!image) {
        this.$message.error("请上传商品缩略图");
        return;
      }
      const id = this.$route.params.id;
      const payload = {
        menuID,
        name,
        info,
        description,
        image,
        oldPrice,
        price
      };
      this.loading = true;
      updateOneFoods(id, payload)
        .then(res => {
          this.$message.success("更新商品成功");
          this.loading = false;
          this.$router.push("/foods-list");
        })
        .catch(err => {
          this.$message.error(err.message);
          this.loading = false;
        });
    }
  }
};
</script>
