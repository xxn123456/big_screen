import LineOne from './src/index.vue'

LineOne.install = function(Vue) {
  Vue.component(LineOne.name, LineOne)
}

export default LineOne
