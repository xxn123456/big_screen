<template>
  <div ref="sendArear" class="send-arear" />
</template>
<script>
require('echarts/map/js/china')
// 导入公共地图包
import wuhanJson from '@/packages/Map/MapOne/util/wuhan.json'

var geoJson = wuhanJson

var worldGeoCoordMap = {
  '黄陂区': [114.40, 30.90],
  '武昌区': [114.313985625, 30.5523195625],
  '江夏区': [114.32, 30.24],
  '江岸区': [114.30, 30.6],
  '硚口区': [114.27, 30.57],
  '江汉区': [114.27, 30.60],
  '青山区': [114.38, 30.63],
  '洪山区': [114.503985625, 30.5523195625],
  '新洲区': [114.70, 30.7365407539063],
  '蔡甸区': [114.00, 30.40],
  '东西湖区': [114.00, 30.66056175]
}

var chartData = [
  [{
    name: '武昌区',
    value: 35
  }],
  [{
    name: '青山区',
    value: 35
  }],
  [{
    name: '蔡甸区',
    value: 35
  }],
  [{
    name: '新洲区',
    value: 35
  }]
]

// 覆盖点

var convertData = function(data) {
  var res = []
  for (var i = 0; i < data.length; i++) {
    var dataItem = data[i]
    var fromCoord = worldGeoCoordMap[dataItem[0].name]
    var toCoord = [114.30, 30.6]
    if (fromCoord && toCoord) {
      res.push([{
        coord: fromCoord,
        value: dataItem[0].value
      }, {
        coord: toCoord
      }])
    }
  }
  return res
}

var series = [];
[
  ['江岸区', chartData]
].forEach(function(item, i) {
  console.log(item)
  series.push({
    type: 'lines',
    zlevel: 2,
    effect: {
      show: true,
      period: 2, // 箭头指向速度，值越小速度越快
      trailLength: 0.02, // 特效尾迹长度[0,1]值越大，尾迹越长重
      symbol: 'arrow', // 箭头图标
      symbolSize: 3 // 图标大小
    },
    lineStyle: {
      normal: {
        color: '#05C3F9',
        width: 1, // 尾迹线条宽度
        opacity: 0.8, // 尾迹线条透明度
        curveness: 0.3 // 尾迹线条曲直度
      }
    },
    data: convertData(item[1])
  }, {
    type: 'effectScatter',
    coordinateSystem: 'geo',
    zlevel: 2,
    rippleEffect: { // 涟漪特效
      period: 4, // 动画时间，值越小速度越快
      brushType: 'stroke' // 波纹绘制方式 stroke, fill

    },
    label: {
      normal: {
        show: true,
        position: 'right', // 显示位置
        offset: [5, 0], // 偏移设置
        formatter: function(params) { // 圆环显示文字
          return params.data.name
        },
        fontSize: 13
      },
      emphasis: {
        show: true
      }
    },
    symbol: 'circle',
    symbolSize: function(val) {
      return val[2] / 10 // 圆环大小
    },
    itemStyle: {
      normal: {
        show: false,
        color: '#05C3F9'
      }
    },
    data: item[1].map(function(dataItem) {
      return {
        name: dataItem[0].name,
        value: worldGeoCoordMap[dataItem[0].name].concat([dataItem[0].value])
      }
    })
  },
  // 被攻击点
  {
    type: 'scatter',
    coordinateSystem: 'geo',
    zlevel: 2,
    rippleEffect: {
      period: 4,
      brushType: 'stroke'

    },
    label: {
      normal: {
        show: true,
        position: 'inside',
        // offset:[5, 0],
        color: '#fff',
        formatter: '{b}',
        textStyle: {
          color: '#fff'
        }
      },
      emphasis: {
        show: false

      }
    },
    symbol: 'pin',
    symbolSize: 50,
    data: [{
      name: item[0],
      value: worldGeoCoordMap[item[0]].concat([10])
    }]
  }
  )
})
export default {
  name: 'MapThree',
  data() {
    return {
      chartData: [
        [{
          name: '武昌区',
          value: 35
        }],
        [{
          name: '青山区',
          value: 35
        }],
        [{
          name: '蔡甸区',
          value: 35
        }],
        [{
          name: '新洲区',
          value: 35
        }]
      ]
    }
  },
  mounted() {
    this.setMap()
  },
  methods: {
    setMap() {
      var mapChart = this.$echarts.init(this.$refs.sendArear)
      this.$echarts.registerMap('wuhan', geoJson)
      mapChart.setOption({
        title: {
          text: '江岸区新冠病毒来源',
          subtext: '/地区',
          x: 'left',
          textStyle: {
            fontSize: '14',
            color: '#fff'
          },
          subtextStyle: {
            fontSize: '12',
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(166, 200, 76, 0.82)',
          borderColor: '#FFFFCC',
          showDelay: 0,
          hideDelay: 0,
          enterable: true,
          transitionDuration: 0,
          extraCssText: 'z-index:100',
          formatter: function(params, ticket, callback) {
            // 根据业务自己拓展要显示的内容
            var res = ''
            var name = params.name
            var value = params.value[params.seriesIndex + 1]
            res = "<span style='color:#fff;'>" + name + '</span><br/>数据：' + value
            return res
          }
        },
        geo: {
          map: 'wuhan',
          zoom: 1.2,
          label: {
            emphasis: {
              show: false
            }
          },
          roam: true, // 是否允许缩放
          itemStyle: {
            normal: {
              borderColor: 'rgba(147, 235, 248, 1)',
              borderWidth: 1,
              areaColor: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              },
              shadowColor: 'rgba(128, 217, 248, 1)',

              shadowOffsetX: -2,
              shadowOffsetY: 2,
              shadowBlur: 10
            },
            emphasis: {
              areaColor: '#389BB7',
              borderWidth: 0
            }
          }
        },
        series: series
      })
    }
  }
}

</script>
<style scoped>
  .send-arear {
    width: 100%;
    height: 100%;

  }

</style>
