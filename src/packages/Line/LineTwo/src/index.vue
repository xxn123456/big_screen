<template>
  <div ref="Line" class="chart-wrap"></div>
</template>

<script>
  // 基础折线图
  export default {
    name: 'LineTwo',
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
            boundaryGap: false,
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
              type: 'line',
              showAllSymbol: true,
              symbol: 'circle',
              symbolSize: 8,
              lineStyle: {
                normal: {
                  color: '#6c50f3',
                  shadowBlur: 0
                }
              },
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#6c50f3'
                }
              },
              itemStyle: {
                color: '#6c50f3',
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
                      color: 'rgba(108,80,243,0.3)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(108,80,243,0)'
                    }
                  ], false),
                  shadowColor: 'rgba(108,80,243, 0.9)',
                  shadowBlur: 20
                }
              },
              data: [2820, 3932, 4901, 3934, 4290, 5330]
            }
          ]

        };
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
