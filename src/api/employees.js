import request from '@/utils/request'

// 获取员工简单列表
export function getEmployeesApi() {
    return request({
        url: '/sys/user/simple'
    })
}

// 添加部门
export function addDepartmentApi(data) {
    return request({
      url: '/company/department',
      method: 'POST',
      data
    })
  }