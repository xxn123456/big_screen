<template>
  <div class="detail">
    <div class="detail-top">

      <div class="apply-des">
        <div class="apply-name">
          应用名称:{{ packMsg.compentName }}
        </div>

        <div class="apply-type">
          <!-- <div>
            <span class="title">组件名称:</span><span>基础折线图</span>
          </div>
          <div>
            <span class="title">组件类型:</span><span>折线图</span>
          </div>
          <div>
            <span class="title">指标名称:</span><span>重复提醒</span>
          </div>
          <div>
            <span class="title">维度:</span><span>按月分析</span>
          </div> -->
        </div>

        <div class="apply-test">
          <span class="title">应用标签:</span><span>
            <el-tag type="info">组件名称{{ packMsg.compentPath }}</el-tag>
            <el-tag type="info">组件别名{{ packMsg.compentAlias }}</el-tag>
            <el-tag type="info">创建时间{{ packMsg.createTime }}</el-tag>

          </span>
        </div>
      </div>
    </div>
    <div class="detail-cont">
      <div class="apply-tab">
        <div
          v-for="(tab,index) in tabs"
          :key="tab.index"
          :class="testShow==index?'tab-underline':'tab'"
          @click="changeTab(index)"
        >
          {{ tab.name }}
        </div>

      </div>
      <div class="apply-cont">
        <div v-show="testShow==0" class="cont">
          <div class="test-chart">
            <component :is="myCompent.compentPath" :chart-option="myCompent.options" :chart-data="myCompent.chartData" />
          </div>
          <div class="test-data" />
        </div>
        <div v-show="testShow==1" class="cont" />
      </div>
    </div>
  </div>
</template>
<script>
import {
  applyProdChart,
  queryApplyChart
} from '@/api/compose.js'
import JsonEditor from '@/components/JsonEditor/index.vue'
export default {
  components: {
    JsonEditor
  },
  data() {
    return {
      packMsg: {
        compentName: '',
        compentPath: '',
        compentAlias: '',
        createTime: ''
      },
      myCompent: {
        compentPath: '',
        options: {},
        chartData: {}
      },
      tabs: [{
        name: '应用'
      },
      {
        name: '相关文档'
      }
      ],
      testShow: 0,
      // 测试应用模块
      formLabelWidth: '100px',
      packId: null,
      chartContent: ''
    }
  },
  mounted() {
    this.packId = this.$route.query.applyId
    this.queryApplyChart()
  },
  methods: {
    changeTab(i) {
      this.testShow = i
    },
    queryApplyChart() {
      return new Promise((resolve, reject) => {
        const msg = JSON.stringify({
          'id': this.packId
        })
        queryApplyChart(msg).then((res) => {
          const { respData } = res

          this.myCompent.compentPath = respData.ov.compent.compentPath
          // 赋予配置项

          const options = JSON.parse(respData.packOption)

          this.myCompent.options = options

          // 赋予指标数据

          const target = JSON.parse(respData.data)

          this.myCompent.chartData = target

          this.packMsg = respData.ov.compent

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

</script>
<style scoped>
    .el-tag + .el-tag {
    margin-left: 15px;
  }
</style>
<style lang="scss" scoped>
  .detail {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    .detail-top {
      width: 100%;

      margin-bottom: 50px;
      display: flex;
      flex-direction: row;
      background-color: #fff;
      padding: 30px 15px;

      .apply-pic {
        width: 400px;
        height: 250px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .apply-des {
        width: calc(100% - 450px);
        margin-left: 50px;
        height: 100px;
        .apply-name {
          height: 20%;
          font-size: 22px;
          color: #353D41;
        }

        .apply-type {

          height: 50%;
          color: #353D41;
          font-size: 14px;

          .title {
            color: #1890ff;
            font-size: 16px;
            margin-right: 15px;
          }
        }

        .apply-test {
          height: 30%;
          font-size: 14px;
          color: #353D41;

          .title {
            color: #1890ff;
            font-size: 16px;
            margin-right: 15px;
          }
        }

      }
    }

    .detail-cont {
      width: 100%;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      padding-top: 30px;

      .apply-tab {
        margin-left: 50px;
        margin-right: 50px;
        display: flex;
        flex-direction: row;

        .tab {
          width: 110px;
          text-align: center;
          height: 40px;
          line-height: 40px;

        }

        .tab-underline {
          width: 110px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          border-bottom: 2px solid #1890ff;
        }
      }

      .apply-cont {
        margin-left: 50px;
        margin-right: 50px;
        margin-top: 15px;

        .cont {
          width: 100%;
          display: flex;
          flex-direction: column;
          margin-top: 30px;

          .test-show {
            width: 60%;
          }

          .test-chart {
            width: 80%;
            height: 420px;
            margin: 0 auto;
            background-color: #090e4e;
            padding: 30px 15px;
          }

          .test-data {
            width: 100%;
            text-align: center;
            display: flex;
            flex-direction: row;
            padding-top: 30px;

            .test-form {
              width: 50%;
              height: 400px;
            }

            .test-btns {
              width: calc(50% - 30px);

              height: 100px;
              margin: 0 auto;
              padding-left: 30px;

            }
          }
        }
      }
    }
  }

</style>
