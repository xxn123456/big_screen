<template>
  <!-- 接入机构 -->
  <div class="chart-wrap">
    <div class="chart-title">
      <span class="line"></span><span>健康档案</span>
    </div>

    <div ref="accessAgency" class="hsh-chart">

    </div>

  </div>


</template>
<script>
  import 'echarts/theme/macarons.js'
  export default {
    props: ['isOnResize'],
    data() {
      return {
        accesss: []
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.setAccessAgency();
      })
    },
    watch: {
      // 监测div 发生改变再进行重绘
      isOnResize() {
        let myChart = this.$echarts.init(this.$refs.accessAgency, 'macarons');
        myChart.resize();
      }
    },
    methods: {
      setAccessAgency() {
        let pcChart = {
         
          xAxis: {
            type: 'category',
            
            axisTick: {
              show: false
            },
            axisLabel: {
              color:"#fff"
            },
            data: ["2019/1","2019/2","2019/3","2019/4","2019/5"]
          },
          yAxis: {
            type: 'value',
            name: '单位/份',
            nameTextStyle: {
              fontSize: "75%",
              color:"#fff"
            },
             axisTick: {
              show: false
            },
            axisLabel: {
              color:"#fff"
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#616582"
              }
            },
            splitLine: {
                show: false,
            },
            // axisTick: {
            //   show: false
            // },
            // axisLabel: {
            //   fontSize: "75%",
            //    formatter: function (value) {
            //     if (value >= 10000) {
            //       value = value / 10000 + "万";
            //     }
            //     return value;
            //   }
            // }
          },
          series: [{
            name: '柱状图',
            type: 'bar',
            // barWidth: 10,
            // itemStyle: {
            //   normal: {
            //     color: new this.$echarts.graphic.LinearGradient(
            //       0, 0, 0, 1,
            //       [{
            //           offset: 0,
            //           color: '#db054f'
            //         },
            //         {
            //           offset: 0.5,
            //           color: '#ee6926'
            //         },
            //         {
            //           offset: 1,
            //           color: '#ffb408'
            //         }
            //       ]
            //     ),
            //     label: {
            //       show: true,
            //       position: 'top',
            //       textStyle: {
            //         color: '#ccc',
            //         fontSize: "75%"
            //       }
            //     }
            //   }
            // },
            data: [10,11,12,5,90]
          }
          ]
        }

        let myChart = this.$echarts.init(this.$refs.accessAgency, 'macarons');
        myChart.setOption(
          pcChart
        );
        window.addEventListener('resize', () => {
          myChart.resize();
         
        })

      },

    }
  }

</script>
<style lang="scss" scoped>
  .chart-wrap {
    width: 100%;
    height: 100%;
    font-size: 16px;
    display: flex;
    flex-direction: column;

    .chart-title {
      width: 100%;
      height: 20px;
      line-height: 20px;
      display: flex;
      flex-direction: row;
      padding-left: 10px;

      .line {
        display: inline-block;
        width: 2px;
        height: 16px;
        background-color: #2550dd;
        position: relative;
        top: 2px;
        margin-right: 8px;
      }


    }

    .hsh-chart {
      width: 100%;
      height: calc(100% - 20px);

    }
  }

</style>
