<template>
  <div ref="Pie" class="chart-wrap" />
</template>

<script>
// 基础折线图
export default {
  name: 'RadarOne',
  props: ['chartOption', 'chartData'],
  data() {
    return {
      option: {

      },
      target: {

      }
    }
  },
  watch: {
    option() {
      const myChart = this.$echarts.init(this.$refs.Pie)

      console.log(this.target)

      // 修改标题
      this.option.title.text = this.target.title
      // 修改单位

      this.option.title.subtext = this.target.chartData[0].unit

      const new_target = this.target.chartData[0].data

      console.log(new_target)

      const x = []

      new_target.forEach((item, index) => {
        x.push(item.name)
      })

      this.option.legend.data = x

      this.option.series[0].data = new_target

      const options = this.option

      myChart.setOption(options)
    }
  },

  mounted() {
    this.dragChart()
    this.init()
  },
  methods: {
    dragChart() {
      const myChart = this.$echarts.init(this.$refs.Pie)
      const options = {
        backgroundColor: '',
        tooltip: {},
        title: {
          text: '专业技术人员构成人数',
          subtext: '单位/人',
          left: '0',
          textStyle: {
            color: '#fff',
            left: '0',
            fontSize: 16
          }
        },
        legend: {
          show: true,
          icon: 'circle',
          bottom: 30,
          center: 0,
          itemWidth: 14,
          itemHeight: 14,
          shadowColor: 'rgba(0, 0, 0, 1)',
          shadowBlur: 30,
          shadowOffsetX: 10,
          shadowOffsetY: 10,
          // itemGap: 30,
          orient: 'horizontal',
          data: ['一级权重分析d'],
          textStyle: {
            fontSize: 12,
            color: '#fff'
          }
        },

        radar: {
          // shape: 'circle',
          radius: '60%',
          center: ['50%', '50%'],
          startAngle: 0,
          triggerEvent: true,
          name: {
            textStyle: {
              color: '#fff',
              fontSize: '12',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          nameGap: '2',
          indicator: [{
            name: '执业医师',
            max: 6500
          },
          {
            name: '医师助理',
            max: 16000
          },
          {
            name: '注册护士',
            max: 30000
          },
          {
            name: '药师',
            max: 38000
          },
          {
            name: '技师',
            max: 52000
          }
          ],
          splitArea: {
            areaStyle: {
              color: [
                'rgba(50,123,250, 0.1)', 'rgba(50,123,250, 0.2)',
                'rgba(50,123,250, 0.3)', 'rgba(50,123,250, 0.4)',
                'rgba(50,123,250, 0.5)', 'rgba(50,123,250, 0.6)'
              ].reverse(),
              shadowColor: 'rgba(0, 0, 0, 1)',
              shadowBlur: 30,
              shadowOffsetX: 10,
              shadowOffsetY: 10
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(0,206,209, 0.3)'
            }
          },
          splitLine: {
            lineStyle: {
              width: 1,
              color: [
                'rgba(0,206,209, 0.1)', 'rgba(0,206,209, 0.2)',
                'rgba(0,206,209, 0.3)', 'rgba(0,206,209, 0.4)',
                'rgba(0,206,209, 0.5)', 'rgba(0,206,209, 0.6)'
              ].reverse()
            }
          }

        },
        series: [{
          name: '一级权重分析',
          type: 'radar',
          areaStyle: {
            normal: {
              color: 'rgba(127,255,210, 0.5)'
            }
          },
          symbol: 'circle',
          symbolSize: 6,
          itemStyle: {
            color: 'rgba(127,255,210,0.8)',
            borderColor: 'rgba(127,255,210,0.2)',
            borderWidth: 8
          },
          lineStyle: {
            color: 'rgba(127,255,210, 0.6)',
            width: 2
          },
          label: {
            show: true

          },
          data: [
            [4600, 13000, 25000, 23500, 25000]
          ]
        }]

      }

        console.log("option",JSON.stringify(options));


      myChart.setOption(options)
    },
    init() {
      this.option = this.chartOption

      this.target = this.chartData
    }
  }
}

</script>

<style lang="scss" scoped>
  .chart-wrap {
    width: 100%;
    height: 100%;
  }

</style>
