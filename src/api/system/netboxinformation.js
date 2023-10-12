import request from '@/utils/request'

// 查询水库等大水面渔业技术经济资源信息共享系统信息列表
export function listInformation(query) {
  return request({
    url: '/system/netboxinformation/list',
    method: 'get',
    params: query
  })
}

// 查询水库等大水面渔业技术经济资源信息共享系统信息详细
export function getInformation(id) {
  return request({
    url: '/system/netboxinformation/' + id,
    method: 'get'
  })
}

// 新增水库等大水面渔业技术经济资源信息共享系统信息
export function addInformation(data) {
  return request({
    url: '/system/netboxinformation',
    method: 'post',
    data: data
  })
}

// 修改水库等大水面渔业技术经济资源信息共享系统信息
export function updateInformation(data) {
  return request({
    url: '/system/netboxinformation',
    method: 'put',
    data: data
  })
}

// 删除水库等大水面渔业技术经济资源信息共享系统信息
export function delInformation(id) {
  return request({
    url: '/system/netboxinformation/' + id,
    method: 'delete'
  })
}
