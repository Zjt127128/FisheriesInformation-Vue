import request from '@/utils/request'

// 查询捕捞技术经济资源信息共享系统列表
export function listFishing(query) {
  return request({
    url: '/system/fishing/list',
    method: 'get',
    params: query
  })
}

// 查询捕捞技术经济资源信息共享系统详细
export function getFishing(id) {
  return request({
    url: '/system/fishing/' + id,
    method: 'get'
  })
}

// 新增捕捞技术经济资源信息共享系统
export function addFishing(data) {
  return request({
    url: '/system/fishing',
    method: 'post',
    data: data
  })
}

// 修改捕捞技术经济资源信息共享系统
export function updateFishing(data) {
  return request({
    url: '/system/fishing',
    method: 'put',
    data: data
  })
}

// 删除捕捞技术经济资源信息共享系统
export function delFishing(id) {
  return request({
    url: '/system/fishing/' + id,
    method: 'delete'
  })
}
