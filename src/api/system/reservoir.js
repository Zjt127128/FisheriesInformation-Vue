import request from '@/utils/request'

// 查询海底滩涂增养殖技术经济资源信息共享系统列表
export function listReservoir(query) {
  return request({
    url: '/system/reservoir/list',
    method: 'get',
    params: query
  })
}

// 查询海底滩涂增养殖技术经济资源信息共享系统详细
export function getReservoir(id) {
  return request({
    url: '/system/reservoir/' + id,
    method: 'get'
  })
}

// 新增海底滩涂增养殖技术经济资源信息共享系统
export function addReservoir(data) {
  return request({
    url: '/system/reservoir',
    method: 'post',
    data: data
  })
}

// 修改海底滩涂增养殖技术经济资源信息共享系统
export function updateReservoir(data) {
  return request({
    url: '/system/reservoir',
    method: 'put',
    data: data
  })
}

// 删除海底滩涂增养殖技术经济资源信息共享系统
export function delReservoir(id) {
  return request({
    url: '/system/reservoir/' + id,
    method: 'delete'
  })
}
