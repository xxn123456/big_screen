<template>
  <div ref="Line" class="chart-wrap"></div>
</template>

<script>
  // 基础折线图
  export default {
    name: 'LineThree',
    props: ['chartOption', 'chartData', 'isOnResize'],
    data() {
      return {
        timeOut: null
      }

    },
    watch: {

      chartOption() {
        this.$nextTick(() => {
          this.debounce(this.dragNewChart())

        })

      },

      chartData() {

        this.$nextTick(() => {
          this.debounce(this.dragNewChart())

        })
      },
      isOnResize() {

        this.$nextTick(() => {
          this.debounce(this.dragNewChart())
        })

      }
    },

    mounted() {
      this.init()
    },
    methods: {
      debounce(fn) {

        if (this.timeOut) clearTimeout(this.timeOut);
        this.timeOut = setTimeout(() => {
          fn
        }, 1000);
      },
      dragChart() {
        const myChart = this.$echarts.init(this.$refs.Line);
        myChart.resize();
        const options = {
          backgroundColor: '',
          title: {
            text: '武汉市2020上半年消费水平',
            textStyle: {
              align: 'center',
              color: '#fff',
              fontSize: 16
            },
            left: 'center'
          },
          legend: {
            bottom: 0,
            data: ['消费水平', '人均收入情况'],
            textStyle: {
              color: '#fff'
            }
          },
          xAxis: {
            type: 'category',
            // 开启间隔
            // boundaryGap: false,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#fff'
              }
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: '#616582'
              }
            },
            data: ['一月', '二月', '三月', '四月', '五月', '六月']
          },
          yAxis: {
            type: 'value',
            name: '/元',
            axisLine: {
              show: false,
              lineStyle: {
                color: '#fff'
              }
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: '#616582'
              }
            },
            splitLine: {
              show: false
            }

          },
          series: [{
              name: '消费水平',
              type: 'line',
              showAllSymbol: true,
              symbol: 'circle',
              symbolSize: 8,
              lineStyle: {
                normal: {
                  color: '#A582EA',
                  shadowBlur: 0
                }
              },
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#A582EA'
                }
              },
              itemStyle: {
                color: '#A582EA',
                borderColor: '#fff',
                borderWidth: 1,
                shadowColor: 'rgba(0, 0, 0, .3)',
                shadowBlur: 0,
                shadowOffsetY: 2,
                shadowOffsetX: 2
              },
              tooltip: {
                show: false
              },
              areaStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(165,130,234,0.6)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(165,130,234,0)'
                    }
                  ], false),
                  shadowColor: 'rgba(165,130,234,0.9)',
                  shadowBlur: 10
                }
              },
              data: [4820, 932, 901, 934, 1290, 1330]
            },
            {
              name: '人均收入情况',
              type: 'bar',

              barWidth: '20px',
              itemStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0,244,255,1)'
                  }, {
                    offset: 1,
                    color: 'rgba(0,77,167,1)'
                  }], false),

                  shadowColor: 'rgba(0,160,221,1)',
                  shadowBlur: 4
                }
              },
              label: {
                normal: {
                  show: true,
                  position: 'top',
                  color: '#fff'
                }
              },
              data: [2540, 4510, 5580, 5263, 4574, 4382]
            }
          ]

        }

        myChart.setOption(options)
      },
      dragNewChart() {
        const myChart = this.$echarts.init(this.$refs.Line)
        myChart.resize();
         let new_option = JSON.parse(this.chartOption);

      
        myChart.setOption(new_option);
      },
      init() {
        this.$nextTick(() => {
          this.dragChart();
        });

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
