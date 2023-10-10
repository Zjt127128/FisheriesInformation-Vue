import request from '@/utils/request'

// 查询特种育苗、养殖技术经济资源信息共享系统列表
export function listTezhongyumiao(query) {
  return request({
    url: '/system/tezhongyumiao/list',
    method: 'get',
    params: query
  })
}

// 查询特种育苗、养殖技术经济资源信息共享系统详细
export function getTezhongyumiao(id) {
  return request({
    url: '/system/tezhongyumiao/' + id,
    method: 'get'
  })
}

// 新增特种育苗、养殖技术经济资源信息共享系统
export function addTezhongyumiao(data) {
  return request({
    url: '/system/tezhongyumiao',
    method: 'post',
    data: data
  })
}

// 修改特种育苗、养殖技术经济资源信息共享系统
export function updateTezhongyumiao(data) {
  return request({
    url: '/system/tezhongyumiao',
    method: 'put',
    data: data
  })
}

// 删除特种育苗、养殖技术经济资源信息共享系统
export function delTezhongyumiao(id) {
  return request({
    url: '/system/tezhongyumiao/' + id,
    method: 'delete'
  })
}
