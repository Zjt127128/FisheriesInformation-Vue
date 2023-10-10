import request from '@/utils/request'

// 查询业主、专家、涉渔机构、在线交流共享系统列表
export function listOwner(query) {
  return request({
    url: '/system/owner/list',
    method: 'get',
    params: query
  })
}

// 查询业主、专家、涉渔机构、在线交流共享系统详细
export function getOwner(id) {
  return request({
    url: '/system/owner/' + id,
    method: 'get'
  })
}

// 新增业主、专家、涉渔机构、在线交流共享系统
export function addOwner(data) {
  return request({
    url: '/system/owner',
    method: 'post',
    data: data
  })
}

// 修改业主、专家、涉渔机构、在线交流共享系统
export function updateOwner(data) {
  return request({
    url: '/system/owner',
    method: 'put',
    data: data
  })
}

// 删除业主、专家、涉渔机构、在线交流共享系统
export function delOwner(id) {
  return request({
    url: '/system/owner/' + id,
    method: 'delete'
  })
}
