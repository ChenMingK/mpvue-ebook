import { get, post } from '../utils/request'

const API_URL = 'https://test.youbaobao.xyz:18081'
export function getHomeData (params) {
  return get(`${API_URL}/book/home/v2`, params)
}

export function getRecommendData () {
  return get(`${API_URL}/book/home/recommend/v2`)
}

export function getfreeReadData () {
  return get(`${API_URL}/book/home/freeRead/v2`)
}

export function getHotBookData () {
  return get(`${API_URL}/book/home/hotBook/v2`)
}

// 携带 code 向服务端发送请求以获取用户 openId 和 session_key
export function getOpenId (code) {
  return get(`${API_URL}/openId/get`, {
    appId: 'wxccb2bf023528ffad',
    secret: 'c3a2f68a8eefc6626aceb137a792520e',
    code
  })
}

// 用户注册
// 如果用户已经注册过，则再次调用该 API 会进行用户数据更新，即更新头像等可能会修改的信息
export function register (openId, userInfo) {
  return post(`${API_URL}/user/register`, {
    openId,
    platform: mpvuePlatform, // mpvue 全局环境变量，表明平台
    ...userInfo
  })
}
