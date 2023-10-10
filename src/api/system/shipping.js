import request from '@/utils/request'

// 查询渔业船舶技术经济资源信息共享系统列表
export function listShipping(query) {
  return request({
    url: '/system/shipping/list',
    method: 'get',
    params: query
  })
}

// 查询渔业船舶技术经济资源信息共享系统详细
export function getShipping(id) {
  return request({
    url: '/system/shipping/' + id,
    method: 'get'
  })
}

// 新增渔业船舶技术经济资源信息共享系统
export function addShipping(data) {
  return request({
    url: '/system/shipping',
    method: 'post',
    data: data
  })
}

// 修改渔业船舶技术经济资源信息共享系统
export function updateShipping(data) {
  return request({
    url: '/system/shipping',
    method: 'put',
    data: data
  })
}

// 删除渔业船舶技术经济资源信息共享系统
export function delShipping(id) {
  return request({
    url: '/system/shipping/' + id,
    method: 'delete'
  })
}
