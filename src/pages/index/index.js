import 'normalize.css'
import '~/styles/global.css'
import '~/styles/mobile-wrapper.css'
import './style.css'
import 'regenerator-runtime/runtime'
import 'wscn-affiliate'
import toast from 'wscn-toast'
import { setWechatShare } from '../../shared/shareMeta'
import { postRequest } from '../../services/wits'

if (window.wx) {
  setWechatShare()
}
function isPhone(phone) {
  return /^1\d{10}$/.test(phone)
}
let isFetching = false
const fetchbutton = document.querySelector('.bottom')
fetchbutton.addEventListener('click', () => {
  const phonenumber = document.getElementById('field1').value
  const weixin = document.getElementById('field2').value
  const weibo = document.getElementById('field3').value
  if (!phonenumber) {
    toast('请填写手机号')
    return
  }
  if (!isPhone(phonenumber)) {
    toast('请输入正确的手机号')
    return
  }
  if (isFetching) {
    toast('请勿重复提交')
    return
  }
  isFetching = true
  postRequest('http://api-sit.jianshiapp.com/apiv1/circle/recruit_circle_owner', {
    'mobile': phonenumber,
    'wechat': weixin,
    'weibo': weibo
  }).then(resp => {
    if (resp && resp.code === 20000) {
      isFetching = false
      toast('提交成功')
    }
  })
})
