<template>
  <div class="setting">
    <el-form label-suffix=": ">
      <el-form-item label="原密码">
        <el-input v-model="form.oldPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="form.newPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="form.validatePassword" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {updatePassword} from '@/helper/request'

export default {
  data: () => ({
    form: { oldPassword: "", newPassword: "", validatePassword: "" }
  }),
  methods: {
    submit() {
      const { oldPassword, newPassword, validatePassword } = this.form;

      if (!oldPassword) {
        return this.$message.error("请输入原密码");
      }
      if (oldPassword.length < 6) {
        return this.$message.error("密码长度不能小于6位");
      }
      if (!newPassword) {
        return this.$message.error("请输入新密码");
      }
      if (newPassword.length < 6) {
        return this.$message.error("密码长度不能小于6位");
      }
      if (!validatePassword) {
        return this.$message.error("请确认密码");
      }
      if (newPassword !== validatePassword) {
        return this.$message.error("确认密码错误");
      }
      const payload = { oldPassword, newPassword };
      updatePassword(payload)
        .then(() => {
          this.$message.success("密码修改成功");
        })
        .catch(err => this.$message.error(err.message));
    }
  }
};
</script>

<style>
</style>