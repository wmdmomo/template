const BASE_URL = ''

module.exports = {
  runtimeConfig: {
    BASE_URL
  },

  devServer: {
    port: 8080
  },

  publicPath: `${BASE_URL}/`
}
