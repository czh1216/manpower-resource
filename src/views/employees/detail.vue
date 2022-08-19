<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="AppihandleClick">
          <el-tab-pane name="qwer" label="登录账户设置">
            <!-- 放置表单 -->
            <el-form
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名:">
                <el-input style="width: 300px" v-model="formData.username" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                  v-model="formData.password"
                  style="width: 300px"
                  type="password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSave">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane name="asdf" label="个人详情">
              <UserInfo></UserInfo>
          </el-tab-pane>
          <el-tab-pane name="zxcv" label="岗位信息">
            <jobInfo></jobInfo>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetail, saveUserDetailById } from '@/api/user'
import UserInfo from './components/user-info.vue'
import Cookies from 'js-cookie'
import jobInfo from './components/job-info.vue'
export default {
  data() {
    return {
      userId: this.$route.params.id,
      formData: {},
      activeName: Cookies.get('employeeDetailTab') || 'qwer'
    }
  },

  created() {
    this.getUserDetail()
  },
  components: {
      UserInfo,
      jobInfo
  },

  methods: {
    async getUserDetail() {
      const res = await getUserDetail(this.userId)
      this.formData = res
    //   console.log(res)
    },

   async onSave() {
       await saveUserDetailById(this.formData)
       this.$message.success('更新成功')
   },

   AppihandleClick() {
       Cookies.set('employeeDetailTab', this.activeName)
   }
  },
}
</script>

<style scoped></style>
