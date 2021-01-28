import { perEntry, getPerformance, handGetPerformance } from './paint'
import { getVueRouterHooks } from './watchVue'
import sendDB from './imgSendtodb'
/**
 * 性能监控核心
 * @param {string} interface  有效的接口请求
 */
(() => {
  try {
    const perUrl = '//idetest-api.shuiditech.com/api/performance/v1/monitor/record'
    // 1. 初始化发送字段
    const res = {
      pn: ''
    }
    // 有效接口
    let interfaces = ''
    if ('__zq_fe_performance_dp_obj__' in window) {
      interfaces = __zq_fe_performance_dp_obj__.interfaces
      res.pn = __zq_fe_performance_dp_obj__.projectname
    }
    getVueRouterHooks().then((rest) => {
      res.vrts = rest
    })

    // 2. 定时获取 5000 ms获取 paint
    let timeID = null
    // 3. 添加监控
    const observes = perEntry(res, interfaces, (resObj) => {
      // 当参数都获取完毕
      clearTimeout(timeID)
      // res 添加当前 performance 指标
      getPerformance(resObj)
      // sendtoDb res
      sendDB(perUrl, resObj)
    })
    // 监听 vue route跳转时间

    if (timeID) {
      clearTimeout(timeID)
    }
    // 5s后还获取不到数据
    timeID = setTimeout(() => {
      // clear observes
      observes.disconnect()
      // res 添加当前 performance 指标
      getPerformance(res)
      // 手动获取各种请求参数
      handGetPerformance(res, interfaces)
      // sendtoDb
      sendDB(perUrl, res)
    }, 5000)
  } catch {

  }
})()
