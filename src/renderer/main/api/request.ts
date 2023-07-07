import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

export const reqId = uuidv4()

const request = axios.create({
  baseURL: 'https://wapi.kuwo.cn/',
  // baseURL: 'https://www.kuwo.cn/',
  // withCredentials: true,
  // timeout: 5000
})

request.interceptors.request.use(
  (config) => {
    // console.log(config.params)
    if (config.params == null) {
      config.params = {}
    }
    config.params.reqId = reqId
    config.params.httpsStatus = 1
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response) => {
    const { code } = response.data
    if (code === 200) {
      return response
    }
    throw new Error('请求失败:' + code)
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default request
