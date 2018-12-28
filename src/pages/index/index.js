import 'normalize.css'
import '~/styles/global.css'
import '~/styles/mobile-wrapper.css'
import './style.css'

import 'regenerator-runtime/runtime'
// import ivanka from '~/services/ivanka'
// import jinshuju from '~/services/jinshuju'
import config from '~/config'
// import auth from '~/shared/auth'
import gtag from '~/shared/gtag'
import { weixin, isWeixin } from '~/shared/weixin'
// import shareMeta from '~/shared/shareMeta'
import 'wscn-affiliate'

gtag.init()

if (isWeixin) {
  alert(1)
  weixin
    .init()
    .then(() => {
      alert(2)
      weixin.setShareMeta({
        title: '你有一份择机而动的见识宝典待领取 or 就在见识！必须献给2019的宝典',
        desc: '见识过2018的风起云涌，你的2019必须择机而动',
        imgUrl: 'https://wpimg.wallstcn.com/834f39db-37b6-4297-9731-cf3e3b927bfe.png',
        link: `${config.BASE_URL}/`
      })
    })
}
const showbutton = document.querySelector('#showbutton')
const closebutton = document.querySelector('#closebutton')
const modal = document.querySelector('.mask')
showbutton.addEventListener('click', () => {
  modal.classList.add('show')
  stopBodyScroll(true)
})
closebutton.addEventListener('click', () => {
  modal.classList.remove('show')
  stopBodyScroll(false)
})
let bodyEl = document.body
let top = 0

function stopBodyScroll(isFixed) {
  if (isFixed) {
    top = window.scrollY
    bodyEl.style.position = 'fixed'
    bodyEl.style.top = -top + 'px'
    bodyEl.style.left = 0
    bodyEl.style.width = '100%'
    bodyEl.style.overflow = 'hidden'
  } else {
    bodyEl.style.position = ''
    bodyEl.style.top = ''
    bodyEl.style.overflow = ''
    window.scrollTo(0, top) // 回到原先的top
  }
}
