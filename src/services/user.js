import service from './entry';
import {stringify} from 'qs';

/**
 * 用户
 */

// 登录
export function login(params) {
  return service.post('/user/login', params);
}
// 注册
export function register(params) {
  return service.post('/user/register', params);
}
// 检验用户是否存在
export function checkExists(params) {
  return service.get(`/user/checkExists?${stringify(params)}`)
}