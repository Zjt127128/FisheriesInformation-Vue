import request from '@/utils/request'

// 查询海底滩涂增养殖技术经济资源信息共享系统信息列表
export function listInformation(query) {
  return request({
    url: '/system/mudflatinformation/list',
    method: 'get',
    params: query
  })
}

// 查询海底滩涂增养殖技术经济资源信息共享系统信息详细
export function getInformation(id) {
  return request({
    url: '/system/mudflatinformation/' + id,
    method: 'get'
  })
}

// 新增海底滩涂增养殖技术经济资源信息共享系统信息
export function addInformation(data) {
  return request({
    url: '/system/mudflatinformation',
    method: 'post',
    data: data
  })
}

// 修改海底滩涂增养殖技术经济资源信息共享系统信息
export function updateInformation(data) {
  return request({
    url: '/system/mudflatinformation',
    method: 'put',
    data: data
  })
}

// 删除海底滩涂增养殖技术经济资源信息共享系统信息
export function delInformation(id) {
  return request({
    url: '/system/mudflatinformation/' + id,
    method: 'delete'
  })
}
