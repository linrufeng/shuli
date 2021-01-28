/* eslint-disable */
export default function getVue() {
  const rootInstances = []

  function scan() {
    rootInstances.length = 0
    let inFragment = false
    let currentFragment = null

    function processInstance(instance) {
      if (instance) {
        if (rootInstances.indexOf(instance.$root) === -1) {
          instance = instance.$root
        }
        if (instance._isFragment) {
          inFragment = true
          currentFragment = instance
        }

        // respect Vue.config.devtools option
        let baseVue = instance.constructor
        while (baseVue.super) {
          baseVue = baseVue.super
        }
        rootInstances.push(instance)

        return true
      }
    }

    walk(document, (node) => {
      if (inFragment) {
        if (node === currentFragment._fragmentEnd) {
          inFragment = false
          currentFragment = null
        }
        return true
      }
      const instance = node.__vue__

      return processInstance(instance)
    })
  }

  /**
   * DOM walk helper
   *
   * @param {NodeList} nodes
   * @param {Function} fn
   */

  function walk(node, fn) {
    if (node.childNodes) {
      for (let i = 0, l = node.childNodes.length; i < l; i++) {
        const child = node.childNodes[i]
        const stop = fn(child)
        if (!stop) {
          walk(child, fn)
        }
      }
    }

    // also walk shadow DOM
    if (node.shadowRoot) {
      walk(node.shadowRoot, fn)
    }
  }

  scan()
  return rootInstances[0]
}

