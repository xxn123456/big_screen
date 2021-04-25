{
  backgroundColor: '',
  title: {
    text: '武汉市2020上半年消费水平',
    textStyle: {
      align: 'center',
      color: '#fff',
      fontSize: 16
    },
    left: 'center'
  },
  legend: {
    bottom: 0,
    data: ['消费水平'],
    textStyle: {
      color: '#fff'
    }
  },
  xAxis: {
    type: 'category',
    axisLine: {
      show: true,
      lineStyle: {
        color: '#fff'
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#616582'
      }
    },
    data: ['一月', '二月', '三月', '四月', '五月', '六月']
  },
  yAxis: {
    type: 'value',
    name: '/元',
    axisLine: {
      show: false,
      lineStyle: {
        color: '#fff'
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#616582'
      }
    },
    splitLine: {
      show: false
    }

  },
  series: [{
    name: '消费水平',
    type: 'line',
    showAllSymbol: true,
    symbol: 'circle',
    symbolSize: 8,
    lineStyle: {
      normal: {
        color: '#6c50f3',
        shadowBlur: 0
      }
    },
    label: {
      show: true,
      position: 'top',
      textStyle: {
        color: '#6c50f3'
      }
    },
    itemStyle: {
      color: '#6c50f3',
      borderColor: '#fff',
      borderWidth: 3,
      shadowColor: 'rgba(0, 0, 0, .3)',
      shadowBlur: 0,
      shadowOffsetY: 2,
      shadowOffsetX: 2
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
    data: [820, 932, 901, 934, 1290, 1330]
  }]

}
