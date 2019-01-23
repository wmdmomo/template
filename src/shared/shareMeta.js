
/* eslint-disable import/no-webpack-loader-syntax */
// import img from '!!file-loader!~/images/logo.png'
import { wechatSignature } from '../services/wits'

const shareData = {
  title: '见识大佬年终大盘点',
  desc: '2019年想要成为见识大咖？这份进阶手册帮你轻松圆梦！',
  imgUrl: 'https://wpimg.wallstcn.com/b0942658-e34f-4dfd-84bd-23223f3fa42f.png',
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
