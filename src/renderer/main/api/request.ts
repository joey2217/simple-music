import axios from 'axios'
import { message } from 'antd'
import { v4 as uuidv4 } from 'uuid'

export const reqId = uuidv4()

const request = axios.create({
  baseURL: 'https://www.kuwo.cn/',
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const { code, msg } = response.data
    if (code && code !== 200) {
      message.error(msg || '请求失败:' + code)
      console.error(response.data)
      throw new Error('请求失败:' + code)
    }
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default request

export function fetchToken() {
  return request({
    url: '/down',
    method: 'GET',
  })
}

fetchToken()
