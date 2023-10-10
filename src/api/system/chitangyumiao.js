import request from '@/utils/request'

// 查询池塘育苗、养殖技术经济资源信息共享系统列表
export function listChitangyumiao(query) {
  return request({
    url: '/system/chitangyumiao/list',
    method: 'get',
    params: query
  })
}

// 查询池塘育苗、养殖技术经济资源信息共享系统详细
export function getChitangyumiao(id) {
  return request({
    url: '/system/chitangyumiao/' + id,
    method: 'get'
  })
}

// 新增池塘育苗、养殖技术经济资源信息共享系统
export function addChitangyumiao(data) {
  return request({
    url: '/system/chitangyumiao',
    method: 'post',
    data: data
  })
}

// 修改池塘育苗、养殖技术经济资源信息共享系统
export function updateChitangyumiao(data) {
  return request({
    url: '/system/chitangyumiao',
    method: 'put',
    data: data
  })
}

// 删除池塘育苗、养殖技术经济资源信息共享系统
export function delChitangyumiao(id) {
  return request({
    url: '/system/chitangyumiao/' + id,
    method: 'delete'
  })
}
