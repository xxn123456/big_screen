<template>
  <div class="big-screen">

    <div class="screen-cont">

      <vue-draggable-resizable
        :draggable="false"
        :resizable="false"
        :w="item.place.w"
        :h="item.place.h"
        v-for="(item,index) in layout"
        :x="item.place.x"
        :key="item.index"
        :y="item.place.y"
        :min-width="50"
        :min-height="10"
        class="cont"
        :drag-index="index"
        :snap="true"
        style="border:0px;"
        @dragging="onDrag"
        @activated="changeDate"
        @deactivated="remove_guide"
        @resizing="onResize"
      >
        <div class="compent-wrap" @mouseenter="moreHandle(index)">
          <!-- 替换组件 -->
          <component
            :is="item.compent.compnetAlsx"
            :is-on-resize="chartChange"
            :chart-option="item.compent.option"
            :chart-data="item.target.data"
            :screen-page="item.page"
          />
          <!-- <img :src="item.compent.url" alt=""> -->

        </div>

      </vue-draggable-resizable>

    </div>

  </div>
</template>

<script>
//  自定义修改vue-draggable-resizable
import VueDraggableResizable from '@/components/VueDragReize/components/index'
import '@/components/VueDragReize/components/vue-draggable-resizable.css'
export default {
  name: 'DragLayout',
  components: {
    VueDraggableResizable

  },
  props: ['layoutData'],
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
      // 辅助线部分
      guide: null,
      layout: []

    }
  },
  watch: {
    layoutData() {
      this.layout = this.layoutData
    }
  },
  mounted() {
    this.layout = this.layoutData
  },

  methods: {
    prew() {
      this.$router.push({
        path: '/screen'
      })
      localStorage.setItem('testLayout', JSON.stringify(this.layout))
    },
    changeDate(index) {
      //  向模板组件传递echart所存在的位置

      //  console.log(index);

      this.$emit('reciveIndex', index)

      this.guide = index

      //  console.log("传递激活索引");

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
      this.guide = null
      this.layout.splice(dragIndex, 1)
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
    // width: 1334px;
    // height: 750px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    //  background-color: #020d32;
    background-color: #11085f;
    display: flex;
    flex-direction: column;
    color: #fff;
    overflow: hidden;

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

  }

</style>
