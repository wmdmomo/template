import WscnIvankaAPI from 'wscn-ivanka-api'
import handleError from '~/shared/handleError'

const api = new WscnIvankaAPI({
  ivankaPlatform: 'wscn-platform',
  clientType: 'mweb',
  deviceIdPrefix: 'mwscn',
  cache: true,
  onSafeError: handleError,
  base: 'https://api.jianshiapp.com/apiv1'
})

export default api
