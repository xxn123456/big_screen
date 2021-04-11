import ChartDefault from './src/index.vue';

ChartDefault.install = function (Vue) {
  Vue.component(ChartDefault.name,ChartDefault);
};

export default ChartDefault;