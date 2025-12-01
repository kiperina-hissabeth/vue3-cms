import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import type { RequestConfig } from '@/services/request/type.ts'

class MyRequest {
  instance: AxiosInstance

  constructor(config: RequestConfig) {
    this.instance = axios.create(config)

    // 1. 全局拦截器和实例拦截器
    this.instance.interceptors.request.use(
      function (config) {
        // console.log('全局请求成功的拦截')
        return config
      },
      function (error) {
        // console.log('全局请求失败的拦截')
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      function (response) {
        // console.log('全局响应成功的拦截')
        return response.data
      },
      function (error) {
        // console.log('全局响应失败的拦截')
        return Promise.reject(error)
      }
    )

    // 2. 配置针对特殊的接口的单次请求拦截
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  /*
   * 我们希望对每次请求每个接口 request 和 response 都进行定制化的拦截
   * request({
   *   url:'/xxx',
   *   interceptors:{
   *     requestSuccessFn:(config) => {
   *       console.log("针对 /xxx 请求成功的拦截");
   *       return config;
   *     },
   *   }
   * })
   *
   * 某个接口的请求拦截 -> 全局请求拦截 -> 全局响应拦截 -> 某个接口的响应拦截
   * */

  /**
   * 封装请求方法
   * @param config
   */
  request<T = any>(config: RequestConfig<T>) {
    if (config.interceptors?.requestSuccessFn) {
      // 返回拦截处理后新的 config
      config = config.interceptors.requestSuccessFn(
        config as InternalAxiosRequestConfig
      ) as InternalAxiosRequestConfig
    }
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => reject(err))
    })
  }

  get<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: RequestConfig<T>) {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: RequestConfig<T>) {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: RequestConfig<T>) {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default MyRequest
