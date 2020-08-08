import axios from 'axios';
import Cookies from 'js-cookie';
import {Message} from 'element-ui';
import router from '@/router';

// 端口号4000的是原服务器，7001的是egg的服务器
export const port = 7001;
export const baseURL = process.env.NODE_ENV === 'development' ? `http://localhost:${port}/api` : '/api';

const service = axios.create({
  baseURL
});
service.interceptors.request.use(config => {
  config.headers['token'] = Cookies.get('token');
  return config;
}, error => Promise.reject(error));

service.interceptors.response.use(
  r => r,
  error => {
    const {data} = error.response;
    if (data.code === 'TOKEN_OVERDUE') {
      Message.error(data.message);
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default service;