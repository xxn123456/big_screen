import BarTwo from './src/index.vue';

BarTwo.install = function (Vue) {
  Vue.component(BarTwo.name,BarTwo);
};

export default BarTwo;