import 'normalize.css'
import '~/styles/global.css'
import '~/styles/mobile-wrapper.css'
import './style.css'

import 'regenerator-runtime/runtime'
// import ivanka from '~/services/ivanka'
// import jinshuju from '~/services/jinshuju'
// import config from '~/config'
// import auth from '~/shared/auth'
import gtag from '~/shared/gtag'
import { weixin, isWeixin } from '~/shared/weixin'
import shareMeta from '~/shared/shareMeta'
import setAff from '~/shared/setAff'

gtag.init()
setAff()

if (isWeixin) {
  weixin
    .init()
    .then(() => {
      weixin.setShareMeta(shareMeta)
    })
}
