
/* eslint-disable import/no-webpack-loader-syntax */
// import img from '!!file-loader!~/images/logo.png'
import { wechatSignature } from '../services/wits'

const shareData = {
  title: '见识大佬年终大盘点',
  desc: '这些入驻见识的首席、专家和精英，你认识几位？？',
  imgUrl: 'https://wpimg.wallstcn.com/d5e90540-b818-4553-b599-034240761aa9.png',
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
