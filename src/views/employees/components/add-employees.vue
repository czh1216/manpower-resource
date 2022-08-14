<template>
  <el-dialog @close="onClose" title="新增员工" :visible="visible" width="60%">
    <!-- 表单 -->
    <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
      <!-- 姓名 -->
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="formData.username"
          style="width: 50%"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <!-- 姓名 -->

      <!-- 手机 -->
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="formData.mobile"
          style="width: 50%"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <!-- 手机 -->

      <!-- 入职时间 -->
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="formData.timeOfEntry"
          style="width: 50%"
          placeholder="请选择日期"
        />
      </el-form-item>
      <!-- 入职时间 -->

      <!-- 聘用形式 -->
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model="formData.formOfEmployment"
          style="width: 50%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 聘用形式 -->

      <!-- 工号 -->
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="formData.workNumber"
          style="width: 50%"
          placeholder="请输入工号"
        />
      </el-form-item>
      <!-- 工号 -->

      <!-- 部门 -->
      <el-form-item label="部门" prop="departmentName">
        <el-select
          @focus="getDepts"
          v-model="formData.departmentName"
          placeholder="请选择部门"
          ref="deptSelect"
        >
          <el-option class="teeRest" value="" v-loading="loadingData">
            <el-tree @node-click="teeNodeClick" :data="depts" :props="treeProps"></el-tree>
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 部门 -->

      <!-- 转正时间 -->
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="formData.correctionTime"
          style="width: 50%"
          placeholder="请选择日期"
        />
      </el-form-item>
      <!-- 转正时间 -->
    </el-form>

    <!-- 按钮 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
//聘用形式数据
import employees from '@/constant/employees'
const hireType = employees.hireType

import { getDepartmentApi } from '@/api/depts.js'
import { transListToTree } from '@/utils'
import { addEmployee } from '@/api/employees'
export default {
  data() {
    return {
      hireType, //聘用形式数据
      // 表单数据
      formData: {
        username: '', //姓名
        mobile: '', //手机
        formOfEmployment: '', //聘用形式
        workNumber: '', //工号
        departmentName: '', //部门
        timeOfEntry: '', //入职时间
        correctionTime: '', //转正时间
      },
      //   表单校验规则
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 4,
            message: '用户姓名为1-4位',
          },
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur',
          },
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'change' },
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' },
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' },
        ],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'change' }],
      },

      // 部门数据
      depts: [],

      treeProps: {
        label: 'name',
      },
      loadingData: false,
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },

  created() {},

  methods: {
    //   退出
    onClose() {
      this.$emit('update:visible', false)
    //   this.$refs.form.resetFields('')
    },
    // 获取部门数据
    async getDepts() {
    this.loadingData = true
      const { depts } = await getDepartmentApi()
      transListToTree(depts, '')
      this.depts = depts
      this.loadingData = false
    },

    onSave() {
        this.$refs.form.validate(async (valid) => {
            if(!valid) return
            // console.log('发送成功')
            await addEmployee(this.formData)
            this.$message.success('添加成功')
            this.onClose()
            this.$emit('add-success')
        })
    },

    teeNodeClick(row) {
        this.formData.departmentName = row.name
        this.$refs.deptSelect.blur()
    }
  },
}
</script>

<style scoped lang="scss">
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover .el-select-dropdown__item {
  background-color: #fff;
  overflow: unset;
}

.teeRest {
  height: 60px;
}
</style>
