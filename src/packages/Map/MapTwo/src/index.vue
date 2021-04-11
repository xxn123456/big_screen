<template>
  <div ref="sendArear" class="send-arear" />
</template>
<script>
require('echarts/map/js/china')
// 导入公共地图包
import wuhanJson from '@/packages/Map/MapOne/util/wuhan.json'

var geoJson = wuhanJson

var geoCoordMap = {
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

var max = 480
var min = 9 // todo
var maxSize4Pin = 100
var minSize4Pin = 20

var convertData = function(data) {
  var res = []
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      })
    }
  }
  return res
}
export default {
  name: 'MapTwo',
  data() {
    return {
      chartData: [{
        name: '黄陂区',
        value: 10

      },
      {
        name: '武昌区',
        value: 50
      }, {
        name: '江夏区',
        value: 20
      }, {
        name: '江岸区',
        value: 80
      }, {
        name: '硚口区',
        value: 8
      }, {
        name: '江汉区',
        value: 6
      },
      {
        name: '洪山区',
        value: 90
      }, {
        name: '新洲区',
        value: 120
      }, {
        name: '蔡甸区',
        value: 70
      }, {
        name: '东西湖区',
        value: 20
      }
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
          text: '武汉新冠费用感染人数',
          subtext: '/人',
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

        geo: {
          map: 'wuhan',
          zoom: 1.2,
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
        series: [{
          name: '地图名称',
          type: 'scatter',
          coordinateSystem: 'geo',
          symbol: 'pin',
          symbolSize: function(val) {
            var a = (maxSize4Pin - minSize4Pin) / (max - min)
            var b = minSize4Pin - a * min
            b = maxSize4Pin - a * max
            return a * val[2] + b
          },
          label: {
            normal: {
              show: true,
              formatter: function(data) {
                return data.name
              },
              position: 'bottom',
              textStyle: {
                color: '#fff',
                fontSize: 9
              }
            }
          },
          itemStyle: {
            normal: {
              color: '#F62157',
              shadowBlur: 10,
              shadowColor: '#F62157'
            }
          },
          zlevel: 6,
          data: convertData(this.chartData)
        },
        {
          name: '地图数值',
          type: 'scatter',
          coordinateSystem: 'geo',
          symbol: 'pin',
          symbolSize: function(val) {
            var a = (maxSize4Pin - minSize4Pin) / (max - min)
            var b = minSize4Pin - a * min
            b = maxSize4Pin - a * max
            return a * val[2] + b
          },
          label: {
            normal: {
              show: true,
              formatter: function(data) {
                return data.value[2]
              },

              textStyle: {
                color: '#fff',

                fontSize: 9
              }
            }
          },
          itemStyle: {
            normal: {
              color: '#F62157',
              shadowBlur: 10,
              shadowColor: '#F62157'
            }
          },
          zlevel: 8,
          data: convertData(this.chartData)
        },
        {
          type: 'map',
          // mapType: 'wuhan',
          coordinateSystem: 'geo',
          zoom: 1.2,
          roam: false, // 是否开启鼠标缩放和平移漫游
          label: {
            emphasis: {
              show: false
            }
          },

          data: this.chartData
        }

        ]
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
