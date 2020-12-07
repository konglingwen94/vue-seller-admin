<template>
  <div class="login" v-loading="loading">
    <el-form>
      <el-form-item label="用户名">
        <el-input v-model="username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "@/helper/request";

export default {
  data() {
    return {
      username: "",
      password: "",
      loading: false,
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
          this.$message.error(err.message)
          this.loading = false;
        });
    },
  },
};
</script>

<style></style>
