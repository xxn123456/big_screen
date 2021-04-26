<template>
  <div class="chart-wrap" ref="Bar">

  </div>
</template>

<script>
  // 排行折线图
  export default {
    name: "BarTwo",
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

        
        // console.log(JSON.stringify(options));
        myChart.setOption(options)
      },
      dragNewChart(){
         let myChart = this.$echarts.init(this.$refs.Bar);
          myChart.resize();

        let new_target= this.target.chartData[0].data;

        let x=[];
        let y=[];

        new_target.forEach((item,index) => {
           x.push(item.name);
           y.push(item.value);
        });

          // 修改标题
        this.option.title.text=this.target.title;

        // 修改指标值
        this.option.legend.data = this.target.chartData[0].target;

        this.option.series[0].name= this.target.chartData[0].target;

        // 修改单位
         console.log(new_target);
        this.option.yAxis.name = this.target.chartData[0].unit;


        this.option.xAxis.data=x;
        this.option.series[0].data=y;
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
