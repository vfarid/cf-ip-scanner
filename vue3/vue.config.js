module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/cf-ip-scanner/'
    : '/'
}