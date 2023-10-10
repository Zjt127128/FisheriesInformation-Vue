import request from '@/utils/request'

// 查询工厂化育苗、养殖技术经济资源信息列表
export function listInformation(query) {
  return request({
    url: '/system/information/list',
    method: 'get',
    params: query
  })
}

// 查询工厂化育苗、养殖技术经济资源信息详细
export function getInformation(id) {
  return request({
    url: '/system/information/' + id,
    method: 'get'
  })
}

// 新增工厂化育苗、养殖技术经济资源信息
export function addInformation(data) {
  return request({
    url: '/system/information',
    method: 'post',
    data: data
  })
}

// 修改工厂化育苗、养殖技术经济资源信息
export function updateInformation(data) {
  return request({
    url: '/system/information',
    method: 'put',
    data: data
  })
}

// 删除工厂化育苗、养殖技术经济资源信息
export function delInformation(id) {
  return request({
    url: '/system/information/' + id,
    method: 'delete'
  })
}
