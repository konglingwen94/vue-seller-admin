<template>
  <div class="uploader">
    <el-upload
      v-bind="$attrs"
      action="/api/admin/uploads"
      ref="uploader"
      :headers="{authorization:getToken}"
      :on-error="handlerError"
      :on-success="handlerSuccess"
      :on-change="handlerChange"
      :on-remove="handlerRemove"
      :file-list="fileList"
      :multiple="multipart"
      :list-type="$attrs['list-type'] || 'picture-card'"
      accept=".jpg, .png, jpeg"
    >
      <slot>点击上传文件</slot>
    </el-upload>
  </div>
</template>
<script>
export default {
  name: "uploader",

  props: {
    multipart: {
      type: Boolean,
      default: false
    },
    fileList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    getToken() {
      const token = localStorage.getItem("token");

      return `Bearer ${token}`;
    }
  },
  methods: {
    handlerError(err) {
      this.$message.error(err.message);
      this.$emit("error");
    },
    handlerSuccess(res, file, fileList) {
      const uploadFile = this.multipart
        ? fileList.map(item => {
            return item.response ? item.response.path : item.url;
          })
        : res.path;
      this.$emit("success", uploadFile);
    },
    handlerChange(file, fileList) {
      if (!this.multipart) {
        if (fileList.length > 1) {
          fileList.shift();
        }
      }
      this.$emit("change", file, fileList);
      this.fileList.length = 0;
      this.fileList.push(...fileList);
    },
    handlerRemove(file, fileList) {
      this.$emit("change", file, fileList);

      this.$emit("remove", file, fileList);
      if (this.fileList.indexOf(file) > -1) {
        this.fileList.splice(this.fileList.indexOf(file), 1);
      }
    }
  }
};
</script>