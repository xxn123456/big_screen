import RadarOne from './src/index.vue'

RadarOne.install = function(Vue) {
  Vue.component(RadarOne.name, RadarOne)
}

export default RadarOne
