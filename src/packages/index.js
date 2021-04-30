
import ChartDefault from './ChartDefault/index.js'

// 导入折线图这一类

import LineOne from './Line/LineOne/index.js'

import LineTwo from './Line/LineTwo/index.js'

import LineThree from './Line/LineThree/index.js'

import LineFour from './Line/LineFour/index.js'

// 导入柱状图这一类

import BarOne from './Bar/BarOne/index.js'

import BarTwo from './Bar/BarTwo/index.js'

import BarThree from './Bar/BarThree/index.js'

import BarFour from './Bar/BarFour/index.js'

// 导入饼图这一类

import PieOne from './Pie/PieOne/index.js'

import PieTwo from './Pie/pieTwo/index.js'

import PieThree from './Pie/PieThree/index.js'

// 导入雷达图

import RadarOne from './Radar/RadarOne/index.js'

// 导入仪表盘

import GaugeOne from './Gauge/GaugeOne/index.js'

// 导入表格这一类

import TableOne from './Table/TableOne/index.js'

// 导入翻牌器

import NumOne from './Num/NumOne/index.js'

// 一级标题

import TitleOne from './Title/TitleOne/index.js'

import TitleTwo from './Title/TitleTwo/index.js'

// 导入图片

import CustImg from './CustImg/index.js'

// 导入界面元素

import FootOne from './Page/FootOne/index.js'

import HeadOne from './Page/HeadOne/index.js'

import ScrollOne from './Page/ScrollOne/index.js'

import SwiperOne from './Page/SwiperOne/index.js'

import Trend from './Trend/index.js'

// 导入地图组件
// 闪烁点
import MapOne from './Map/MapOne/index.js'
// 气球

import MapTwo from './Map/MapTwo/index.js'

// 飞线

import MapThree from './Map/MapThree/index.js'


import ImgOne from './Img/ImgOne/index.vue'

// 存储组件列表
const components = [

  // 图表过滤条件
  ChartDefault,
  Trend,
  // 定义折线图这一类
  LineOne,
  LineTwo,
  LineThree,
  LineFour,
  // 定义柱状图这一类

  BarOne,
  BarTwo,
  BarThree,
  BarFour,
  // 定义饼图这一类

  PieOne,
  PieTwo,
  PieThree,

  // 导入雷达图
  RadarOne,
  // 导入仪表盘
  GaugeOne,

  // 定义表格
  TableOne,

  // 定义界面元素

  FootOne,
  HeadOne,
  ScrollOne,
  SwiperOne,

  // 定义翻牌器

  NumOne,
  // 定义一级标题
  TitleOne,
  // 定义正文
  TitleTwo,
  // 导入图片
  CustImg,
  // 导入地图
  MapOne,
  MapTwo,
  MapThree,
  ImgOne
]
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function(Vue) {
  // 判断是否安装
  if (install.installed) return
  install.installed = true
  // 遍历注册全局组件
  components.map(component => Vue.component(component.name, component))
  // 下面这个写法也可以
  // components.map(component => Vue.use(component))
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  ChartDefault,
  Trend,
  //  折线图类
  LineOne,
  LineTwo,
  LineThree,
  LineFour,
  //  柱状图类
  BarOne,
  BarTwo,
  BarThree,
  BarFour,
  //  定义饼图这一类
  PieOne,
  PieTwo,
  PieThree,
  //  定义表格这一类
  RadarOne,
  GaugeOne,
  TableOne,
  //  定义翻牌器
  NumOne,
  //  定义界面元素
  FootOne,
  HeadOne,
  ScrollOne,
  SwiperOne,
  //  定义一级标题

  TitleOne,
  TitleTwo,
  CustImg,
  // 导入地图
  MapOne,
  MapTwo,
  MapThree,
  ImgOne
}
