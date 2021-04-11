import BarFour from './src/index.vue';

BarFour.install = function (Vue) {
  Vue.component(BarFour.name,BarFour);
};

export default BarFour;