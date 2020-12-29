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

export function completeEvent(id) {
  return request({
    url: '/todo/complete',
    method: 'post',
    data: { id }
  })
}

export function cancleEvent(id) {
  return request({
    url: '/todo/cancle',
    method: 'post',
    data: { id }
  })
}

export function deleteEvent(id) {
  return request({
    url: '/todo/delete',
    method: 'post',
    data: { id }
  })
}

