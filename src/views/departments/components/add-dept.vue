<template>
  <el-dialog
    @close="onClose"
    :title="dialogTitle"
    :visible="visible"
    width="50%"
  >
    <span>
      <!-- 匿名插槽 -->
      <el-form
        label-width="120px"
        :model="formData"
        :rules="formDataRules"
        ref="deptForm"
      >
        <el-form-item label="部门名称" prop="name">
          <el-input
            v-model="formData.name"
            style="width: 80%"
            placeholder="1-50个字符"
          />
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input
            v-model="formData.code"
            style="width: 80%"
            placeholder="1-50个字符"
          />
        </el-form-item>
        <el-form-item label="部门负责人" prop="manager">
          <el-select
            v-model="formData.manager"
            style="width: 80%"
            placeholder="请选择"
            @focus="getEmployeeSimple"
          >
            <el-option
              v-for="item in peoples"
              :key="item.id"
              :label="item.username"
              :value="item.username"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
          <el-input
            v-model="formData.introduce"
            style="width: 80%"
            placeholder="1-300个字符"
            type="textarea"
            :rows="3"
          />
        </el-form-item>
      </el-form>
    </span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button @click="onSelect" type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getDepartmentApi, getBepartmentApi, ediBepartmentApi } from '@/api/depts'
import { getEmployeesApi, addDepartmentApi } from '@/api/employees'
export default {
  data() {
    // 判断部门名称是否重复
    const checkDeptName = async (rule, value, callback) => {
      if (this.formData.id) {
        const { depts } = await getDepartmentApi()
        const filterDepts = depts.filter(
          (item) =>
            item.pid === this.formData.pid && item.id !== this.formData.id,
        )
        const isRepeat = filterDepts.some((item) => item.name === value)
        isRepeat ? callback(new Error('部门重复')) : callback()
      } else {
        if (!this.currentNode.children) return callback()
        const isRepeat = this.currentNode.children.some(
          (item) => item.name === value,
        )
        isRepeat ? callback(new Error('部门重复')) : callback()
      }
    }

    // 判断部门编码是否重复
    const checkDeptCode = async (rule, value, cb) => {
      const { depts } = await getDepartmentApi()
      // console.log(depts)
      let isRepeat
      if (this.formData.id) {
        isRepeat = depts
          .filter((item) => item.id !== this.formData.id)
          .some((item) => item.code === value)
      } else {
        isRepeat = depts.some((item) => item.code === value)
      }
      isRepeat ? cb(new Error('部门编码重复')) : cb()
    }

    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '', // 部门介绍
      },
      formDataRules: {
        name: [
          {
            required: true,
            message: '部门名称不能为空',
            trigger: 'blur',
          },
          {
            min: 1,
            max: 50,
            message: '部门名称要求1-50个字符',
            trigger: 'blur',
          },
          {
            validator: checkDeptName,
            trigger: 'blur',
          },
        ],
        code: [
          {
            required: true,
            message: '部门编码不能为空',
            trigger: 'blur',
          },
          {
            min: 1,
            max: 50,
            message: '部门编码要求1-50个字符',
            trigger: 'blur',
          },
          {
            validator: checkDeptCode,
            trigger: 'blur',
          },
        ],
        manager: [
          {
            required: true,
            message: '部门负责人不能为空',
            trigger: 'change',
          },
        ],
        introduce: [
          {
            required: true,
            message: '部门介绍不能为空',
            trigger: 'blur',
          },
          {
            trigger: 'blur',
            min: 1,
            max: 300,
            message: '部门介绍要求1-50个字符',
          },
        ],
      },

      peoples: [], // 接收获取的员工简单列表的数据
    }
  },

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    currentNode: {
      type: Object,
      required: true,
    },
  },

  computed: {
    dialogTitle() {
      return this.formData.id ? '编辑部门' : '添加部门'
    },
  },

  created() {
    this.getEmployeeSimple()
  },

  methods: {
    // 获取员工简单列表数据
    async getEmployeeSimple() {
      this.peoples = await getEmployeesApi()
    },
    onClose() {
      this.$emit('update:visible', false)
      this.$refs.deptForm.resetFields()
      this.formData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '', // 部门介绍
      }
    },

    async onSelect() {
      await this.$refs.deptForm.validate()
      try {
        if (this.formData.id) {
          await ediBepartmentApi(this.formData)
          this.$message.success('编辑成功')
            this.onClose()
            this.$emit('add-success')
        } else {
          this.formData.pid = this.currentNode.id
          await addDepartmentApi(this.formData)
            this.$message.success('新增部门成功')
            this.onClose()
            this.$emit('add-success')
        }
      } catch (error) {
        this.$message.error('新增部门失败')
      }
    },

    async getDeptById(id) {
      this.formData = await getBepartmentApi(id)
      // console.log(this.formData);
    },
  },
}
</script>

<style scoped></style>
