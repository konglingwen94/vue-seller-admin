<template>
  <div class="login" v-loading="loading">
    <div class="login-form-wrapper">
      <el-dialog
        :modal-append-to-body="false"
        title="管理员登录"
        center
        :visible="dialogVisible"
        :show-close="false"
      >
        <el-form>
          <el-form-item label="用户名">
            <el-input v-model="username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="password" type="password"></el-input>
          </el-form-item>
           
          <el-button
            size="medium"
            style="width:100%;margin-top:10px;padding:15px;font-size:18px"
            type="primary"
            @click="submit"
            >登录</el-button
          >
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { login } from "@/helper/request";

export default {
  data() {
    setTimeout(() => {
      this.dialogVisible = true;
    }, 200);
    return {
      username: "",
      password: "",
      loading: false,
      dialogVisible: false,
    };
  },

  methods: {
    submit() {
      const { username, password } = this;

      if (!username) {
        return this.$message.error("用户名不能为空");
      }
      if (!password) {
        return this.$message.error("密码不能为空");
      }
      this.loading = true;

      const payload = { username, password };

      login(payload)
        .then((res) => {
          window.localStorage.setItem("token", res.token);

          window.localStorage.setItem("adminInfo", JSON.stringify(res.admin));

          this.loading = false;
          this.$router.push("/seller/dashboard");
        })
        .catch((err) => {
          this.$message.error(err.message);
          this.loading = false;
        });
    },
  },
};
</script>

<style>
.login-form-wrapper .v-modal {
  background-color: #b3c0d1;
}
</style>
