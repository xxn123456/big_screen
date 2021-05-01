<template>
  <div ref="Line" class="chart-wrap"></div>
</template>

<script>
  // 基础折线图
  export default {
    name: 'BarTwo',
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
            text: '武汉市对卫生部门财政投入',
            left: 'center',

            textStyle: {
              color: '#fff',
              left: '0',
              fontSize: 16,
            }
          },
          legend: {
            bottom: 0,
            data: ['投入'],
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
            top: '18%',
            right: '10%',
            left: '10%',
            bottom: '15%'
          },
          xAxis: [{
            show: false,
            type: 'value',

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
            }
          }],
          yAxis: [{
            name: "/万元",
            nameTextStyle: {
              color: '#fff',
            },
            type: 'category',
            axisLabel: {
              formatter: '{value}',
              color: '#e2e9ff',
            },
            axisTick: {
              show: false,
              lineStyle: {
                color: "#616582"
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#616582"
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#233e64'
              }
            },
            data: ['2015年', '2016年', '2017年', '2018年', '2019年', '2020年'],
          }],
          series: [{
            name: "投入",
            type: 'bar',
            data: [40, 51, 58, 63, 74, 82],
            barWidth: '18',

            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                  offset: 0,
                  color: 'rgba(61,126,235,1)'
                }, {
                  offset: 1,
                  color: 'rgba(61,126,235,0)'
                }], false),
                barBorderRadius: 2
              }
            },


            label: {
              normal: {
                show: true,
                position: 'right',
                color: "#fff"
              },

            }
          }]

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
