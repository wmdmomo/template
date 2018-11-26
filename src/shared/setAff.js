import Cookie from 'cookie.js'
import extractRootDomain from './extractRootDomain'

export default () => {
  const aff = new URLSearchParams(location.search).get('aff')

  if (aff) {
    Cookie.set('aff', aff, {
      domain: extractRootDomain(),
      path: '/',
      maxAge: Infinity
    })
  }
}
