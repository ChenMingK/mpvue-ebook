function createFly () {
  // 该库目前只支持微信和支付宝两种小程序，通过 mpvuePlatform 这一全局变量来判断
  if (mpvuePlatform === 'wx') {
    const Fly = require('flyio/dist/npm/wx.js')
    return new Fly()
  }
  return null
}

function handlerError (err) {
  console.log(err)
}

export function get (url, params = {}) {
  const fly = createFly()
  if (fly) {
    return new Promise((resolve, reject) => {
      // flyio 提供的 get API
      fly.get(url, params).then(response => {
        console.log(response)
        resolve(response)
      }).catch(err => {
        handlerError(err) // 定制异常处理
        reject(err)
      })
    })
  }
}
