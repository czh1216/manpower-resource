import request from '@/utils/request'

//登录请求
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
      data
  })
}

// 获取用户信息
export function getUserInfoApi() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

// 获取员工基本信息
export function getUserDetail(id) {
  return request({
    url: '/sys/user/' + id
  })
}
