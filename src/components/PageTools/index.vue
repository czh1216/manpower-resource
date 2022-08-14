<template>
<!-- 头部卡片 -->
  <el-card class="box-card">
      <el-row type="flex">
          <el-col>
              <el-tag v-if="isShowLeft">
                  <i class="el-icon-info"></i>
                  <slot name="left" />
              </el-tag>
          </el-col>


          <el-col>
              <el-row type="flex" justify="end">
                  <slot name="right" />
              </el-row>
          </el-col>
      </el-row>
</el-card>
</template>

<script>
export default {
    name: 'PageTools',
  data () {
    return {

    }
  },

  props: {
      isShowLeft: {
          type: Boolean,
          default: true,
      },
      leftIcon: {
          type: String,
          default: 'el-icon-info'
      }
  },

  created () {

  },

  methods: {

  }
}
</script>

<style scoped>

</style>
