import Cookies from 'js-cookie'

const TokenKey = 'admin-blog-token' // 设定一个独一无二的key
const timeKey = 'admin-blog-timestamp' // 设定一个独一无二的时间戳key

/*
* 读取缓存中的token
*/
export function getToken() {
  return Cookies.get(TokenKey)
}
/*
* 将token设置到缓存中
*/
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
/*
* 删除缓存中的token
*/
export function removeToken() {
  return Cookies.remove(TokenKey)
}
/*
* 读取时间戳
*/
export function getTimeStamp() {
  return Cookies.get(timeKey)
}
/*
* 设置时间戳
*/
export function setTimeStamp() {
  // 设置时间戳 应该设置当前的最新的时间
  Cookies.set(timeKey, new Date().getTime())
}

