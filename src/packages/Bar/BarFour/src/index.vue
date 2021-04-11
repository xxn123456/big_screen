<template>
  <div class="chart-wrap" ref="Bar">

  </div>
</template>

<script>
  // 双折线图
  export default {
    name: "BarFour",
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
        let myChart = this.$echarts.init(this.$refs.Bar)
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
            type:"value",
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
        // console.log(JSON.stringify(options));
        myChart.setOption(options)
      },
      init() {

        this.option = this.chartOption;

        this.target = this.chartData;



      },
    },
    watch: {
      option() {
        let myChart = this.$echarts.init(this.$refs.Bar);

        let new_target = this.target.chartData[0].data;

        let x = [];
        let y = [];

        new_target.forEach((item, index) => {
          x.push(item.name);
          y.push(item.value);
        });

        // 修改标题
        this.option.title.text = this.target.title;

        // 修改指标值
        this.option.legend.data = this.target.chartData[0].target;

        this.option.series[0].name = this.target.chartData[0].target;

        // 修改单位
        console.log(new_target);
        this.option.yAxis.name = this.target.chartData[0].unit;


        this.option.xAxis.data = x;
        this.option.series[0].data = y;
        let options = this.option;

        console.log("新option");


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
