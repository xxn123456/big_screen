<template>
  <div ref="Pie" class="chart-wrap" />
</template>

<script>
// 基础折线图
export default {
  name: 'PieThree',
  props: ['chartOption', 'chartData', 'isOnResize'],
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
      this.dragNewChart()
    },
    chartData() {
      // console.log("数据发送变化");
      this.option = this.chartOption
      this.target = this.chartData

      this.dragNewChart()
    },
    isOnResize() {
      this.dragNewChart()
    }
  },

  mounted() {
    this.init()
  },
  methods: {
    dragChart() {
      const myChart = this.$echarts.init(this.$refs.Pie)
      myChart.resize()
      const options = {
        backgroundColor: '',
        // 标题预留
        title: {
          text: '专业技术人员变动图',
          subtext: '单位%',
          left: '0',
          textStyle: {
            color: '#fff',
            left: '0',
            fontSize: 16
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: 0,
          data: ['执行医师', '注册护士', '药剂人员', '检验专员', '其他卫技人员'],
          textStyle: {
            color: '#fff'
          }
        },
        series: [{
          name: '种类',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          roseType: 'radius',
          data: [{
            value: 210,
            name: '执行医师'
          },
          {
            value: 235,
            name: '注册护士'
          },
          {
            value: 274,
            name: '药剂人员'
          },
          {
            value: 310,
            name: '检验专员'
          },
          {
            value: 435,
            name: '其他卫技人员'
          }
          ],
          label: {
            normal: {
              formatter: params => {
                return (
                  '{name|' + params.name + ':' + '}{value|' +
                    params.value + '}'
                )
              },
              rich: {
                name: {
                  fontSize: 12,
                  color: '#fff'
                },
                value: {
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#fff'
                }
              }

            }
          },
          labelLine: {
            lineStyle: {
              color: '#888'
            }
          },
          itemStyle: {
            normal: {
              color: function(params) {
                var colorList = ['rgba(50,123,250,1)', 'rgba(50,123,250,0.85)', 'rgba(50,123,250,0.7)',
                  'rgba(50,123,250,0.6)', 'rgba(50,123,250,0.4)', 'rgba(50,123,250,0.25)',
                  'rgba(50,123,250,0.1)'
                ]
                return colorList[params.dataIndex % colorList.length]
              }
            }
          }

        }]

      }
     console.log("option",JSON.stringify(options));

      myChart.setOption(options)
    },
    dragNewChart() {
      const myChart = this.$echarts.init(this.$refs.Pie)
      myChart.resize()

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
    },
    init() {
      this.dragChart()
      // 图表发生变化无论是option 还是data 都会引起
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
