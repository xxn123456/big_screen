<template>
  <div ref="Line" class="chart-wrap"></div>
</template>

<script>
  // 基础折线图
  export default {
    name: 'PieOne',
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
          // 标题预留
          title: {
            text: '专业技术人员变动图',
            subtext: '单位%',
            left: '0',
            textStyle: {
              color: '#fff',
              left: '0'
            }
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            bottom: 0,
            data: ['执行医师', '注册护士', '药剂人员', '检验专员', '其他卫技人员'],
            textStyle: {
              color: '#fff'
            }
          },
          series: [{
            name: '种类',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [{
                value: 210,
                name: '执行医师'
              },
              {
                value: 235,
                name: '注册护士'
              },
              {
                value: 274,
                name: '药剂人员'
              },
              {
                value: 310,
                name: '检验专员'
              },
              {
                value: 435,
                name: '其他卫技人员'
              }
            ],
            label: {
              normal: {
                formatter: params => {
                  return (
                    '{name|' + params.name + ':' + '}{value|' +
                    params.value + '}'
                  )
                },
                rich: {
                  name: {
                    fontSize: 12,
                    color: '#fff'
                  },
                  value: {
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: '#fff'
                  }
                }

              }
            },
            labelLine: {
              lineStyle: {
                color: '#888'
              }
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = ['rgba(50,123,250,1)', 'rgba(50,123,250,0.85)', 'rgba(50,123,250,0.7)',
                    'rgba(50,123,250,0.6)', 'rgba(50,123,250,0.4)', 'rgba(50,123,250,0.25)',
                    'rgba(50,123,250,0.1)'
                  ]
                  return colorList[params.dataIndex % colorList.length]
                }
              }
            }

          }]

        }


        myChart.setOption(options)
      },
      dragNewChart() {
        const myChart = this.$echarts.init(this.$refs.Line)
        myChart.resize();
          let new_option = JSON.parse(this.chartOption);

      
        myChart.setOption(new_option);
      },
      init() {
        this.$nextTick(() => {
          this.dragChart();
        });

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
