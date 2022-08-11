<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <!-- 角色管理 -->
        <el-tab-pane label="角色管理" name="first">
          <el-button type="primary">新增角色</el-button>
<!-- 表格 -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号">
            </el-table-column>
            <el-table-column prop="name" label="角色">
            </el-table-column>
            <el-table-column prop="address" label="描述"> </el-table-column>
            <el-table-column prop="name" label="操作">
              <template>
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <!-- 公司信息 -->
        <el-tab-pane label="公司信息" name="second">
          
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getRole } from '@/api/setting'
export default {
  data() {
    return {
      activeName: 'first',
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
    }
  },

  created() {
    this.getRole()
  },

  methods: {
    async getRole() {
      const res = await getRole()
      console.log(res);
    }
  },
}
</script>

<style scoped lang="less"></style>
