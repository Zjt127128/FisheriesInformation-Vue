import request from '@/utils/request'

// 查询 海底滩涂增养殖技术经济资源信息共享系统列表
export function listHaidituceng(query) {
  return request({
    url: '/system/haidituceng/list',
    method: 'get',
    params: query
  })
}

// 查询 海底滩涂增养殖技术经济资源信息共享系统详细
export function getHaidituceng(id) {
  return request({
    url: '/system/haidituceng/' + id,
    method: 'get'
  })
}

// 新增 海底滩涂增养殖技术经济资源信息共享系统
export function addHaidituceng(data) {
  return request({
    url: '/system/haidituceng',
    method: 'post',
    data: data
  })
}

// 修改 海底滩涂增养殖技术经济资源信息共享系统
export function updateHaidituceng(data) {
  return request({
    url: '/system/haidituceng',
    method: 'put',
    data: data
  })
}

// 删除 海底滩涂增养殖技术经济资源信息共享系统
export function delHaidituceng(id) {
  return request({
    url: '/system/haidituceng/' + id,
    method: 'delete'
  })
}
