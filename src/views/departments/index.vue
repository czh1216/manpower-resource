<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!-- 头部-->
        <TewwTools :treeNode="company" :isRoot="true" @add="dialogVisible= true" />

        <!-- 树形 -->
        <el-tree :data="treeData" :props="defaultProps" default-expand-all>
          <template v-slot="{ data }">
            <TewwTools :treeNode="data" @remove="getDepartment" @add="dialogVisible= true" />
          </template>
        </el-tree>
      </el-card>
    </div>

    <AddDept :visible="dialogVisible"></AddDept>
  </div>
</template>

<script>
import TewwTools from './components/teww-tools.vue'
import AddDept from './components/add-dept.vue'
import { getDepartmentApi } from '@/api/depts.js'
import { transListToTree } from '@/utils'
export default {
  data() {
    return {
      treeData: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' },
      ],
      defaultProps: {
        label: 'name',
      },
      company: { name: '总裁办', manager: '曹操' },

      dialogVisible: false,
    }
  },

  components: {
    TewwTools,
    AddDept,
  },

  created() {
    this.getDepartment()
  },

  methods: {
    async getDepartment() {
      const res = await getDepartmentApi()
      // console.log(res);
      this.treeData = transListToTree(res.depts, '')
    },

    onAdd() {
      console.log(123)
    },
  },
}
</script>

<style scoped lang="less"></style>
