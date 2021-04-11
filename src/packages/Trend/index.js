import Trend from './src/index.vue'

Trend.install = function(Vue) {
  Vue.component(Trend.name, Trend)
}

export default Trend
