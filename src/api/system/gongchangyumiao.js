import request from '@/utils/request'

// 查询工厂化育苗、养殖技术经济资源信息共享系统列表
export function listGongchangyumiao(query) {
  return request({
    url: '/system/gongchangyumiao/list',
    method: 'get',
    params: query
  })
}

// 查询工厂化育苗、养殖技术经济资源信息共享系统详细
export function getGongchangyumiao(id) {
  return request({
    url: '/system/gongchangyumiao/' + id,
    method: 'get'
  })
}

// 新增工厂化育苗、养殖技术经济资源信息共享系统
export function addGongchangyumiao(data) {
  return request({
    url: '/system/gongchangyumiao',
    method: 'post',
    data: data
  })
}

// 修改工厂化育苗、养殖技术经济资源信息共享系统
export function updateGongchangyumiao(data) {
  return request({
    url: '/system/gongchangyumiao',
    method: 'put',
    data: data
  })
}

// 删除工厂化育苗、养殖技术经济资源信息共享系统
export function delGongchangyumiao(id) {
  return request({
    url: '/system/gongchangyumiao/' + id,
    method: 'delete'
  })
}
