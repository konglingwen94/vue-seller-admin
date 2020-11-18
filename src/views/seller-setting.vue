<template>
  <div class="seller" v-loading="loading">
    <!-- <pre>{{data}}</pre> -->
    <el-form label-width="100px" label-suffix=" :" :model="data">
      <el-form-item label="店铺名称">
        <el-input v-model="data.name"></el-input>
      </el-form-item>
      <el-form-item label="优惠信息">
        <el-tag
          :key="tag.type"
          v-for="tag in data.supports"
          closable
          :disable-transitions="false"
          @close="handleClose(tag._id)"
        >{{tag.description}}</el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model.trim="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm()"
        ></el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </el-form-item>
      <el-form-item label="商家信息">
        <div class="sellerInfo__item" v-for="(item,index) in data.infos" :key="index">
          <el-input v-model="data.infos[index]"></el-input>
        </div>
        <el-button type="primary" size="mini" @click="data.infos.push('')">添加</el-button>
        <el-button size="mini" type="danger" @click="data.infos.pop()">删除</el-button>
      </el-form-item>
      <el-form-item label="店铺公告">
        <el-input type="textarea" :autosize="{minRows:3,maxRows:5}" v-model="data.bulletin"></el-input>
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
          :on-success="uploadSuccess"
          :on-remove="uploadRemove"
          action="/api/admin/uploads"
          multiple
          list-type="picture-card"
        >点击上传图片</el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  fetchSeller,
  updateSeller,
  deleteUploadedFile
} from "@/helper/request";
export default {
  name: "page-seller",
  data() {
    return {
      loading: false,
      data: {},
      fileList: [],
      inputVisible: false,
      inputValue: ""
    };
  },
  created() {
    fetchSeller()
      .then(res => {
        this.data = res;
        this.fileList = res.pics.map(item => {
          return {
            url: item,
            name: item
          };
        });
      })
      .catch(err => {
        this.$message.error(err.message);
      });
  },
  methods: {
    submit() {
      let {
        name,
        supports,
        bulletin,
        deliveryPrice,
        minPrice,
        pics,
        infos
      } = this.data;

      if (!name) {
        return this.$message.error("请输入店铺名称");
      }
      if (!bulletin) {
        return this.$message.error("请输入店铺公告");
      }
      if (
        !infos.every(item => {
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
        supports = supports.map(item => ({
          type: item.type,
          description: item.description
        }));
      }

      const payload = {
        name,
        supports,
        bulletin,
        deliveryPrice,
        minPrice,
        pics,
        infos
      };

      this.loading = true;
      updateSeller(payload)
        .then(() => {
          this.$message.success("店铺信息更新成功");
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$message.error(err.message);
        });
    },
    uploadRemove(file) {
      const pics = this.data.pics;
      const targetUrl =
        file.response && file.response.path ? file.response.path : file.url;
      const filename = targetUrl.split("/").pop();
      pics.splice(
        pics.findIndex(item => item === targetUrl),
        1
      );
      deleteUploadedFile(filename)
        .then(() => {
          pics.splice(
            pics.findIndex(item => item === targetUrl),
            1
          );
        })
        .catch(err => this.$message.error(err.message));
    },
    uploadSuccess(res, file) {
      if (!this.data.pics.includes(res.path)) {
        this.data.pics.push(res.path);
      }
    },
    handleClose(id) {
      const supports = this.data.supports;
      supports.splice(
        this.data.supports.findIndex(tag => tag._id === id),
        1
      );
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      let supports = this.data.supports;

      if (inputValue) {
        supports.push({
          description: inputValue,
          type: supports.length
        });
      }
      this.inputVisible = false;
      this.inputValue = "";
    }
  }
};
</script>

<style>
</style>
<style>
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
