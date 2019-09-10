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

export function get (url, params = {}, showError = true) {
  const fly = createFly()
  if (fly) {
    return new Promise((resolve, reject) => {
      // flyio 提供的 get API
      fly.get(url, params).then(response => {
        if (response && response.data && response.data.error_code === 0) {
          resolve(response)
        } else {
          if (showError) {
            const msg = (response && response.data && response.data.msg) || '请求失败' // && 写法前面都为 true 才会赋为最后的值，否则为 false
            mpvue.showToast({ // 对应 wx.showToast
              title: msg,
              duration: 2000
            })
          }
          reject(response) // 可以被 catch 捕获
        }
      }).catch(err => {
        handlerError(err) // 定制异常处理
        reject(err)
      })
    })
  }
}

export function post (url, params = {}, showError = true) {
  const fly = createFly()
  if (fly) {
    return new Promise((resolve, reject) => {
      // flyio 提供的 get API
      fly.post(url, params).then(response => {
        if (response && response.data && response.data.error_code === 0) {
          resolve(response)
        } else {
          if (showError) {
            const msg = (response && response.data && response.data.msg) || '请求失败' // && 写法前面都为 true 才会赋为最后的值，否则为 false
            mpvue.showToast({ // 对应 wx.showToast
              title: msg,
              duration: 2000
            })
          }
          reject(response) // 可以被 catch 捕获
        }
      }).catch(err => {
        handlerError(err) // 定制异常处理
        reject(err)
      })
    })
  }
}
