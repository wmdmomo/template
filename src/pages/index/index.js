import 'normalize.css'
import '~/styles/global.css'
import '~/styles/mobile-wrapper.css'
import './style.css'
import 'regenerator-runtime/runtime'
import 'wscn-affiliate'
import { setWechatShare } from '../../shared/shareMeta'
if (window.wx) {
  setWechatShare()
}
