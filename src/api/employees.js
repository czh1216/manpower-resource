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


  // 获取员工列表
  // /sys/user
  export function getUserApi (params) {
    return request({
      url: '/sys/user',
      params
    })
  }

  /**
 * 删除员工接口
 * ****/

export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/** **
 *  新增员工的接口
 * **/
 export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}

// 导入员工
export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}

/** *
 *  读取用户详情的基础信息
 * **/
 export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

/** *
 *  更新用户详情的基础信息
 * **/
 export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}