import axios from 'axios'
import config from '../config'

const service = axios.create({
  baseURL: config.API_URL,
  timeout: 60000
})

export function wechatSignature(params) {
  return service.get('/user/weixin/signature', { params })
}
