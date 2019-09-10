// 封装微信 API
import { getOpenId } from './index'
/**
 * 判断小程序是否获得权限
 * @param {Function} onSuccess 成功的回调
 * @param {Function} onFail 失败的回调
 */
export function getSetting (auth, onSuccess, onFail) {
  mpvue.getSetting({
    success (res) {
      // 是否具备特定权限
      if (res.authSetting[`scope.${auth}`]) {
        // console.log(res)
        onSuccess(res)
      } else {
        onFail(res)
      }
    },
    fail (res) {
      console.log(res) // 直接抛出异常
    }
  })
  // res.authSetting = {
  //   "scope.userInfo": true,
  //   "scope.userLocation": true
  // }
}

/**
 * 调用 wx.getUserInfo() 获取用户信息
 * @param {Function} onSuccess 成功的回调
 * @param {Function} onFail 失败的回调
 */
export function getUserInfo (onSuccess, onFail) {
  mpvue.getUserInfo({
    success (res) {
      console.log(res)
      const { userInfo } = res
      if (userInfo) {
        onSuccess(userInfo)
      } else {
        onFail(res)
      }
    },
    fail (res) {
      console.log(res) // 直接抛出异常
    }
  })
}

/**
 * 缓存设置 API
 * @param {String} key key
 * @param {String} data value
 */
export function setStorageSync (key, data) {
  mpvue.setStorageSync(key, data)
}

export function getStorageSync (key) {
  return mpvue.getStorageSync(key)
}

export function getUserOpenId (callback) {
  // 记忆方法：wx.xxx -> mpvue.xxx
  mpvue.login({
    success (res) {
      if (res.code) {
        const { code } = res
        getOpenId(code).then(response => {
          const openid = response.data.data.openid
          setStorageSync('openId', openid)
          callback && callback(openid) // 获取 openid 后的回调
        }).catch(err => {
          console.log(err) // 异常处理
        })
      } else { // 没有获取到 code
        console.log(res)
      }
    },
    fail (res) {
      console.log() // 直接抛出异常
    }
  })
}

// wx.showLoading()
export function showLoading (title) {
  mpvue.showLoading({
    title,
    mask: true // 防止触摸穿透
  })
}

// wx.hideLoading()
export function hideLoading () {
  mpvue.hideLoading()
}
