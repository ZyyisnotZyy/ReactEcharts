// 本地后端 http://localhost:5000 接口

import axios from "axios";

const serve = axios.create({
  // 这里已经把 5000 代理成 300 了
  baseURL: "http://localhost:3000",
  timeout: 10000,
});

// 请求拦截
serve.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 相应拦截
serve.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
  }
);

export default serve;
