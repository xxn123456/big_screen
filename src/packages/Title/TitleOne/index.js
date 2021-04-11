import TitleOne from './src/index.vue'

TitleOne.install = function(Vue) {
  Vue.component(TitleOne.name, TitleOne)
}

export default TitleOne
