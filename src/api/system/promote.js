import request from '@/utils/request'

// 查询涉渔科技成果转化、推广共享系统列表
export function listPromote(query) {
  return request({
    url: '/system/promote/list',
    method: 'get',
    params: query
  })
}

// 查询涉渔科技成果转化、推广共享系统详细
export function getPromote(id) {
  return request({
    url: '/system/promote/' + id,
    method: 'get'
  })
}

// 新增涉渔科技成果转化、推广共享系统
export function addPromote(data) {
  return request({
    url: '/system/promote',
    method: 'post',
    data: data
  })
}

// 修改涉渔科技成果转化、推广共享系统
export function updatePromote(data) {
  return request({
    url: '/system/promote',
    method: 'put',
    data: data
  })
}

// 删除涉渔科技成果转化、推广共享系统
export function delPromote(id) {
  return request({
    url: '/system/promote/' + id,
    method: 'delete'
  })
}
