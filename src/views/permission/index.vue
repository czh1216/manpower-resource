<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools>
        <template #left >
          <span>共26条</span>
        </template>
        <template #right>
          <el-button type="danger">普通excel导出</el-button>
          <el-button type="info">复杂表头excel导出</el-button>
          <el-button type="success">excel导入</el-button>
          <el-button type="primary">新增员工</el-button>
        </template>
      </PageTools>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  created() {},

  methods: {},
}
</script>

<style scoped lang="less"></style>
