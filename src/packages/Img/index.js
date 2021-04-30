import ImgOne from './src/index.vue';

ImgOne.install = function (Vue) {
  Vue.component(ImgOne.name,ImgOne);
};

export default ImgOne;