import GaugeOne from './src/index.vue';

GaugeOne.install = function (Vue) {
  Vue.component(GaugeOne.name,GaugeOne);
};

export default GaugeOne;