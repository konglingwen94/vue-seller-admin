<template>
  <page-layout id="foods-editor">
    <div slot="header">
      <el-page-header @back="$router.back()" :content="pageTitle"></el-page-header>
    </div>

    <el-form label-width="auto" label-suffix=" :">
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="信息">
        <el-input v-model="form.info"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 8 }"
          v-model="form.description"
        ></el-input>
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
          :on-success="
            (file, res, fileList) => {
              if (fileList.length > 1) {
                fileList.shift();
              }
              form.image = file.path;
            }
          "
          :on-error="
            (err) => {
              $message.error(err.message);
            }
          "
          :on-change="onUploadChange"
          :on-remove="
            () => {
              fileList = [];
              form.image = '';
            }
          "
          action="http://127.0.0.1:7001/api/upload"
          :file-list="fileList"
        >
          <el-button>上传缩略图</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button @click="submit" type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </page-layout>
</template>
<script>
import { fetchOneFoods, updateOneFoods } from "@/helper/request";
import { pick } from "@/helper/utils";
export default {
  name: "foods-editor",
  data: () => ({
    form: {
      name: "",
      oldPrice: 0,
      price: 0,
      image: "",
      info: "",
      description: "",
    },
    fileList: [],
  }),
  computed: {
    pageTitle() {
      return this.$route.params.id ? "更新商品" : "添加商品";
    },
  },
  created() {
    if (this.pageTitle === "更新商品") {
      const id = this.$route.params.id;
      fetchOneFoods(id)
        .then((res) => {
          Object.assign(this.form, pick(res, Object.keys(this.form)));

          this.fileList = [
            {
              name: res.name,
              url: res.image,
            },
          ];
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    }
  },
  methods: {
    submit() {
      const { name, image, info, description, oldPrice, price } = this.form;

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
      if (!image) {
        this.$message.error("请上传商品缩略图");
        return;
      }
      const id = this.$route.params.id;
      const payload = { name, info, description, image, oldPrice, price };
      this.loading = true;
      updateOneFoods(id, payload)
        .then((res) => {
          this.$message.success("更新商品成功");
          this.loading = false;
          this.$router.push("/foods-list");
        })
        .catch((err) => {
          this.$message.error(err.message);
          this.loading = false;
        });
    },
    onUploadSuccess() {},
    onUploadChange(fileList, file, res) {},
    // onUploadRemove(fileList, file, res) {
    //     this.fileList=
    // },
  },
};
</script>
