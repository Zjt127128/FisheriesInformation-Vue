import request from '@/utils/request'

// 查询网箱育苗、养殖技术经济资源信息共享系统列表
export function listWangxiangyumiao(query) {
  return request({
    url: '/system/wangxiangyumiao/list',
    method: 'get',
    params: query
  })
}

// 查询网箱育苗、养殖技术经济资源信息共享系统详细
export function getWangxiangyumiao(id) {
  return request({
    url: '/system/wangxiangyumiao/' + id,
    method: 'get'
  })
}

// 新增网箱育苗、养殖技术经济资源信息共享系统

export function addWangxiangyumiao(data) {
  return request({
    url: '/system/wangxiangyumiao',
    method: 'post',
    data: data
  })
}

// 修改网箱育苗、养殖技术经济资源信息共享系统

export function updateWangxiangyumiao(data) {
  return request({
    url: '/system/wangxiangyumiao',
    method: 'put',
    data: data
  })
}

// 删除网箱育苗、养殖技术经济资源信息共享系统

export function delWangxiangyumiao(id) {
  return request({
    url: '/system/wangxiangyumiao/' + id,
    method: 'delete'
  })
}
