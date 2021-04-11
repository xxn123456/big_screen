<template>
  <div class="chart-wrap">
    <div class="my-chart" />
  </div>
</template>
<script>
export default {
  name: 'RadialChart',
  data() {
    return {
      titleData: [],
      typeStander: [],
      typeData: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.chartInit()
    },
    chartInit() {
      const myChart = this.$echarts.init(document.getElementById('radialChart'))
      const ChartOptions = {
        title: {
          text: '周销售趋势',
          textStyle: {
            align: 'center',
            color: '#fff',
            fontSize: 12
          },
          top: '5%',
          left: 'center'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value',
          name: '元',
          nameTextStyle: {
            color: '#000'
          }
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          lineStyle: {
            color: '#37a2da',
            width: '1'

          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: '#666'
            }
          },
          itemStyle: {
            color: '#6c50f3',
            borderColor: '#37a2da',
            borderWidth: 1
          }
        }]

      }
      myChart.setOption(ChartOptions)
    }
  }
}

</script>
<style lang="scss" scoped>
  .chart-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .change-catetory{
      width: 100px;
      float:right;
      height: 30px;
      line-height: 30px;
      background-color: #37a2da;
    }
    .my-chart{
      width: 100%;
      height: calc(100% - 30px);
    }

  }

</style>
