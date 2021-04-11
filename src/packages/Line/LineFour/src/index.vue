<template>
  <div class="chart-wrap" ref="Line">

  </div>
</template>

<script>
  // 三折线图
  export default {
    name: "LineFour",
    props: ['chartOption', 'chartData','isOnResize'],
    data() {
      return {
        option: {},
        target: {

        }
      }

    },
    methods: {
      dragChart() {
        let myChart = this.$echarts.init(this.$refs.Line);
         myChart.resize();
        let options = {
          backgroundColor: '',
          title: {
            text: '武汉市血液采集',
            textStyle: {
              align: 'center',
              color: '#fff',
              fontSize: 16,
            },
            left: 'center',
          },
          legend: {
            bottom: 0,
            data: ['血细胞', '白细胞', '血小板'],
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
                color: "#fff"
              }
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: "#616582"
              }
            },
            data: ['一月', '二月', '三月', '四月', '五月', '六月']
          },
          yAxis: {
            type: 'value',
            name: "/L",
            axisLine: {
              show: false,
              lineStyle: {
                color: "#fff"
              }
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: "#616582"
              }
            },
            splitLine: {
              show: false
            }

          },
          series: [{
              name: "白细胞",
              type: 'line',
              showAllSymbol: true,
              symbol: 'circle',
              symbolSize: 6,
              lineStyle: {
                normal: {
                  color: "#6c50f3",
                  shadowBlur: 0
                },
              },
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#6c50f3',
                }
              },
              itemStyle: {
                color: "#6c50f3",
                borderColor: "#fff",
                borderWidth: 1,
                shadowColor: 'rgba(0, 0, 0, .3)',
                shadowBlur: 0,
                shadowOffsetY: 2,
                shadowOffsetX: 2,
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
            },
            {
              name: "血细胞",
              type: 'line',
              showAllSymbol: true,
              symbol: 'circle',
              symbolSize: 6,
              lineStyle: {
                normal: {
                  color: "#8bd46e",
                  shadowBlur: 0
                },
              },
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#8bd46e',
                }
              },
              itemStyle: {
                color: "#8bd46e",
                borderColor: "#fff",
                borderWidth: 1,
                shadowColor: 'rgba(0, 0, 0, .3)',
                shadowBlur: 0,
                shadowOffsetY: 2,
                shadowOffsetX: 2,
              },
              tooltip: {
                show: false
              },
              areaStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(139,212,110,0.6)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(139,212,110,0)'
                    }
                  ], false),
                  shadowColor: 'rgba(139,212,110,0.9)',
                  shadowBlur: 10
                }
              },
              data: [4820, 932, 901, 934, 1290, 1330]
            },

            {
              name: "血小板",
              type: 'line',
              showAllSymbol: true,
              symbol: 'circle',
              symbolSize: 6,
              lineStyle: {
                normal: {
                  color: "#f5804d",
                  shadowBlur: 0
                },
              },
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#f5804d',
                }
              },
              itemStyle: {
                color: "#f5804d",
                borderColor: "#fff",
                borderWidth: 1,
                shadowColor: 'rgba(0, 0, 0, .3)',
                shadowBlur: 0,
                shadowOffsetY: 2,
                shadowOffsetX: 2,
              },
              tooltip: {
                show: false
              },
              areaStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(245,128,77,0.3)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(245,128,77,0)'
                    }
                  ], false),
                  shadowColor: 'rgba(108,80,243, 0.9)',
                  shadowBlur: 20
                }
              },
              data: [1820, 1932, 2901, 1934, 3290, 2330]
            }
          ]

        }

        console.log(JSON.stringify(options));

        myChart.setOption(options)
      },
      dragNewChart(){
         let myChart = this.$echarts.init(this.$refs.Line);
          myChart.resize();

        // 第一道折线绘制
        let new_target = this.target.chartData[0].data;

        let x = [];
        let y = [];

        new_target.forEach((item, index) => {
          x.push(item.name);
          y.push(item.value);
        });

        // 修改标题
        this.option.title.text = this.target.title;



        this.option.series[0].name = this.target.chartData[0].target;

        // 修改单位
        console.log(new_target);
        this.option.yAxis.name = this.target.chartData[0].unit;


        this.option.xAxis.data = x;
        this.option.series[0].data = y;

        // 第二道折线绘制

        let new_target2 = this.target.chartData[1].data;
        let y2 = [];

        new_target2.forEach((item, index) => {
          y2.push(item.value);
        });

        this.option.series[1].name = this.target.chartData[1].target;

        this.option.series[1].data = y2;


        // 赋予指标名称

        // 修改指标值
        let new_legend = [];


        new_legend.push(this.target.chartData[0].target);
        new_legend.push(this.target.chartData[1].target);

        this.option.legend.data = new_legend;

        let options = this.option;
        console.log("新option");
        myChart.setOption(options)

      },
      init() {
           this.dragChart();
        // 图表发生变化无论是option 还是data 都会引起
         this.option = this.chartOption;
         
         this.target = this.chartData;
      },
    },
    watch: {
      option() {
        this.dragNewChart();
      },
      chartData(){
        // console.log("数据发送变化");
         this.option = this.chartOption;
         this.target = this.chartData;
        
         this.dragNewChart();

      },
      isOnResize() {
        // console.log("重绘图表");
        let myChart = this.$echarts.init(this.$refs.Line)
        myChart.resize();
        this.dragNewChart();
      }
    },

    mounted() {
     
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
