<template>
  <div class="edit-warp">
    <div class="top">
      <div class="screen-title">
        <span>布局管理</span><span class="line">/</span><span>远程诊断大屏</span><span class="line"><i
            class="el-icon-document" /></span>
      </div>
      <div class="compnets-change">
        <span v-for="item in componentTypes" :key="item.id"
          @click="changeAllCompent(item.id)">{{item.categoryName}}</span>
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
          相关拖拽组件
        </div>
        <div class="packages">
          <!-- 图表组件类型 -->
          <div class="chart-compent-type">
            <div class="cont">

              <div class="compent">

                <div v-for="s in components" :key="s.index" class="compent-block" draggable="true"
                  @dragstart="dragstartHandler($event,s)">
                  <img :src="s.component_pic|imgfitter" alt="">
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

            <div class="pc-mb" @dragover="onDragOver($event)" @drop="compent_enter($event)">

              <tem-one :layout-data="layout" @reciveIndex="setTargetAndCss" />


            </div>
          </vue-ruler-tool>

        </div>


      </div>
      <!-- 各个操作项目 -->
      <div class="pack-change">
        <div class="title">
          <div class="left">
            配置项
          </div>
          <div class="right">

          </div>
        </div>
        <div class="cont">
          <!-- 其他数据项操作 -->

          <config-dig :componentType="now_config" @change="sure_config" @change_type2="sure_config2"></config-dig>





        </div>
      </div>
    </div>
  </div>
