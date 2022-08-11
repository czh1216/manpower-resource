import request from '@/utils/request'

// 获取所有角色列表
// /sys/role
export const getRole = () => {
    return request({
        url: '/sys/role'
    })
}