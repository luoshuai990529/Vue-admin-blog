import request from '@/utils/request'

export function createEvent(data) {
  return request({
    url: '/todo/create',
    method: 'post',
    data
  })
}

export function queryEvent() {
  return request({
    url: '/todo/list',
    method: 'get'
  })
}

