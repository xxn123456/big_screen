<template>
  <div class="chart-wrap" ref="Pie">

  </div>
</template>

<script>
  // 基础折线图
  export default {
    name: "GaugeOne",
    props: ['chartOption', 'chartData'],
    data() {
      return {
        option: {

        },
        target: {

        }
      }
    },
    methods: {
      dragChart() {
        let myChart = this.$echarts.init(this.$refs.Pie);
        let options = {
          backgroundColor: '',
           title: {
            subtext:"单位/人",
            left: '0',
            textStyle: {
              color: '#fff',
                left: '0',
            }
          },
          series: [
            {
              type: 'gauge',
              name:"武汉市新生儿",
              radius: '80%',
              center: ['50%', '50%'],
              splitNumber: 10, //刻度数量
               min:0,//最小值
                max:100,//最大值
            
              axisLine: {
                show: true,
                lineStyle: {
                  width: 25,
                  color: [
                    [
                      0.9, new this.$echarts.graphic.LinearGradient(
                        0, 0, 1, 0, [{
                            offset: 0,
                            color: '#A52EFA'
                          },
                          {
                            offset: 1,
                            color: '#07DDFD'
                          }
                        ]
                      )
                    ],
                    [
                      1, 'rgba(23,57,145,0.1)'
                    ]
                  ]
                }
              },
              //分隔线样式。
              splitLine: {
                show: false,
              },
              axisLabel: {
                show: false
              },
              axisTick: {
                show: false
              },
              pointer: {
                show: false
              },
              title: {
                show: true,
                offsetCenter: [0, '-20%'], // x, y，单位px
                textStyle: {
                  color: '#fff',
                  fontSize: 16
                }
              },
              //仪表盘详情，用于显示数据。
              detail: {
                show: true,
                offsetCenter: [0, '16%'],
                color: '#fff', 
                textStyle: {
                  fontSize: 12
                }
              },
              data: [
                  {
                name: "武汉市新生儿",
                value: 99
              }
              ]
            }
          ]

        }

        myChart.setOption(options)
      },
      init() {
        this.option = this.chartOption;

        this.target = this.chartData;
      },
    },
    watch: {
      option() {
        let myChart = this.$echarts.init(this.$refs.Pie);

        console.log(this.target);

        // 修改标题
        this.option.title.text = this.target.title;
        // 修改单位

        this.option.title.subtext = this.target.chartData[0].unit;


        let new_target = this.target.chartData[0].data;

        console.log(new_target);

        let x = [];

        new_target.forEach((item, index) => {
          x.push(item.name);
        });

        this.option.legend.data = x;

        this.option.series[0].data = new_target;





        let options = this.option;


        myChart.setOption(options)
      }
    },

    mounted() {
      this.dragChart();
      this.init();

    }
  }

</script>

<style lang="scss" scoped>
  .chart-wrap {
    width: 100%;
    height: 100%;
  }

</style>
