/* eslint-disable no-restricted-syntax */
/**
 * 获取 performance 的各种参数
 * @param {any} obj
 */
export function getPerformance(obj) {
  // 获取基础数据参数
  if ('performance' in window) {
    const { timeOrigin, timing } = performance
    const {
      navigationStart,
      fetchStart,
      domainLookupStart,
      domainLookupEnd,
      connectStart,
      connectEnd,
      requestStart,
      responseStart,
      responseEnd,
      domLoading,
      domInteractive,
      domComplete
    } = timing
    const timefetchStart = fetchStart - timeOrigin

    if (obj.lcpd || obj.fcpd) {
      obj.fsp = (obj.lcpd || obj.fcpd) - timefetchStart // 来自百度定义 首次超过屏幕高度时的速度 - 浏览器发起请求
    }
    obj.pdes = fetchStart - navigationStart // page destruction duration 上个页面销毁时间
    obj.doms = domLoading - timeOrigin// dom 开始解析时间
    obj.dnsa = domainLookupEnd - domainLookupStart // dns analysis duration
    obj.tcpl = connectEnd - connectStart // tcp link  duration
    obj.sert = responseStart - requestStart // Server response duration
    obj.ctxt = responseEnd - responseStart // context text get duration
    obj.pdom = domLoading - responseEnd // before domloading duration
    obj.pact = domInteractive - domLoading // before domInteractive duration
    obj.domc = domComplete - domInteractive // domcomplete  duration
    obj.doma = domComplete - domLoading //  domLoading total duration
    obj.domt = domComplete - fetchStart // all group duration
    obj.tti = domInteractive - fetchStart // tti
  }
  return obj
}
/**
 *
 * @param {preformance} entries
 * @param {any} obj
 * @param {string} interfaces 第一个有效接口
 */
const printPerformanceEntry = (entries, obj, interfaces) => {
  for (const entry of entries) {
    const val = entry.name || entry.entryType
    if (val === 'first-paint') {
      obj.fps = entry.startTime
      // obj.fpd = entry.duration
      obj.fpd = entry.startTime + entry.duration
    } else if (val === 'first-contentful-paint') {
      obj.fcps = entry.startTime
      // obj.fcpd = entry.duration
      obj.fcpd = entry.startTime + entry.duration
    } else if (val === 'largest-contentful-paint') {
      obj.lcps = entry.startTime
      // obj.lcpd = entry.duration
      obj.lcpd = entry.startTime + entry.duration
    } else if (val === interfaces) {
      obj.facres = entry.startTime
      // obj.facred = entry.duration
      obj.facred = entry.startTime + entry.duration
    }
  }
}
/**
 * 通过监控获取性能指标
 * @param {any} obj 各种数据指标
 * @param {string} interfaces  第一个有效接口
 * @param {fu} callBack 完成的回调函数
 */
export function perEntry(obj, interfaces, callBack) {
  /**
   * 第一个有效接口请求 和paint指标
   * 'paint','resource','longtask','largest-contentful-paint'
  */
  if (!('PerformanceObserver' in window)) {
    return {}
  }
  const entrtTypes = ['paint', 'resource', 'longtask', 'largest-contentful-paint']
  const perObserver = new PerformanceObserver((PerformanceObserverEntryList) => {
    printPerformanceEntry(PerformanceObserverEntryList.getEntries(), obj, interfaces)
    if ((interfaces && obj.facres && obj.lcps && obj.fcps && obj.fps) || (obj.lcps && obj.fcps && obj.fps)) {
      // 参数都得到后
      callBack(obj)
      // 停止监控
      perObserver.disconnect()
    }
  })
  // 监听的函数
  perObserver.observe({ entryTypes: entrtTypes })
  return perObserver
}


/**
 * 手动获取各种指标
 * @param {any} obj
 */
export function handGetPerformance(obj, interfaces) {
  if (!('performance' in window)) {
    return obj
  }
  // 获取当前监控指标
  const perFormancEntries = performance.getEntries()
  // 拆解各种监控指标
  printPerformanceEntry(perFormancEntries, obj, interfaces)
  return obj
}
