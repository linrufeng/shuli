/* eslint-disable guard-for-in */
/**
 * 发送信息到服务
 * @param {string} url
 * @param {any} params
 */
import { getVueRouter } from './watchVue'

export default function sendDB(url, params) {
  //
  const pathName = getVueRouter()
  const img = new Image()
  const pr = []
  params.rt = pathName
  // eslint-disable-next-line no-restricted-syntax
  for (const key in params) {
    pr.push(`${key}=${params[key]}`)
  }
  console.log('发送收集指标', params)
  img.src = `${url}?${pr.join('&')}`
}
