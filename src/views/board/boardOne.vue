<template>
  <!-- 模板一 -->
  <div class="board-one">

    <el-row :gutter="15" style="margin-bottom: 15px;">
      <el-col :xs="12" :sm="6" :lg="6">

        <draggable
          v-model="userLayout.container1"
          class="one-chart"
          element="div"
          :options="userLayout.containerOption1"
        >
          <!-- <div class="drag-block" v-for="item in userLayout.container1" :key="item.index">
          <component :is="item.packs.compent" :option="item.packs.target.option"></component>
        </div> -->
          <div class="drag-block">
            <hsh-card title="总销售额" total="¥126,560" />
          </div>
        </draggable>
      </el-col>
      <el-col :xs="12" :sm="6" :lg="6">
        <draggable
          v-model="userLayout.container1"
          class="one-chart"
          element="div"
          :options="userLayout.containerOption1"
        >
          <!-- <div class="drag-block" v-for="item in userLayout.container1" :key="item.index">
          <component :is="item.packs.compent" :option="item.packs.target.option"></component>
        </div> -->
          <div class="drag-block">
            <hsh-card title="总销售额" total="¥126,560" />
          </div>
        </draggable>
      </el-col>
      <el-col :xs="12" :sm="6" :lg="6">
        <draggable
          v-model="userLayout.container1"
          class="one-chart"
          element="div"
          :options="userLayout.containerOption1"
        >
          <!-- <div class="drag-block" v-for="item in userLayout.container1" :key="item.index">
          <component :is="item.packs.compent" :option="item.packs.target.option"></component>
        </div> -->
          <div class="drag-block">
            <hsh-card title="总销售额" total="¥126,560" />
          </div>
        </draggable>
      </el-col>

      <el-col :xs="12" :sm="6" :lg="6">
        <draggable
          v-model="userLayout.container1"
          class="one-chart"
          element="div"
          :options="userLayout.containerOption1"
        >
          <!-- <div class="drag-block" v-for="item in userLayout.container1" :key="item.index">
          <component :is="item.packs.compent" :option="item.packs.target.option"></component>
        </div> -->
          <div class="drag-block">
            <hsh-card title="总销售额" total="¥126,560" />
          </div>
        </draggable>
      </el-col>

    </el-row>

    <el-row :gutter="15" style="background-color: #fff;margin-bottom: 15px;">
      <el-col :xs="24" :sm="17" :lg="17">
        <!-- 远程诊断次数 -->
        <draggable
          v-model="userLayout.container5"
          class="two-chart"
          element="div"
          :options="userLayout.containerOption5"
        >
          <!-- <div class="drag-block" v-for="item in userLayout.container5" :key="item.index">
                <component :is="item.packs.compent" :option="item.packs.target.option"></component>
              </div> -->
          <div class="drag-block">
            <!-- 重复提醒模块 -->

            <hsh-zxt :option="cftx" />
          </div>
        </draggable>
      </el-col>
      <el-col :xs="24" :sm="7" :lg="7">
        <div class="two-chart">
          <!-- 重复次数 -->
          <draggable
            v-model="userLayout.container6"
            class="two-table"
            element="div"
            :options="userLayout.containerOption6"
          >
            <!-- <div class="drag-block" v-for="item in userLayout.container6" :key="item.index">
          <component :is="item.packs.compent" :option="item.packs.target.option"></component>
        </div> -->
            <div class="drag-block">
              <hsh-table :data="rankListData" />
            </div>
          </draggable>
        </div>
      </el-col>

    </el-row>

    <el-row :gutter="15" style="margin-bottom: 15px;">
      <el-col :xs="24" :sm="24" :lg="8">

        <draggable
          v-model="userLayout.container5"
          class="three-chart"
          element="div"
          :options="userLayout.containerOption5"
        >
          <!-- <div class="drag-block" v-for="item in userLayout.container5" :key="item.index">
                <component :is="item.packs.compent" :option="item.packs.target.option"></component>
              </div> -->
          <div class="drag-block">
            <!-- 重复提醒模块 -->

            <hsh-zxt :option="cftx" />
          </div>
        </draggable>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <draggable
          v-model="userLayout.container5"
          class="three-chart"
          element="div"
          :options="userLayout.containerOption5"
        >
          <!-- <div class="drag-block" v-for="item in userLayout.container5" :key="item.index">
                <component :is="item.packs.compent" :option="item.packs.target.option"></component>
              </div> -->
          <div class="drag-block">
            <!-- 重复提醒模块 -->

            <hsh-zxt :option="cftx" />
          </div>
        </draggable>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <draggable
          v-model="userLayout.container5"
          class="three-chart"
          element="div"
          :options="userLayout.containerOption5"
        >
          <!-- <div class="drag-block" v-for="item in userLayout.container5" :key="item.index">
                <component :is="item.packs.compent" :option="item.packs.target.option"></component>
              </div> -->
          <div class="drag-block">
            <!-- 重复提醒模块 -->

            <hsh-zxt :option="cftx" />
          </div>
        </draggable>
      </el-col>
    </el-row>

    <el-row :gutter="15" style="margin-bottom: 15px;">
      <el-col :xs="12" :sm="6" :lg="6">
        <draggable
          v-model="userLayout.container5"
          class="four-chart"
          element="div"
          :options="userLayout.containerOption5"
        >
          <!-- <div class="drag-block" v-for="item in userLayout.container5" :key="item.index">
                <component :is="item.packs.compent" :option="item.packs.target.option"></component>
              </div> -->
          <div class="drag-block">
            <!-- 重复提醒模块 -->

            <hsh-zxt :option="cftx" />
          </div>
        </draggable>
      </el-col>
      <el-col :xs="12" :sm="6" :lg="6">
        <draggable
          v-model="userLayout.container5"
          class="four-chart"
          element="div"
          :options="userLayout.containerOption5"
        >
          <!-- <div class="drag-block" v-for="item in userLayout.container5" :key="item.index">
                <component :is="item.packs.compent" :option="item.packs.target.option"></component>
              </div> -->
          <div class="drag-block">
            <!-- 重复提醒模块 -->

            <hsh-zxt :option="cftx" />
          </div>
        </draggable>
      </el-col>

      <el-col :xs="12" :sm="6" :lg="6">
        <draggable
          v-model="userLayout.container5"
          class="four-chart"
          element="div"
          :options="userLayout.containerOption5"
        >
          <!-- <div class="drag-block" v-for="item in userLayout.container5" :key="item.index">
                <component :is="item.packs.compent" :option="item.packs.target.option"></component>
              </div> -->
          <div class="drag-block">
            <!-- 重复提醒模块 -->

            <hsh-zxt :option="cftx" />
          </div>
        </draggable>
      </el-col>
      <el-col :xs="12" :sm="6" :lg="6">
        <draggable
          v-model="userLayout.container5"
          class="four-chart"
          element="div"
          :options="userLayout.containerOption5"
        >
          <!-- <div class="drag-block" v-for="item in userLayout.container5" :key="item.index">
                <component :is="item.packs.compent" :option="item.packs.target.option"></component>
              </div> -->
          <div class="drag-block">
            <!-- 重复提醒模块 -->

            <hsh-zxt :option="cftx" />
          </div>
        </draggable>
      </el-col>

    </el-row>

  </div>

