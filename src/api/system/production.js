import request from '@/utils/request'

// 查询渔业生产、事故在线技术咨询、服务系统列表
export function listProduction(query) {
  return request({
    url: '/system/production/list',
    method: 'get',
    params: query
  })
}

// 查询渔业生产、事故在线技术咨询、服务系统详细
export function getProduction(id) {
  return request({
    url: '/system/production/' + id,
    method: 'get'
  })
}

// 新增渔业生产、事故在线技术咨询、服务系统
export function addProduction(data) {
  return request({
    url: '/system/production',
    method: 'post',
    data: data
  })
}

// 修改渔业生产、事故在线技术咨询、服务系统
export function updateProduction(data) {
  return request({
    url: '/system/production',
    method: 'put',
    data: data
  })
}

// 删除渔业生产、事故在线技术咨询、服务系统
export function delProduction(id) {
  return request({
    url: '/system/production/' + id,
    method: 'delete'
  })
}
