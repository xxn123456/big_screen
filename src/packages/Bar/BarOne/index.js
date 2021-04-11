import BarOne from './src/index.vue';

BarOne.install = function (Vue) {
  Vue.component(BarOne.name,BarOne);
};

export default BarOne;