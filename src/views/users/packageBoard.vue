<template>
  <div class="edit-warp">
    <div class="top">
      <div class="screen-title">
        <span>布局管理</span><span class="line">/</span><span>远程诊断大屏</span><span class="line"><i
          class="el-icon-document"
        /></span>
      </div>
      <div class="compnets-change">
        <span class="compent-tab"><i class="el-icon-pie-chart" /><span class="title">图表组件</span></span>
        <span class="compent-tab"><i class="el-icon-monitor" /><span class="title">界面组件</span></span>
        <span class="compent-tab"><i class="el-icon-monitor" /><span class="title">应用模板</span></span>
      </div>
      <div class="layout-handle">
        <span @click="saveLayout"><i class="el-icon-document-checked" />保存</span>

        <span class="line" />
        <span>返回</span>
      </div>
    </div>
    <div class="main">
      <div class="handle-alls">
        <!-- 各个包位置 -->
        <div class="title">
          插入组件
        </div>
        <div class="packages">
          <!-- 图表组件类型 -->
          <div class="chart-compent-type">
            <div v-for="(item,index) in myCompent" :key="item.index" class="cont">
              <div class="type-title" @click="showCompent(item,index)">
                <span>{{ item.compentTypeName }}</span>
                <span style="text-align:right;"><i class="el-icon-arrow-right" /></span>
              </div>
              <div v-show="compentTab==index" class="compent">

                <div v-for="s in item.ov.children" :key="s.index" class="compent-block">
                  <img :src="s.compentUrl|imgfitter" alt="">
                  <div class="enter"><span @click="addChartTarget(s)">插入</span></div>
                </div>

              </div>
            </div>
          </div>
          <!-- 界面组件类型 -->
          <div class="page-compent-type" />
          <!-- 模板数据类型 -->
          <div class="layout-compent-type" />
        </div>
      </div>
      <div class="set-layout">
        <div class="title">
          <span class="line"><i class="el-icon-edit" /></span>
          <span style="margin-left: 4px;margin-right: 4px;">当前操作大屏:</span>

          <el-dropdown>
            <span class="el-dropdown-link">
              远程诊断<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>电子健康卡</el-dropdown-item>
              <el-dropdown-item>家庭医生</el-dropdown-item>
              <el-dropdown-item disabled>第三方大屏</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <div class="size">
            <div class="left">
              <span>宽度:</span>
              <input v-model="screen.w" type="text" style="width:50px;outline:none;">

            </div>
            <div class="right">
              <span>高度:</span>
              <input v-model="screen.h" type="text" style="width:50px;outline:none;">

            </div>
          </div>

        </div>

        <div class="layout-main">
          <vue-ruler-tool :content-layout="{left:50,top:50}" :is-scale-revise="true">

            <div class="pc-mb">
              <tem-one :layout-data="layout" @reciveIndex="setTargetAndCss" />
              <!-- <component :is="pcMb" :layoutData="layout"/> -->
            </div>
          </vue-ruler-tool>

        </div>

        <div class="scall-layout">
          <div class="scale-box">

            <span>50%</span>

            <div class="my-slider">
              <el-slider v-model="scaleNum" />

            </div>

            <span>+</span>
            <span style="position: relative;top: -2px;" @click="cutScale">-</span>

          </div>

        </div>
      </div>
      <!-- 各个操作项目 -->
      <div class="pack-change">
        <div class="title">
          <div class="left">
            数据调整
          </div>
          <div class="right">
            样式调整
          </div>
        </div>
        <div class="cont">
          <!-- 其他数据项操作 -->

          <div class="screen-title-ms">
            大屏标题
          </div>
          <div class="screen-title-input">
            <input v-model="screenPage.title" type="text">
            <span @click="saveScreenTitle">保存</span>
          </div>

          <!-- 图表配置 -->
          <div class="targets-title">
            数据指标
          </div>

          <div class="target-tags">
            <el-tag closable>健康武汉微信注册数</el-tag>
          </div>
          <div class="targets-check">
            <el-checkbox-group v-model="targets.check">
              <el-checkbox v-for="item in targets.options" :key="item.index" :label="item.id">{{ item.name }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <!-- 指标标题 -->
          <div class="screen-title-input">
            <span>图表名称</span><input v-model="chart.name" type="text">

          </div>

          <div class="target-handle">
            <span @click="saveChartTarget">保存</span>
          </div>

          <!-- 调试数据 -->
          <!-- <div style="color:#FFF;">

            {{nowChart.target}}
          </div> -->

        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 导入图片失败地址
import TemOne from '@/views/users/createLayout.vue'
import imgUrl from '@/utils/setDeafult.js'
import VueRulerTool from '@/components/VueRuler/components/vue-ruler-tool.vue'
import {
  queryAllCompentType,
  queryCompentByType
} from '@/api/compent.js'
import {
  queryTargetByUser,
  queryChartOptionByTarget
} from '@/api/target.js'
import {
  getLayout,
  saveLayout
} from '@/api/layout.js'
import querystring from 'querystring'
export default {
  components: {
    TemOne,
    VueRulerTool
  },
  filters: {
    imgfitter: function(value) {
      // console.log(value);
      if (value != undefined) {
        const new_value = imgUrl + value
        return new_value
      } else {
        return '#'
      }
    }
  },
  data() {
    return {
      userId: '',
      // 模板项目
      pcMb: 'tem-one',
      // 指标面板
      targets: {
        check: [],
        options: []
      },
      // 标题面板
      screenPage: {
        title: ''
      },
      chart: {
        name: ''

      },

      myCompent: [],
      compentTab: 0,
      layout: [],
      packs: {
        compent: {
          compnetAlsx: 'line-one',
          compentId: '1',
          url: '../../charttypes/line-one.png',
          option: {}
        },
        target: {
          check: [],
          data: {
            title: '应用标题',
            chartData: []
          }
        },
        page: {
          title: '测试标题'
        },
        place: {
          x: 300,
          y: 0,
          w: 300,
          h: 300
        }
      },
      // 布局中组件存在位置
      packIndex: null,
      scaleNum: 0,
      // 刻度线
      screen: {
        w: 1920,
        h: 1080
      },

      nowChart: {

      }
    }
  },
  mounted() {
    this.userId = this.$route.query.userId
    // 获取大屏详情
    this.getLayout()
    // 获取组件类型
    this.queryAllCompentType()
    // 获取所有用户
    this.queryTargetByUser()
  },
  methods: {
    getLayout() {
      return new Promise((resolve, reject) => {
        const msg = querystring.stringify({
          id: this.$route.query.screenId
        })
        getLayout(msg).then((res) => {
          const {
            respData
          } = res
          this.layout = JSON.parse(respData.layout)

          console.log(res)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    addChartTarget(x) {
      const new_pack = {
        compent: {
          compnetAlsx: x.compentPath,
          compentId: x.id,
          url: x.compentUrl,
          option: JSON.parse(x.compentOption)
        },
        target: {
          check: [],
          data: {
            title: '应用标题',
            chartData: []
          }
        },
        page: {
          title: ''
        },
        place: {
          x: 300,
          y: 0,
          w: 300,
          h: 300
        }
      }
      this.layout.push(new_pack)
    },
    // 相应拖拽布局点击组件索引

    setTargetAndCss(x) {
      console.log(x)
      this.packIndex = x

      this.targets.check = this.layout[x].target.check

      if (this.layout[x].page.title != null) {
        this.screenPage.title = this.layout[x].page.title
      }

      // 调试用法
      // this.nowChart = this.layout[x];
    },
    // 填写指标数据到布局
    saveScreenTitle() {
      console.log('进行保存')
      const new_index = this.packIndex
      const new_title = this.screenPage.title
      this.layout[new_index].page.title = new_title

      console.log(this.layout[this.packIndex].page.title)
    },
    // 保存指标数据到图表进行更新

    saveChartTarget() {
      const msg = JSON.stringify({
        'check': this.targets.check
      })
      const new_title = this.chart.name
      return new Promise((resolve, reject) => {
        queryChartOptionByTarget(msg).then((res) => {
          const {
            respData
          } = res
          // 记住指标位置
          this.layout[this.packIndex].target.check = this.targets.check

          // 记住图表数据
          this.layout[this.packIndex].target.data = {
            title: new_title,
            chartData: respData.chartData
          }

          console.log(res)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    saveLayout() {
      const new_layout = JSON.stringify(this.layout)
      const msg = JSON.stringify({
        'id': this.$route.query.screenId,
        'layout': new_layout
      })

      return new Promise((resolve, reject) => {
        saveLayout(msg).then((res) => {
          const { respCode } = res
          if (respCode == '10000') {
            this.$message('保存布局成功')
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    cutScale() {
      this.scaleNum += 10
    },
    // 查询所有组件类型
    queryAllCompentType() {
      return new Promise((resolve, reject) => {
        queryAllCompentType().then((res) => {
          const {
            respData
          } = res
          this.myCompent = respData

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    showCompent(mycompent, index) {
      this.compentTab = index
    },
    queryTargetByUser() {
      const user = localStorage.getItem('id')
      const msg = querystring.stringify({
        userId: user
      })
      return new Promise((resolve, reject) => {
        queryTargetByUser(msg).then((res) => {
          const {
            respData
          } = res
          const new_option = []
          respData.forEach((ele, index) => {
            new_option.push({
              id: ele.id,
              name: ele.indicatorName
            })
          })
          this.targets.options = new_option
          console.log(res)
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
  .el-checkbox {
    color: #fff;
    font-size: 12px;
    margin-top: 8px;
  }

</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  .edit-warp {
    width: 100%;

    .edit-nav {
      height: 40px;
      line-height: 40px;
      width: 100%;
      padding-left: 20px;
      padding-right: 20px;
      background-color: #398dee;
      color: #fff;
      font-size: 12px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    .top {
      width: 100%;
      height: 40px;
      line-height: 40px;
      position: fixed;
      z-index: 10;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      background-color: #2b2b2b;
      color: #969696;

      .screen-title {
        width: 332px;
        height: 100%;
        font-size: 12px;
        padding-left: 24px;

        .line {
          margin-left: 8px;
          margin-right: 8px;
        }
      }

      .compnets-change {
        width: calc(100% - 572px);
        height: 100%;
        font-size: 12px;

        .compent-tab {
          margin-left: 8px;
          margin-right: 8px;

          .title {
            margin-left: 4px;
            margin-right: 4px;
          }
        }
      }

      .layout-handle {
        width: 240px;
        height: 100%;
        color: #fff;
        text-align: right;
        font-size: 12px;
        padding-right: 15px;
        cursor: pointer;

        .line {
          margin-left: 4px;
          margin-right: 4px;
        }

      }

    }

    .main {
      height: calc(100% - 40px);
      width: 100%;
      background-color: #f7f7f7;
      display: flex;
      flex-direction: row;
      overflow: hidden;
      top: 40px;

      .set-layout {
        width: calc(100% - 510px);
        height: 100vh;
        display: flex;
        flex-direction: column;
        background-color: #424242;
        overflow: hidden;
        position: relative;

        .title {
          width: 100%;
          height: 40px;
          background-color: #313131;
          margin-top: 40px;
          line-height: 40px;
          text-align: center;
          color: #969696;
          font-size: 14px;
          display: flex;
          flex-direction: row;
          justify-content: center;

          .line {
            margin-left: 4px;
            margin-right: 4px;
          }

          .size {
            width: 240px;
            display: flex;
            flex-direction: row;

            .left {
              width: 50%;
              margin-right: 4px;
            }

            .right {
              width: 50%;
              margin-right: 4px;
            }
          }
        }

        .layout-main {

          width: 3840px;
          height: 2160px;
          position: absolute;
          top: 80px;
          left: 0px;
          transform-origin: 0px 0px;
          transform: scale(0.6, 0.6);

          .pc-mb {

            color: #fff;
            width: 1920px;
            height: 1080px;
            margin: 0 auto;
            position: relative;
            z-index: 10;
          }
        }

        .scall-layout {
          position: absolute;
          right: 0px;
          bottom: 0px;

          width: 100%;
          height: 30px;
          line-height: 30px;
          text-align: right;
          z-index: 20;

          .scale-box {
            width: 400px;
            height: 30px;
            margin-right: 15px;
            display: flex;
            flex-direction: row;
            float: right;

            .my-slider {
              width: 200px;
              height: 30px;
              margin-left: 30px;
              margin-right: 30px;
              position: relative;
              top: -5px;
            }

            span {
              display: inline-block;
              width: 30px;
              height: 30px;
              line-height: 30px;
              cursor: pointer;
              color: #fff;
              margin-left: 5px;
              margin-right: 5px;
              text-align: center;
            }
          }

        }
      }

      .handle-alls {
        width: 280px;
        height: 100vh;
        display: flex;
        flex-direction: column;
        background-color: #383838;

        .title {
          width: 100%;
          height: 44px;
          background-color: #262626;
          margin-top: 40px;
          line-height: 40px;
          text-align: center;
          color: #969696;
          font-size: 12px;
        }

        .packages {
          width: 100%;
          height: 100%;

          display: flex;
          flex-direction: row;
          flex-wrap: wrap;

          // 图表组件这一类
          .chart-compent-type {
            width: 100%;
            height: 100%;
            color: #fff;
            font-size: 12px;

            .cont {
              width: 100%;
              padding-left: 10px;
              padding-right: 10px;

              .type-title {
                width: 100%;
                height: 35px;
                line-height: 35px;
                font-size: 12px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                cursor: pointer;

                span {
                  display: inline-block;
                  width: 50px;
                }
              }

              .compent {
                width: 100%;
                padding-left: 10px;
                padding-right: 10px;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;

                .compent-block {
                  width: calc(50% - 10px);
                  height: 70px;
                  background-color: #fff;

                  margin: 5px;
                  position: relative;

                  .enter {
                    top: 0px;
                    left: 0px;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;

                    span {
                      width: 100px;
                      height: 12px;
                      display: inline-block;
                      text-align: center;
                      cursor: pointer;
                    }
                  }

                  img {
                    width: 100%;
                    height: 100%;
                  }
                }
              }

            }
          }

        }

        .handle-form {
          padding-left: 5px;
          padding-right: 5px;
          width: calc(100% - 10px);
          margin-top: 20px;
        }

        .handles {
          height: calc(100% - 40px);
          width: 320px;
          padding-left: 10px;
          padding-right: 10px;

          .layout-handle {
            width: 100%;
            height: auto;
            margin-bottom: 10px;

            .handle-name {
              height: 40px;
              line-height: 40px;
              font-size: 14px;
              color: #82828c;
            }

            .handle-mian {
              height: 40px;
              text-align: center;

              .mb-name {

                height: 50px;
                line-height: 50px;
                color: #fff;
                margin: 0 auto;
              }
            }
          }

        }
      }

      .pack-change {
        width: 230px;
        height: calc(100vh - 40px);
        background-color: #252626;
        margin-top: 40px;

        .title {
          width: 100%;
          height: 40px;
          line-height: 40px;
          background-color: #313131;
          line-height: 40px;
          color: #969696;
          font-size: 12px;
          border-left: 2px solid #262626;
          display: flex;
          flex-direction: row;
          justify-content: center;

          .left {
            width: 50%;
            text-align: center;
            background-color: #424242;
          }

          .right {
            width: 50%;
            text-align: center;
          }

        }

        .cont {
          width: 100%;
          height: calc(100% - 40px);

          font-size: 12px;
          padding-left: 10px;
          padding-right: 10px;

          .screen-title-ms {
            height: 20px;
            line-height: 20px;
            text-align: left;
            color: #ffffff;

          }

          .screen-title-input {

            margin-top: 15px;
            margin-bottom: 15px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            cursor: pointer;

            input {
              outline: none;
              height: 24px;
            }

            span {
              display: inline-block;
              height: 24px;
              line-height: 24px;
              color: #fff;
            }

          }

          .targets-title {
            height: 40px;
            line-height: 40px;
            text-align: left;
            color: #ffffff;

          }

          .target-tags {
            margin-top: 15px;
            margin-bottom: 15px;
          }

          .targets-check {
            width: 100%;
            height: 290px;
            padding-left: 10px;
            padding-right: 10px;
            background-color: #424242;

          }

          .target-handle {
            width: 100%;
            text-align: center;
            margin-top: 15px;
            color: #fff;
            cursor: pointer;
          }
        }

      }
    }
  }

</style>
<style>
  .pack-search .el-input__inner {
    background-color: #282828;
    border: 0px;
    color: #fff;
  }

</style>
