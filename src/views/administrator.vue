<template>
  <page-layout id="administrator">
    <el-table border :data="dataList">
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="角色">
        <template v-slot="{row}">{{row.role==='ROOT'?'超级管理员':row.role==='JUNIOR'?'初级管理员':''}}</template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template v-slot="{row}">{{new Date(row.createdAt).toLocaleString()}}</template>
      </el-table-column>
    </el-table>
  </page-layout>
</template>
<script>
import { fetchAdministratorList } from "@/helper/request";
export default {
  name: "Administrator",
  data() {
    return {
      dataList: []
    };
  },
  created() {
    fetchAdministratorList()
      .then(res => {
        this.dataList = res;
      })
      .catch(err => this.$message.error(err.message));
  }
};
</script>