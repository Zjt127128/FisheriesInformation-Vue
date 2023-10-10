import request from '@/utils/request'

// 查询渔业资源资产价值评估系统列表
export function listEvaluation(query) {
  return request({
    url: '/system/evaluation/list',
    method: 'get',
    params: query
  })
}

// 查询渔业资源资产价值评估系统详细
export function getEvaluation(id) {
  return request({
    url: '/system/evaluation/' + id,
    method: 'get'
  })
}

// 新增渔业资源资产价值评估系统
export function addEvaluation(data) {
  return request({
    url: '/system/evaluation',
    method: 'post',
    data: data
  })
}

// 修改渔业资源资产价值评估系统
export function updateEvaluation(data) {
  return request({
    url: '/system/evaluation',
    method: 'put',
    data: data
  })
}

// 删除渔业资源资产价值评估系统
export function delEvaluation(id) {
  return request({
    url: '/system/evaluation/' + id,
    method: 'delete'
  })
}
