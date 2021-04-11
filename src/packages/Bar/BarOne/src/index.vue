<template>
  <div class="chart-wrap" ref="Bar">

  </div>
</template>

<script>
  // 基础折线图
  export default {
    name: "BarOne",
    props: ['chartOption', 'chartData','isOnResize'],
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
        let myChart = this.$echarts.init(this.$refs.Bar);
        myChart.resize();
        let options = {
          backgroundColor: '',
          title: {

            text: '武汉市对卫生部门财政投入',
            textStyle: {

              align: 'center',

              color: '#fff',

              fontSize: 16,
            },
            left: 'center',
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
            top: '10%',
            right: '5%',
            left: '5%',
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
            name: "投入",
            type: 'bar',
            data: [40, 51, 58, 63, 74, 82],
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
                shadowBlur: 4,
                barBorderRadius: [3, 2, 0, 0]
              }
            },
            label: {
              normal: {
                show: true,
                position: 'top',
                color: "#fff"
              },

            }
          }]

        };
        // console.log(JSON.stringify(options));
        myChart.setOption(options)
      },
      dragNewChart() {
        let myChart = this.$echarts.init(this.$refs.Bar);
          myChart.resize();

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
      chartData() {
        // console.log("数据发送变化");
        this.option = this.chartOption;
        this.target = this.chartData;

        this.dragNewChart();

      },
      isOnResize() {
        
      
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
