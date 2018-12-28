
/* eslint-disable import/no-webpack-loader-syntax */
// import img from '!!file-loader!~/images/logo.png'
import { wechatSignature } from '../services/wits'

const shareData = {
  title: '你有一份择机而动的见识宝典待领取 or 就在见识！必须献给2019的宝典',
  desc: '见识过2018的风起云涌，你的2019必须择机而动',
  imgUrl: 'https://wpimg.wallstcn.com/834f39db-37b6-4297-9731-cf3e3b927bfe.png',
  link: location.href
}

export async function setWechatShare(data = shareData) {
  const res = await wechatSignature({
    signurl: location.href.split('#')[0],
    platform: 'wits'
  })
  const conf = res.data.data
  window.wx.config({
    appId: conf.appid,
    timestamp: conf.timestamp,
    nonceStr: conf.noncestr,
    signature: conf.signature,
    jsApiList: conf.jsapis
  })
  window.wx.ready(() => {
    window.wx.onMenuShareTimeline(data)
    window.wx.onMenuShareAppMessage(data)
    window.wx.onMenuShareQQ(data)
  })
}
