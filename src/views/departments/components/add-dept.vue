<template>
  <el-dialog title="添加部门" :visible="visible" width="50%">
    <span>
      <!-- 匿名插槽 -->
      <el-form label-width="120px">
        <el-form-item label="部门名称">
          <el-input style="width: 80%" placeholder="1-50个字符" />
        </el-form-item>
        <el-form-item label="部门编码">
          <el-input style="width: 80%" placeholder="1-50个字符" />
        </el-form-item>
        <el-form-item label="部门负责人">
          <el-select style="width: 80%" placeholder="请选择" />
        </el-form-item>
        <el-form-item label="部门介绍">
          <el-input
            style="width: 80%"
            placeholder="1-300个字符"
            type="textarea"
            :rows="3"
          />
        </el-form-item>
      </el-form>
    </span>
    <span slot="footer" class="dialog-footer">
      <el-button>取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {}
  },

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },

  created() {},

  methods: {},
}
</script>

<style scoped></style>
