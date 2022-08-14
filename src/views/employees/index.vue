<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools>
        <span slot="left">共166条记录</span>
        <template slot="right">
          <el-button size="small" type="warning" @click="$router.push('/imgiong')">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary" @click="newly">新增员工</el-button>
        </template>
      </PageTools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="employees">
          <el-table-column label="序号" sortable type="index" />
          <el-table-column label="员工">
            <template slot-scope="{ row }">
              <img
                v-imgError="require('@/assets/common/head.jpg')"
                :src="row.staffPhoto"
                style="
                  border-radius: 50%;
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                "
                alt=""
              />
            </template>
          </el-table-column>
          <el-table-column label="姓名" sortable prop="username" />
          <el-table-column label="工号" sortable prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable
            :formatter="formatFormOfEmployment"
            prop="formOfEmployment"
          />
          <el-table-column label="部门" sortable prop="departmentName" />
          <el-table-column label="入职时间" sortable>
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable>
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="deleteData(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            layout="prev, pager, next"
            :page-size="pages.size"
            @current-change="currentChange"
            :total="total"
          />
        </el-row>
      </el-card>
    </div>

    <AddEmployee :visible.sync="dialogVisible" />
  </div>
</template>

<script>
import { getUserApi, delEmployee } from '@/api/employees'
import AddEmployee from './components/add-employees.vue'
import employees from '@/constant/employees'
export default {
  data() {
    return {
      employees: [],
      total: 0,
      pages: {
        page: 1,
        size: 10,
      },
      dialogVisible: false,
    }
  },

  created() {
    this.getUserApi()
  },
  components: {
    AddEmployee
  },

  methods: {
    //获取列表数据
    async getUserApi() {
      const { rows, total } = await getUserApi(this.pages)
      this.employees = rows
      this.total = total
      // console.log(this.employees)
    },
    currentChange(val) {
      this.pages.page = val
      this.getUserApi()
    },

    // 聘用形式
    formatFormOfEmployment(row, column, cellValue, index) {
      const findItem = employees.hireType.find((item) => item.id === cellValue)
      return findItem ? findItem.value : '未知'
    },

    // 删除
    async deleteData(id) {
      try {
        await this.$confirm('您确定删除该员工吗')
        await delEmployee(id)
        await this.getUserApi()
        this.$message.success('删除员工成功')
      } catch (error) {
        console.log(error)
      }
    },

    newly() {
      console.log(222);
      this.dialogVisible = true
    }
  },
}
</script>

<style scoped lang="less"></style>
