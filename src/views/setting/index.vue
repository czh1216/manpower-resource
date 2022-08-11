<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <!-- 角色管理 -->
        <el-tab-pane label="角色管理" name="first">
          <el-button type="primary" @click="addDatae">新增角色</el-button>
          <!-- 表格 -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="name" label="角色"> </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column prop="name" label="操作">
              <template slot-scope="{ row }">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger" @click="onDefsc(row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>

          <!-- 分页 -->
          <el-pagination
            layout="sizes,prev, pager, next"
            :total="total"
            :page-size="pagesize"
            @size-change="handleSizeChange"
            @current-change="currentChange"
            :page-sizes="[5, 10, 20, 40]"
          >
          </el-pagination>
        </el-tab-pane>

        <!-- 公司信息 -->
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          >
          </el-alert>

          <el-form ref="form" label-width="80px">
            <el-form-item label="公司名称">
              <el-input disabled v-model="forDataes.name"></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input disabled v-model="forDataes.companyAddress"></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input disabled v-model="forDataes.mailbox"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" disabled v-model="forDataes.remarks"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 新增角色弹窗 -->
    <el-dialog
      @close="dialogClose"
      title="新增角色"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form
        ref="form"
        label-width="80px"
        :model="addRoleForm"
        :rules="addRoleFormData"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRoleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="角色描述" prop="description">
          <el-input v-model="addRoleForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="onCloseData">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRole, postRole, getCompany } from '@/api/setting'
export default {
  data() {
    return {
      activeName: 'first',
      tableData: [],
      total: 0, //总条数
      pagesize: 5, //每页条数
      page: 1, //页码
      dialogVisible: false, //新增角色弹窗隐藏
      addRoleForm: {
        name: '',
        description: '',
      },
      forDataes: {},
      addRoleFormData: {
        name: [
          { required: true, trigger: 'blur', message: '角色名称不能为空' },
        ],
        description: [
          { required: true, trigger: 'blur', message: '角色描述不能为空' },
        ],
      },
    }
  },

  created() {
    this.getRole()
    this.getCompany()
  },

  methods: {
    // 获取列表数据
    async getRole() {
      const { rows, total } = await getRole({
        page: this.page, //页码
        pagesize: this.pagesize, //每页条数
      })
      this.tableData = rows //获取数据
      this.total = total //总条数
      // console.log(rows)
    },
    // 切换页数
    currentChange(val) {
      this.page = val
      this.getRole()
    },
    // 切换每页条数
    handleSizeChange(val) {
      // console.log(val);
      this.pagesize = val
      this.getRole()
    },

    // 新增角色
    addDatae() {
      this.dialogVisible = true
    },

    // 取消
    onClose() {
      this.dialogVisible = false
    },

    // 确认
    async onCloseData() {
      await this.$refs.form.validate()
      // console.log(123);
      await postRole(this.addRoleForm)
      this.$message.success('添加成功')
      // console.log(this.addRoleForm);

      this.dialogVisible = false
      this.getRole()
    },

    // 监听对话框关闭
    dialogClose() {
      this.$refs.form.resetFields()
      this.addRoleForm.description = ''
    },

    onDefsc(row) {
      console.log(123)
      // console.log(row);
    },

    async getCompany() {
      console.log(this.$store.state.user.getUserInfo.companyId);
      const res = await getCompany(
        this.$store.state.user.getUserInfo.companyId
      )
      this.forDataes = res
      console.log(res);
    }
  },
}
</script>

<style scoped lang="less"></style>
