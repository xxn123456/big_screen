<template>
  <div class="big-screen">

    <div class="screen-cont">

      <vue-draggable-resizable v-for="(item,index) in layout" :w="item.place.w" :key="item.index" :h="item.place.h"
        :x="item.place.x" :y="item.place.y" :min-width="50" :min-height="10" class="cont" :drag-index="index"
        :snap="true" @dragging="onDrag" @activated="changeDate" @deactivated="remove_guide" @resizing="onResize">
        <div class="compent-wrap" @mouseenter="moreHandle(index)">
          <!-- 替换组件 -->
          <component :is="item.component.other_name" :is-on-resize="chartChange" :chart-option="item.component.option"
            :chart-data="item" :screen-page="item.page" />
          <!-- <img :src="item.compent.url" alt=""> -->
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

  </div>
</template>

<script>
  //  自定义修改vue-draggable-resizable
  import VueDraggableResizable from '@/components/VueDragReize/components/vue-draggable-resizable';

  import '@/components/VueDragReize/components/vue-draggable-resizable.css';


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
        layout: [

          // {
          //   target: {
          //     id: 1,
          //     content: "",
          //   },
          //   componentType: {
          //     id: "",
          //     categoryName: ""
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
          // }

]

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
      changeDate(index) {
        this.$emit('reciveIndex', index);
        this.guide = index;
      },


      // 调整组件大小

      onResize(x, y, width, height, dragIndex) {
        // 触发drag div 布局变化重绘图表
        this.chartChange = !this.chartChange
        this.layout[dragIndex].place.x = x
        this.layout[dragIndex].place.y = y
        this.layout[dragIndex].place.w = width
        this.layout[dragIndex].place.h = height
      },

      // 拖拽组件

      onDrag(x, y, dragIndex) {
        this.layout[dragIndex].place.x = x
        this.layout[dragIndex].place.y = y
      },
      moreHandle(index) {
        this.removeChart = index;
        //  this.layout.splice(index, 1);
      },
      remove(dragIndex) {

        this.guide = null
        this.layout.splice(dragIndex, 1)
      },

      // 清除辅助线

      remove_guide() {

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
            z-index: 10;
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
