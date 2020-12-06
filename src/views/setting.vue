<template>
  <div class="setting">
    <!-- 更改密码 -->
    <div class="card-item">
      <el-card header="更改密码">
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
            <el-button type="primary" @click="submitPass">确定</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <!-- 更改账户信息 -->
    <div class="card-item">
      <el-card header="更改账户信息">
        <el-form>
          <el-form-item label="用户名">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form>
            <el-button @click="submitAccount" type="primary">确定</el-button>
          </el-form>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { updatePassword, updateAccount } from "@/helper/request";

export default {
  data: () => ({
    form: {
      oldPassword: "",
      newPassword: "",
      validatePassword: "",
      username: "",
    },
  }),
  inject:['account'],
  
  methods: {
    submitPass() {
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
      const id=this.account.id
      updatePassword(id,payload)
        .then(() => {
          this.$message.success("密码修改成功");
        })
        .catch((err) => this.$message.error(err.message));
    },
    submitAccount() {
      const { username } = this.form;
      if (!username) {
        return this.$message.error("用户名不能为空");
      }
      const payload = { username };
      const id = this.account.id;
      updateAccount(id, payload).then(() => {
        this.$message.success("账户修改成功");
         
      });
    },
  },
};
</script>

<style scoped>
.card-item {
  margin-bottom: 50px;
}
</style>
