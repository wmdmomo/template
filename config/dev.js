const BASE_URL = ''

module.exports = {
  runtimeConfig: {
    BASE_URL,
    API_URL: 'https://api-sit.jianshiapp.com/apiv1'
  },

  devServer: {
    port: 8080
  },

  publicPath: `${BASE_URL}/`
}
