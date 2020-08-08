import {stringify} from 'qs';
import service, {baseURL} from './entry';

/**
* 接口
*/
// 获取接口地址
export function getApiPage(params) {
  return service.get(`/api/page?${stringify(params)}`);
}
// 预览接口
export function getApiPreview(params) {
  return service.get(`/api/preview?${stringify(params)}`);
}
// 创建接口
export function createApi(params) {
  return service.post(`/api/create`, params);
}
// 更新接口
export function updateApi(params) {
  return service.post(`/api/update`, params);
}
// 获取接口详情
export function getApiDetail(params) {
  return service.get(`/api/detail?${stringify(params)}`);
}
// 删除接口
export function deleteApi(params) {
  return service.post(`/api/delete`, params);
}
// 导出所有接口
export function exportApi(params) {
  return `${baseURL}/api/download?${stringify(params)}`;
}
// 复制接口
export function cloneApi(params) {
  return service.post(`/api/clone`, params);
}