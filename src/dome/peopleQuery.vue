<template>
  <!-- 接入机构 -->
  <div class="chart-wrap">
    <div class="chart-title">
      <span class="line"></span><span>重复提醒</span>
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
        accesss: [{
          'name': '重复检查提醒',
          'value': 5600
        }, {
          'name': '重复用药提醒',
          'value': 3600
        }, {
          'name': '重复检验提醒',
          'value': 1500
        }]
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
          legend: {
            data: [{
              name: '重复检查提醒',
              icon: 'rect'
            }, {
              name: '重复用药提醒',
              icon: 'rect'
            }, {
              name: '重复检验提醒',
              icon: 'rect'
            }],
            bottom: 0,
            itemWidth: 5,
            itemHeight: 5,
            textStyle: {
              color: '#fff',
              fontSize: "10"
            }
          },
          label: {
            fontSize: '50%',
            show: true
          },
          labelLine: {
            normal: {
              length: "3px",
              length2: "4px",
              lineStyle: {
                width: 1
              }
            }
          },
          series: [{
            name: '重复提醒',
            type: 'pie',
            radius: '55%',
            data: this.accesss
          }]
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
