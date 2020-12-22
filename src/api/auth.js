import request from '@/utils/request'

export function getAuthList(params) {
  return request({
    url: '/auth/list',
    method: 'get',
    params
  })
}

export function getRoleList() {
  return request({
    url: '/auth/roles',
    method: 'get'
  })
}

export function getUserAuth(id) {
  return request({
    url: '/auth/userauth',
    method: 'get',
    params: { id }
  })
}

export function editUserAuth(data) {
  return request({
    url: '/auth/editauth',
    method: 'post',
    data
  })
}

export function freezeUser(id) {
  return request({
    url: '/auth/freeze',
    method: 'post',
    data: { id }
  })
}

export function activeUser(id) {
  return request({
    url: '/auth/active',
    method: 'post',
    data: { id }
  })
}

export function getRights() {
  return request({
    url: '/auth/rights',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/auth/create',
    method: 'post',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: '/auth/delete',
    method: 'post',
    data: { id }
  })
}

export function getRoleInfo(id) {
  return request({
    url: '/auth/getRoleInfo',
    method: 'get',
    params: { id }
  })
}

export function editRole(data) {
  return request({
    url: '/auth/editRole',
    method: 'post',
    data
  })
}
