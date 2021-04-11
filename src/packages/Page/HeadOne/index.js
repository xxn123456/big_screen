import HeadOne from './src/index.vue'

HeadOne.install = function(Vue) {
  Vue.component(HeadOne.name, HeadOne)
}

export default HeadOne