</template>
<script>
import draggable from 'vuedraggable'
const test = []
for (let i = 0; i < 10; i++) {
  test.push({
    label: `重复提醒次数`,
    value: Math.ceil(Math.random() * 10000)
  })
}
export default {
  name: 'BoardOne',
  components: {
    draggable
  },
  data() {
    return {
      userLayout: {
        container1: [],
        containerOption1: {
          animation: 0,
          group: {
            // 容器归类
            name: 'layoutPack'
          }
        },
        container2: [],
        containerOption2: {
          animation: 0,
          group: {
            // 容器归类
            name: 'layoutPack'
          }
        },
        container3: [],
        containerOption3: {
          animation: 0,
          group: {
            // 容器归类
            name: 'layoutPack'
          }
        },
        container4: [],
        containerOption4: {
          animation: 0,
          group: {
            // 容器归类
            name: 'layoutPack'
          }
        },
        container5: [],
        containerOption5: {
          animation: 0,
          group: {
            // 容器归类
            name: 'layoutPack'
          }
        },
        container6: [],
        containerOption6: {
          animation: 0,
          group: {
            // 容器归类
            name: 'layoutPack'
          }
        },
        container7: [],
        containerOption7: {
          animation: 0,
          group: {
            // 容器归类
            name: 'layoutPack'
          }
        },
        container8: [],
        containerOption8: {
          animation: 0,
          group: {
            // 容器归类
            name: 'layoutPack'
          }
        },
        container9: [],
        containerOption9: {
          animation: 0,
          group: {
            // 容器归类
            name: 'layoutPack'
          }
        }
      },
      rankListData: [],
      cftx: {
        title: {
          text: '周销售额趋势',
          show: false
        },

        xAxis: {
          name: '周',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

        },
        yAxis: {
          name: '销售额',
          data: 'value'
        },
        grid: {
          left: '5%',
          right: '5%'
        },
        series: [{
          data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
          type: 'line',
          smooth: true
        }]
      }

    }
  },
  mounted() {
    this.rankListData = test
  }
}

</script>
<style lang="scss" scoped>
  .board-one {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;

    .one-chart {
      height: 165px;
      background-color: #fff;
    }

    .two-chart {
      height: 460px;

      .drag-block {
        width: 100%;
        height: 100%;
      }

    }

    // 重新填写的样式
    .three-chart {
      height: 314px;
      background-color: #fff;

      .drag-block {
        width: 100%;
        height: 100%;
      }

    }

    .four-chart {
      height: 480px;
      background-color: #fff;

      .drag-block {
        width: 100%;
        height: 100%;
      }
    }

  }

</style>
