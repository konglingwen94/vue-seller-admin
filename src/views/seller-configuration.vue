<template>
  <div class="seller">
    <page-layout>
      <el-page-header @back="$router.back()" slot="header" content="店铺配置"></el-page-header>
      <el-form label-width="100px" label-suffix=" :" :model="data">
        <el-form-item label="店铺名称">
          <el-input v-model="data.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺图片">
          <v-upload v-model="data.avatar"></v-upload>
        </el-form-item>
        <el-form-item label="优惠信息">
          <el-tag
            :key="tag.type"
            v-for="tag in data.supports"
            closable
            :disable-transitions="false"
            @close="handleClose(tag._id)"
            >{{ tag.description }}</el-tag
          >
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model.trim="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm()"
          ></el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">添加</el-button>
        </el-form-item>
        <el-form-item label="商家信息">
          <div class="sellerInfo__item" v-for="(item, index) in data.infos" :key="index">
            <el-input v-model="data.infos[index]"></el-input>
          </div>
          <el-button type="primary" size="mini" @click="data.infos.push('')">添加</el-button>
          <el-button size="mini" type="danger" @click="data.infos.pop()">删除</el-button>
        </el-form-item>
        <el-form-item label="店铺公告">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5 }" v-model="data.bulletin"></el-input>
        </el-form-item>
        <el-form-item label="起送价">
          <el-input-number :precision="1" :min="0" v-model="data.minPrice"></el-input-number>
        </el-form-item>
        <el-form-item label="配送费">
          <el-input-number :precision="1" :min="0" v-model="data.deliveryPrice"></el-input-number>
        </el-form-item>
        <el-form-item label="商家实景">
          <el-upload
            :fileList="fileList"
            :on-change="uploadChange"
            :on-remove="uploadRemove"
            :on-exceed="() => $message.error('商家实景最多可上传10张图片')"
            :auto-upload="false"
            action="/api/admin/uploads"
            :limit="10"
            multiple
            accept=".jpg, .png, .jpeg"
            list-type="picture-card"
            >点击上传图片</el-upload
          >
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </page-layout>
  </div>
</template>

<script>
import { pick } from "@/helper/utils";
import { fetchSeller, updateSeller, deleteUploadedFile, instance } from "@/helper/request";
export default {
  name: "page-seller",
  data() {
    return {
      loading: false,
      data: {
        _id: "",
        name: "",
        supports: [],
        infos: [],
        bulletin: "",
        avatar: "",
        minPrice: 0,
        deliveryPrice: 0,
        pics: [],
      },
      fileList: [],
      inputVisible: false,
      inputValue: "",
    };
  },
  computed: {
    getToken() {
      var token = localStorage.getItem("token");
      return `Bearer ${token}`;
    },
  },
  created() {
    fetchSeller()
      .then((res) => {
        Object.assign(this.data, pick(res, Object.keys(this.data)));
        this.fileList = res.pics.map((item) => {
          return {
            url: item,
            name: item,
          };
        });
      })
      .catch((err) => {
        this.$message.error(err.message);
      });
  },
  methods: {
    async submit() {
      let { name, avatar, supports, bulletin, deliveryPrice, minPrice, pics, infos, _id } = this.data;

      if (!name) {
        return this.$message.error("请输入店铺名称");
      }
      if (!avatar) {
        return this.$message.error("请上传店铺图片");
      }
      if (!bulletin) {
        return this.$message.error("请输入店铺公告");
      }
      if (
        !infos.every((item) => {
          return !!item.trim();
        })
      ) {
        return this.$message.error("请输入商家信息");
      }

      if (!deliveryPrice) {
        return this.$message.error("请输入配送费");
      }
      if (!minPrice) {
        return this.$message.error("请输入起送价");
      }
      if (supports.length) {
        supports = supports.map((item) => ({
          type: item.type,
          description: item.description,
        }));
      }

      await Promise.all(
        (this.deleteUploadedFiles || []).map((file) => {
          let delIndex = this.data.pics.findIndex((item) => item === file.url);
          if (delIndex > -1) {
            const pics = this.data.pics;
            const targetPic = pics[delIndex];
            const filenamePathArr = targetPic.split("/");
            const filename = filenamePathArr[filenamePathArr.length - 1];
            if (filename) {
              pics.splice(delIndex, 1);
              return deleteUploadedFile(filename)
                .then(() => {})
                .catch((err) => {
                  this.$message.error(err.message);
                });
            }
          }
        })
      );

      const uploadPics = await Promise.all(
        (this.uploadFiles || []).map((file) => {
          let formData = new FormData();

          formData.append("file", file);

          let config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };
          const uploadUrl = "/uploads";

          return instance
            .post(uploadUrl, formData, config)
            .then((res) => {
              return res.path;
            })
            .catch((err) => {
              this.$message.error(err.message);
              return Promise.reject(err);
            });
        })
      );
      pics.push(...uploadPics);

      const payload = {
        name,
        supports,
        bulletin,
        deliveryPrice,
        minPrice,
        pics,
        avatar,
        infos,
      };

      this.loading = true;
      updateSeller(_id, payload)
        .then(() => {
          this.$message.success("店铺信息更新成功");
          this.loading = false;
          this.$router.push("/");
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error(err.message);
        });
    },

    uploadRemove(file) {
      this.deleteUploadedFiles = this.deleteUploadedFiles || [];

      if (this.data.pics.includes(file.url)) {
        if (!this.deleteUploadedFiles.includes(file)) {
          this.deleteUploadedFiles.push(file);
        }
      }

      this.uploadFiles = this.uploadFiles || [];
      let delIndex = this.uploadFiles.findIndex((item) => item === file.raw);
      if (delIndex > -1) {
        this.uploadFiles.splice(delIndex, 1);
      }
    },
    uploadChange(file, fileList) {
      if (!this.uploadFiles) {
        this.uploadFiles = [];
      }

      this.uploadFiles.push(file.raw);
    },
    uploadSuccess(res, file) {
      if (!this.data.pics.includes(res.path)) {
        this.data.pics.push(res.path);
      }
    },
    handleClose(id) {
      const supports = this.data.supports;
      supports.splice(
        this.data.supports.findIndex((tag) => tag._id === id),
        1
      );
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      let supports = this.data.supports;

      if (inputValue) {
        supports.push({
          description: inputValue,
          type: supports.length,
        });
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
};
</script>

<style></style>
<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.sellerInfo__item {
  margin-bottom: 10px;
}
</style>
