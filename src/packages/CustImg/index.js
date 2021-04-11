import CustImg from './src/index.vue';

CustImg.install = function (Vue) {
  Vue.component(CustImg.name,CustImg);
};

export default CustImg;