import PieOne from './src/index.vue'

PieOne.install = function(Vue) {
  Vue.component(PieOne.name, PieOne)
}

export default PieOne
