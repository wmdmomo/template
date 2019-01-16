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

Math.easeInOutQuad = function (t, b, c, d) {
  t /= d / 2
  if (t < 1) {
    return (c / 2) * t * t + b
  }
  t--
  return (-c / 2) * (t * (t - 2) - 1) + b
}

Math.easeInCubic = function (t, b, c, d) {
  const tc = (t /= d) * t * t
  return b + c * tc
}

Math.inOutQuintic = function (t, b, c, d) {
  let ts = (t /= d) * t

  let tc = ts * t
  return b + c * (6 * tc * ts + -15 * ts * ts + 10 * tc)
}

// requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
var requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
  )
})()

function scrollTo(to, callback, duration) {
  // because it's so fucking difficult to detect the scrolling element, just move them all
  function move(amount) {
    document.documentElement.scrollTop = amount
    document.body.parentNode.scrollTop = amount
    document.body.scrollTop = amount
  }
  function position() {
    return (
      document.documentElement.scrollTop
      || document.body.parentNode.scrollTop
      || document.body.scrollTop
    )
  }
  let start = position()

  let change = to - start

  let currentTime = 0

  let increment = 20
  duration = typeof duration === 'undefined' ? 500 : duration
  const animateScroll = function () {
    // increment the time
    currentTime += increment
    // find the value with the quadratic in-out easing function
    const val = Math.easeInOutQuad(currentTime, start, change, duration)
    // move the document.body
    move(val)
    // do the animation unless its over
    if (currentTime < duration) {
      requestAnimFrame(animateScroll)
    } else {
      if (callback && typeof callback === 'function') {
        // the animation is done so lets callback
        callback()
      }
    }
  }
  animateScroll()
}

let isFetching = false

document.addEventListener('DOMContentLoaded', () => {
  const fetchbutton = document.querySelector('.bottom')
  fetchbutton.addEventListener('click', async () => {
    // scroll to bottom first
    const height = Math.max(document.body.scrollHeight, document.body.offsetHeight,
      document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight)
    scrollTo(height)
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
        window.location.href = 'https://jianshiapp.com/create-circle'
      } else {
        toast(res.data.message)
      }
    } catch (e) {
      isFetching = false
      toast(e.message)
    }
  })
})
