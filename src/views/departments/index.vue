<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card" v-loading="loading">
        <!-- 头部-->
        <TewwTools :treeNode="company" :isRoot="true" @add="showAddDept" />

        <!-- 树形 -->
        <el-tree :data="treeData" :props="defaultProps" default-expand-all>
          <template v-slot="{ data }">
            <TewwTools
              :treeNode="data"
              @remove="getDepartment"
              @add="showAddDept"
              @edit="showEdit"
            />
          </template>
        </el-tree>
      </el-card>
    </div>

    <AddDept
    ref="addDept"
      @add-success="getDepartment"
      :visible.sync="dialogVisible"
      :currentNode="currentNode"
    ></AddDept>
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
      currentNode: {},
      loading: false
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
      this.loading = true;
      const res = await getDepartmentApi()
      // console.log(res);
      this.treeData = transListToTree(res.depts, '')
      this.loading = false
    },
    showAddDept(val) {
      this.dialogVisible = true
      this.currentNode = val
    },
    showEdit(val) {
      this.dialogVisible = true
      this.$refs.addDept.getDeptById(val.id)
      // this.currentNode = val
    }
  },
}
</script>

<style scoped lang="less"></style>
