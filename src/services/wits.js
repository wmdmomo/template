import axios from 'axios'
import config from '../config'

const service = axios.create({
  baseURL: config.API_URL,
  timeout: 60000
})
export function wechatSignature(params) {
  return service.get('/user/weixin/signature', { params })
}
let base = ''
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': ' application/json'
    }
  })
}
