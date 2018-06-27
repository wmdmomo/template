import config from '~/config'
/* eslint-disable import/no-webpack-loader-syntax */
import img from '!!file-loader!~/images/logo.png'

export default {
  title: 'title',
  desc: 'blah...blah...blah...',
  imgUrl: img,
  link: `${config.BASE_URL}/`
}
