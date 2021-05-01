import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

// 拖拽模板容器布局
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

import App from './App'
import store from './store'
import router from './router'


import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters



import autoJion from '@/packages/index.js'

import 'highlight.js/styles/github.css';

import echarts from 'echarts'



// 使用轮播
import vueSwiper from 'vue-awesome-swiper'

import 'swiper/swiper.scss'

Vue.use(vueSwiper);

Vue.prototype.$echarts = echarts


// 使用md 编辑器

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(mavonEditor);



import VueSocketIO from 'vue-socket.io';

import SocketIO from 'socket.io-client';

Vue.use(new VueSocketIO({
    // debug: true,
  connection: SocketIO('http://shutiaogege.top:3001'),
})
)







/**
 * If you don't want to use mock-server
 * you cwant to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
    const { mockXHR } = require('../mock')
    mockXHR()
}

Vue.use(Element, {
    size: Cookies.get('size') || 'medium' // set element-ui default size
})



Vue.use(autoJion);

// register global utility filters
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.config.productionTip = false;


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})