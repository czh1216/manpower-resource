import request from '@/utils/request'

// 获取所有角色列表
// /sys/role
export const getRole = (params) => {
    return request({
        url: '/sys/role',
        params
    })
}

// 添加角色
export const postRole = (data) => {
    return request({
        url: '/sys/role',
        method: 'POST',
        data
    })
}

// 根据ID删除角色
// /sys/role/{id}
// DELETE
export const deleteRole = (id) => {
    return request({
        url: '/sys/role' + id,
        method: 'DELETE'
    })
}

// 根据id查询企业
// /company/{id}
export const getCompany = (companyId) => {
    return request({
        url: '/company/' + companyId,
    })
}