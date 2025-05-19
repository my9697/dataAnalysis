import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';

const BASE_URL = 'http://localhost:3000/api';

// 创建 Axios 实例
const service: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => {
    console.log('请求拦截器错误', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做点什么
    const res = response.data;
    console.log('响应拦截器里的相应结果', res);
    return res;
  },
  (error) => {
    // 对响应错误做点什么
    console.log('响应拦截器错误', error);
    return Promise.reject(error);
  }
);

// 封装通用的请求方法
interface RequestOptions {
  // 可以添加一些通用的请求选项，例如是否显示 loading 等
  showLoading?: boolean;
}

const request = <T = any>(config: AxiosRequestConfig, options: RequestOptions = {}): Promise<T> => {
  // if (options.showLoading) { /* 显示 loading */ }
  return new Promise((resolve, reject) => {
    service
      .request<any, T>(config)
      .then((res) => {
        console.log('请求结果', res);
        resolve(res);
      })
      .catch((err) => {
        console.log('请求错误', err);
        reject(err);
      })
      .finally(() => {
        // if (options.showLoading) { /* 隐藏 loading */ }
      });
  });
};

// 更便捷的 GET, POST, PUT, DELETE 方法
export const get = <T = any>(
  url: string,
  params?: object,
  options?: RequestOptions
): Promise<T> => {
  console.log('get请求', url, params, options);
  return request<T>({ url, method: 'GET', params }, options);
};

export const post = <T = any>(url: string, data?: object, options?: RequestOptions): Promise<T> => {
  console.log('post请求', url, data, options);
  return request<T>({ url, method: 'POST', data }, options);
};

export const put = <T = any>(url: string, data?: object, options?: RequestOptions): Promise<T> => {
  console.log('put请求', url, data, options);
  return request<T>({ url, method: 'PUT', data }, options);
};

export const del = <T = any>(url: string, data?: object, options?: RequestOptions): Promise<T> => {
  console.log('del请求', url, data, options);
  return request<T>({ url, method: 'DELETE', data }, options);
};

export default request;
