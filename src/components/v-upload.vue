 <template>
  <div id="upload">
    <el-upload action="/api/admin/uploads" v-bind="attrs" :file-list="fileList">
      <slot>点击{{multipart?'上传':'更换'}}文件</slot>
    </el-upload>
  </div>
</template>
<script>
export default {
  name: "v-upload",
  data() {
    const self = this;
    const attrs = {
      ["list-type"]: "picture-card",
      multiple: self.multipart,
      ["on-remove"](file, fileList) {
        let value = fileList.map(item => {
          return (item.response && item.response.path) || item.url;
        });
        value = self.multipart ? value : value.pop() || "";
        
        self.$emit("input", value);
      },
      ["on-success"](res, file, fileList) {
        if (!self.multipart) {
          if (fileList.length > 1) {
            fileList.shift();
          }
        }
        const value = self.multipart
          ? fileList.map(item => {
              return (item.response && item.response.path) || item.url;
            })
          : res.path;

        self.$emit("input", value);
      }
    };
    return {
      attrs,
      fileList: []
    };
  },

  props: {
    value: [String, Array],
    multipart: { type: Boolean, default: false }
  },

  created() {
    const unwatch = this.$watch("value", newVal => {
      this.fileList = Array(this.newVal)
        .flat()
        .map(item => ({ name: "", url: newVal }));

      unwatch && unwatch();
    });
  }
};
</script>