import request from '@/utils/request'

// 查询企业的部门列表
// /company/department

export const getDepartmentApi = () => {
    return request({
        url: '/company/department'
    })
}

// 根据ID删除部门
// /company/department/{id}
export const delDepartmentApi = (id) => {
    return request({
        url: `/company/department/${id}`,
        method: 'DELETE'
    })
}