</template>
<script>
  // 导入图片失败地址
  import TemOne from '@/views/screen/createLayout.vue'
  import IMGURL from '@/utils/setDeafult.js'
  import VueRulerTool from '@/components/VueRuler/components/vue-ruler-tool.vue'
  import qs from 'querystring'


  import configDig from "@/views/screen/compentConfig/index.vue";

  import {
    findAllComponentType,
    findComponentByType,
    update,
    findScreen,
    prod_option
  } from "@/api/layout.js";

  import {
    findOne
  } from "@/api/target.js";

  export default {
    components: {
      TemOne,
      VueRulerTool,
      configDig
    },
    filters: {
      imgfitter: function (val) {
        return IMGURL + val
      }
    },
    data() {
      return {
        userId: '',
        componentTypes: [],
        activeComponentTypeId: null,
        components: [],
        // 模板项目
        layout: [
          // {
          //   target: {
          //     id: 1,
          //     content: "",
          //   },
          //   component: {
          //     ui: "line-one",
          //     option: [],

          //   },
          //   place: {
          //     w: 200,
          //     h: 200,
          //     x: 100,
          //     y: 100
          //   }
          // },

        ],
        screen_id: null,
        // 组件拖拽中途数据储存

        dataTransfer: null,

        // 布局中组件存在位置
        packIndex: null,
        scaleNum: 0,
        // 刻度线
        screen: {
          w: 1920,
          h: 1080
        },
        // 当前是哪一个配置窗
        now_config: null,
        // 当前是哪一个组件
        now_compent: null,
        prod_new_config: null,
      }
    },

    mounted() {
      this.userId = this.$route.query.userId;

      this.screen_id = this.$route.query.id;

      this.findAllComponentType();

      this.findScreen();


    },
    methods: {


      // 切换所有组件
      changeAllCompent(id) {
        this.activeComponentTypeId = id;

        this.findComponentByType();


      },

      // 查询所有组件类别

      findAllComponentType() {

        return new Promise((resolve, reject) => {

          findAllComponentType().then((res) => {
            let {
              code,
              data
            } = res;

            if (code == "200") {
              this.componentTypes = data;
              this.activeComponentTypeId = data[0].id;

              if (this.activeComponentTypeId) {
                this.findComponentByType();

              }

            } else {
              this.$message("获取组件类别失败")
            }


          })

        })

      },

      // 根据组件类别获取组件

      findComponentByType() {

        return new Promise((resolve, reject) => {
          let msg = qs.stringify({
            id: this.activeComponentTypeId
          });

          findComponentByType(msg).then((res) => {
            let {
              code,
              data
            } = res;

            if (code == "200") {
              this.components = data;

            } else {
              this.$message("获取组件失败")
            }


          })

        })

      },

      dragstartHandler(ev,val) {

        console.log("开始拖到",val);
        this.dataTransfer = Object.assign({},val);
      },
      onDragOver(ev) {

        ev.preventDefault();
      },

      // 生成组件随机位置

      random_x(min, max) {

        return Math.floor(Math.random() * (max - min)) + min;

      },



      compent_enter(ev) {

        let com_type = this.dataTransfer.component_type.categoryName;

        if (com_type == "界面组件") {

          this.layout.push({
            base: {
              title: "标题",
              img: "#"
            },
            target: {
              id: 1,
              content: "",
            },
            component: this.dataTransfer,
            place: {
              w: 1000,
              h: 50,
              x: 100,
              y: 100
            },
          });

        }

        if (com_type == "武汉地图") {

          this.layout.push({
            base: {
              title: "标题",
              img: "#"
            },
            target: {
              id: 1,
              content: "",
            },
            component: this.dataTransfer,
            place: {
              w: 500,
              h: 500,
              x: 100,
              y: 100
            },
          });

        }

         if (com_type == "图片") {

          this.layout.push({
            base: {
              title: "标题",
              url:"#",
            },
            target: {
              id: 1,
              content: "",
            },
            component: this.dataTransfer,
            place: {
              w: 400,
              h: 300,
              x: 100,
              y: 100
            },
          });

        }


        if (com_type == "折线图" || com_type == "柱状图" || com_type == "横向柱状图" ||
          com_type == "扇形图" || com_type == "雷达图") {

          this.layout.push({
            base: {
              title: "标题",
              img: "#"
            },
            target: {
              id: 1,
              content: "",
            },
            component: this.dataTransfer,
            place: {
              w: 200,
              h: 200,
              x: this.random_x(10, 200),
              y: 100
            },
          });

        }


      },

      // 配置项传递的值

      sure_config(config) {

        return new Promise((resolve, reject) => {
          let msg = qs.stringify({
            id: config.target_id
          })

          findOne(msg).then((res) => {
            let {
              code,
              data
            } = res;
            if (code == "200") {

              this.layout[this.now_compent].target = data;





              // 开启配置

              if (config.hasOwnProperty('target_id')) {

                this.prod_new_config = config.target_id;

              }

              if (config.hasOwnProperty('title')) {
                this.layout[this.now_compent].base.title = config.title;

              }

              if (config.hasOwnProperty('targetNames')) {

                this.layout[this.now_compent].base.targetNames = config.targetNames

              }






              this.prod_chart();




            } else {
              this.$message("查询失败")
            }
          })

        })


      },

      sure_config2(config) {

        console.log("所有配置项",config);

        if(config.title){

           this.layout[this.now_compent].base.title = config.title;

        }

        if(config.url){

           this.layout[this.now_compent].base.url = config.url;

        }

        
       


        this.layout[this.now_compent].component.option = config;

      },

      prod_chart() {

        let component_id = this.layout[this.now_compent].component.id;
        let target_id = this.layout[this.now_compent].target.id;
        let base = this.layout[this.now_compent].base;






        return new Promise((resolve, reject) => {

          let msg = qs.stringify({
            "componet_id": component_id,
            "target_id": target_id,
            "title": base.title,
            "targetNames": base.targetNames
          });

          prod_option(msg).then((res) => {

            let {
              code,
              data
            } = res;

            if (code == "200") {
              this.layout[this.now_compent].component.option = data
            } else {
              this.$message("获取图表配置失败")
            }

          })

        })

      },


      // 相应拖拽布局点击组件索引

      setTargetAndCss(x) {
        this.now_config = this.layout[x].component.component_type.categoryName;
        this.now_compent = x;
      },
      // 填写指标数据到布局
      saveScreenTitle() {

      },
      // 保存指标数据到图表进行更新

      saveChartTarget() {

      },

      findScreen() {
        return new Promise((resolve, reject) => {
          let msg = qs.stringify({
            id: this.screen_id
          });

          findScreen(msg).then((res) => {

            let {
              code,
              data
            } = res;
            if (code == "200") {

              let bb = JSON.parse(data.layout);


              this.layout = bb;
            } else {
              this.$message("获取当前大屏布局失败")
            }

          })

        })



      },
      saveLayout() {

        return new Promise((resolve, reject) => {

          let msg = qs.stringify({
            id: this.screen_id,
            layout: JSON.stringify(this.layout)
          })

          update(msg).then((res) => {

            let {
              code,
              data
            } = res;
            if (code == "200") {
              this.$message("更新大屏布局成功")
            } else {
              this.$message("更新大屏布局s失败")
            }

          })

        })






      },
      // 查询所有组件类型

      showCompent(mycompent, index) {
        this.compentTab = index
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
        font-weight: bold;
        cursor: pointer;

        span {
          margin-left: 15px;
          margin-right: 15px;

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
                  width: 100%;
                  height: 150px;
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
