<template>
  <div ref="Line" class="chart-wrap"></div>
</template>

<script>
  // 基础折线图
  export default {
    name: 'BarFour',
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
        let options = {
          backgroundColor: '',
          title: {
            text: '武汉市某医疗机构收入与支出情况',
            textStyle: {

              align: 'center',

              color: '#fff',

              fontSize: 16,
            },
            left: 'center',
          },
          legend: {
            bottom: 0,
            data: ['投入', '收入'],
            textStyle: {
              color: '#fff'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            top: '10%',
            right: '8%',
            left: '8%',
            bottom: '18%'
          },
          xAxis: [{
            type: 'category',
            data: ['2015年', '2016年', '2017年', '2018年', '2019年', '2020年'],
            axisLine: {
              lineStyle: {
                color: '#e2e9ff'
              }
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: "#616582"
              }
            },
            axisLabel: {
              margin: 10,
              color: '#e2e9ff',
              textStyle: {
                fontSize: 14
              },
            },
          }],
          yAxis: [{
            name: "/万元",
            type: "value",
            nameTextStyle: {
              color: "#fff",

            },
            axisLabel: {
              formatter: '{value}',
              color: '#e2e9ff',
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: "#616582"
              }
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#233e64'
              }
            },
          }],
          series: [{
              name: "收入",
              type: 'bar',
              stack: '情况',
              data: [80, 91, 58, 83, 64, 92],
              barWidth: '18px',
              itemStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0,244,255,1)'
                  }, {
                    offset: 1,
                    color: '#854cff'
                  }], false),

                  shadowColor: 'rgba(0,160,221,1)',
                  shadowBlur: 4
                }

              },
              label: {
                normal: {
                  show: false,
                  color: "#fff"
                },

              }
            },
            {
              name: "投入",
              type: 'bar',
              stack: '情况',
              data: [40, 51, 58, 63, 74, 82],
              barWidth: '18px',
              itemStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(165,130,234,1)'
                  }, {
                    offset: 1,
                    color: '#bf19ff'
                  }], false),

                  shadowColor: 'rgba(0,160,221,1)',
                  shadowBlur: 4,
                  barBorderRadius: [3, 2, 0, 0]
                }
              },
              label: {
                normal: {
                  show: false,
                  color: "#fff"
                },

              }
            }
          ]

        };

        myChart.setOption(options)
      },
      dragNewChart() {
        const myChart = this.$echarts.init(this.$refs.Line)
        myChart.resize();
          if(typeof(this.chartOption)=='string'){
          let new_option = JSON.parse(this.chartOption);

          myChart.setOption(new_option);


        }else{

          myChart.setOption(this.chartOption);

        }
      },
      init() {
         if (typeof (this.chartOption) == 'string') {
          this.$nextTick(() => {
            this.dragChart();
          });

        }else{

           this.$nextTick(() => {

             this.dragNewChart();


           })

          
        }

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
