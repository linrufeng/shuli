/* eslint-disable */
import getVue from './getVue'
export function getVueRouter() {
  const perVue = getVue()
  if (!perVue) {
    return ''
  }
  const $vue = perVue
  return $vue.$route.matched[0].path
}
// add eventlistening
export async function getVueRouterHooks() {
  return new Promise((reslove) => {
    const perVue = getVue()
    if (!perVue) {
      return ''
    }
    const $vue = perVue
    if (!$vue.$router) {
      reslove(0)
      return 
    }
    $vue.$router.afterHooks.push((to) => {
      if (to.matched && to.matched[0]) { reslove(performance.now()) }
    })
  })
}
