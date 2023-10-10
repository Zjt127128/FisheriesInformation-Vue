import request from '@/utils/request'

// 新增水库等大水面渔业技术经济资源信息共享系统
export function addReservoir(data) {
  return request({
    url: '/system/reservoir/addnotoken',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}
// 新增 海底滩涂增养殖技术经济资源信息共享系统
export function addHaidituceng(data) {
  return request({
    url: '/system/haidituceng/addnotoken',
    method: 'post',
    data: data
  })
}
// 新增工厂化育苗、养殖技术经济资源信息共享系统
export function addGongchangyumiao(data) {
  return request({
    url: '/system/gongchangyumiao/addnotoken',
    method: 'post',
    data: data
  })
}

// 新增网箱育苗、养殖技术经济资源信息共享系统
export function addWangxiangyumiao(data) {
  return request({
    url: '/system/wangxiangyumiao/addnotoken',
    method: 'post',
    data: data
  })
}
// 新增池塘育苗、养殖技术经济资源信息共享系统
export function addChitangyumiao(data) {
  return request({
    url: '/system/chitangyumiao/addnotoken',
    method: 'post',
    data: data
  })
}
// 新增特种育苗、养殖技术经济资源信息共享系统
export function addTezhongyumiao(data) {
  return request({
    url: '/system/tezhongyumiao/addnotoken',
    method: 'post',
    data: data
  })
}
// 新增捕捞技术经济资源信息共享系统
export function addFishing(data) {
  return request({
    url: '/system/fishing/addnotoken',
    method: 'post',
    data: data
  })
}
// 新增渔业船舶技术经济资源信息共享系统
export function addShipping(data) {
  return request({
    url: '/system/shipping/addnotoken',
    method: 'post',
    data: data
  })
}
// 新增渔业生产、事故在线技术咨询、服务系统
export function addProduction(data) {
  return request({
    url: '/system/production/addnotoken',
    method: 'post',
    data: data
  })
}
// 新增业主、专家、涉渔机构、在线交流共享系统
export function addOwner(data) {
  return request({
    url: '/system/owner/addnotoken',
    method: 'post',
    data: data
  })
}
// 新增渔业资源资产价值评估系统
export function addEvaluation(data) {
  return request({
    url: '/system/evaluation/addnotoken',
    method: 'post',
    data: data
  })
}
// 新增涉渔科技成果转化、推广共享系统
export function addPromote(data) {
  return request({
    url: '/system/promote/addnotoken',
    method: 'post',
    data: data
  })
}