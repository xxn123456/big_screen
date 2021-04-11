import BarThree from './src/index.vue';

BarThree.install = function (Vue) {
  Vue.component(BarThree.name,BarThree);
};

export default BarThree;