import axios from "axios";
// 封装 axios 请求
const request = axios.create({
  baseURL: "https://devapi.qweather.com/v7",
  timeout: 10000,
});

// 请求拦截
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
