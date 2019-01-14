import 'normalize.css'
import '~/styles/global.css'
import '~/styles/mobile-wrapper.css'
import './style.css'
import 'regenerator-runtime/runtime'
import 'wscn-affiliate'
import toast from 'wscn-toast'
import { setWechatShare } from '../../shared/shareMeta'
import { submitRecruit } from '../../services/wits'

function isPhone(phone) {
  return /^1\d{10}$/.test(phone)
}
if (window.wx) {
  setWechatShare()
}
let isFetching = false

document.addEventListener('DOMContentLoaded', () => {
  const fetchbutton = document.querySelector('.bottom')
  fetchbutton.addEventListener('click', async () => {
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
      toast('正在提交中')
      return
    }
    isFetching = true
    try {
      const res = await submitRecruit({
        'mobile': phonenumber,
        'wechat': weixin,
        'weibo': weibo
      })
      isFetching = false
      if (res.data.code === 20000) {
        toast('提交成功')
      } else {
        toast(res.data.message)
      }
    } catch (e) {
      isFetching = false
      toast(e.message)
    }
  })
})
