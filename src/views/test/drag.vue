<template>
  <div class="big-screen">
    <div class="screen-title" @contextmenu.prevent="moreHandle">
      基本医疗
    </div>

    <div class="screen-cont">
      <vue-draggable-resizable
        v-for="(item,index) in layout"
        :w="item.place.w"
        :key="item.index"
        :h="item.place.h"
        :x="item.place.x"
        :y="item.place.y"
        :min-width="200"
        :min-height="200"
        class="cont"
        :drag-index="index"
        :snap="true"
        @dragging="onDrag"
        @refLineParams="getRefLineParams"
        @activated="changeDate"

        @deactivated="remove_guide"
        @resizing="onResize"
      >
        <div class="compent-wrap" @contextmenu.prevent="moreHandle(index)">
          <!-- 替换组件 -->
          <!-- <component :is="item.compent.compentApply" :isOnResize="chartChange"></component> -->
          <img :src="item.url" alt="">
          <div v-show="removeChart==index" class="compent-btns">
            <el-button type="danger" icon="el-icon-delete" circle @click.prevent="remove(index)" />
          </div>
          <!-- 辅助线部分 -->
          <div v-if="guide==index" class="guide-line1" />
          <div v-if="guide==index" class="guide-line2" />
          <div v-if="guide==index" class="guide-line3" />
          <div v-if="guide==index" class="guide-line4" />

          <div v-if="guide==index" class="guide-line5" />
          <div v-if="guide==index" class="guide-line6" />
          <div v-if="guide==index" class="guide-line7" />
          <div v-if="guide==index" class="guide-line8" />
        </div>

      </vue-draggable-resizable>

    </div>
    <div class="screen-bottom">
      底部
    </div>

    <div>
      <el-button type="primary" @click="prew">预览</el-button>
    </div>
  </div>
</template>

<script>
//  自定义修改vue-draggable-resizable
import VueDraggableResizable from '@/components/VueDragReize/components/vue-draggable-resizable'
import '@/components/VueDragReize/components/vue-draggable-resizable.css'
import yczd_screen from './layout.js'
import peopleQuery from '@/dome/peopleQuery.vue'
import healthMsg from '@/dome/healthMsg.vue'
import electronicMed from '@/dome/electronicMed.vue'
export default {
  name: 'App',
  components: {
    VueDraggableResizable,
    // 第三方组件测试
    peopleQuery,
    healthMsg,
    electronicMed
  },
  data() {
    return {
      chartChange: false,
      removeChart: null,
      proLayout: {
        packs: [],
        option: {
          animation: 0,
          group: {
            name: 'layoutPack',
            pull: 'clone',
            put: false
          }
        }
      },
      guide: null,
      vLine: [],
      hLine: [],
      // 容器布局
      // layout: [],
      layout: [
        {
          compent: {
            compentId: '1',
            compentApply: 'people-query',
            // 指标返回数据图表格式
            option: {}
          },

          url: '../../test/test1.png',
          place: {
            x: 300,
            y: 0,
            w: 500,
            h: 400
          }
        },
        {
          compent: {
            compentId: '2',
            compentApply: 'people-query',
            // 指标返回数据图表格式
            option: {}
          },
          url: '../../test/test2.png',
          place: {
            x: 300,
            y: 0,
            w: 500,
            h: 400
          }
        }

      ]
    }
  },
  mounted() {
    this.layout = yczd_screen
  },

  methods: {
    prew() {
      this.$router.push({
        path: '/screen'
      })

      localStorage.setItem('testLayout', JSON.stringify(this.layout))
    },
    changeDate(index) {
      console.log(index)
      this.guide = index
      // console.log(index);
      // console.log(this.layout);
    },
    // 获取索引
    onResize(x, y, width, height, dragIndex) {
      // 触发drag div 布局变化重绘图表
      this.chartChange = !this.chartChange
      this.layout[dragIndex].place.x = x
      this.layout[dragIndex].place.y = y
      this.layout[dragIndex].place.w = width
      this.layout[dragIndex].place.h = height
    },
    onDrag(x, y, dragIndex) {
      this.layout[dragIndex].place.x = x
      this.layout[dragIndex].place.y = y
    },
    moreHandle(index) {
      this.removeChart = index
      console.log('执行删除操作')
      //  this.layout.splice(index, 1);
    },
    remove(dragIndex) {
      console.log(dragIndex)
      this.layout.splice(dragIndex, 1)
    },
    getRefLineParams(params) {
      const {
        vLine,
        hLine
      } = params
      this.vLine = vLine
      this.hLine = hLine
    },
    remove_guide() {
      // 清除辅助线
      this.guide = null
    }

  }
}

</script>

<style lang="scss" scoped>
  .big-screen {
    width: 1334px;
    height: 750px;
    margin: 0 auto;
    //  background-color: #020d32;
    background-color: #11085f;
    display: flex;
    flex-direction: column;
    color: #fff;
    overflow: hidden;

    .screen-title {
      background-image: url('../../../public/screen/newtop1.png');
      height: 40px;
      line-height: 40px;
      background-size: 100% 38px;
      background-origin: center;
      text-align: center;
      font-size: 12px;
    }

    .screen-cont {
      width: 100%;
      height: 100%;
      overflow: hidden;

      .cont {
        width: 100%;
        height: 100%;

        .compent-wrap {
          width: 100%;
          height: 100%;
          position: relative;

          // 测试图片
          img {
            width: 100%;
            max-height: 100%;
            height: auto;
          }

          .compent-btns {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0px;
            left: 0px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            color: #fff;
          }

          .guide-line1 {
            width: 2000px;
            height: 1px;
            top: 0px;
            left: 100%;
            position: absolute;
            z-index: 1;
            border-bottom: 1px dashed red;
          }

          .guide-line2 {
            width: 2000px;
            height: 1px;
            top: 0px;
            right: 100%;
            position: absolute;
            z-index: 1;
            border-bottom: 1px dashed red;
          }

          .guide-line3 {
            width: 2000px;
            height: 1px;
            top: 100%;
            right: 100%;
            position: absolute;
            z-index: 1;
            border-bottom: 1px dashed red;
          }

          .guide-line4 {
            width: 2000px;
            height: 1px;
            top: 100%;
            left: 100%;
            position: absolute;
            z-index: 1;
            border-bottom: 1px dashed red;
          }

          .guide-line5 {
            width: 1px;
            height: 2000px;
            top: 0;
            left: 0;
            position: absolute;
            transform-origin: 0 0;
            transform: rotate(180deg);
            z-index: 1;
            border-left: 1px dashed red;
          }

          .guide-line6 {
            width: 1px;
            height: 2000px;
            top: 0;
            right: 0;
            position: absolute;
            transform-origin: 0 0;
            transform: rotate(180deg);
            z-index: 1;
            border-left: 1px dashed red;
          }

          .guide-line7 {
            width: 1px;
            height: 2000px;
            top: 100%;
            left: 0;
            position: absolute;

            z-index: 1;
            border-left: 1px dashed red;
          }

          .guide-line8 {
            width: 1px;
            height: 2000px;
            top: 100%;
            right: 0;
            position: absolute;
            z-index: 1;
            border-left: 1px dashed red;
          }
        }
      }

    }

    .screen-bottom {
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      text-align: center;
    }

  }

</style>
