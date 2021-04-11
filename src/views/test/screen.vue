<template>

  <div id="big-screen">

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
        style="border: 0px;"
        :draggable="false"
        :resizable="false"
        @dragging="onDrag"

        @activated="changeDate(item.compent.compentId)"
        @resizing="onResize"
      >
        <div class="compent-wrap" @contextmenu.prevent="moreHandle(index)">
          <!-- 替换组件 -->
          <!-- <component :is="item.compent.compentApply" :isOnResize="chartChange"></component> -->
          <img :src="item.url" alt="">
          <div v-show="removeChart==index" class="compent-btns">
            <el-button type="danger" icon="el-icon-delete" circle @click="remove" />
          </div>
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
import VueDraggableResizable from '@/components/VueDragReize/components/vue-draggable-resizable.vue'
//   import yczd_screen from './layout.js'
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
      // 容器布局
      layout: []
    }
  },
  mounted() {
    const new_layout = JSON.parse(localStorage.getItem('testLayout'))
    console.log(new_layout)
    this.layout = new_layout
  },

  methods: {
    prew() {

    },
    changeDate(index) {
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
    },
    remove(index) {
      this.layout.splice(index, 1)
    }

  }
}

</script>

<style lang="scss" scoped>
 #big-screen{
   width: 1334px;
   height: 750px;
   margin: 0 auto;
  //  background-color: #020d32;
   background-color: #11085f;
   display: flex;
   flex-direction: column;
   color: #fff;
   .screen-title{
       background-image: url('../../../public/screen/newtop1.png');
       height: 40px;
       line-height: 40px;
       background-size: 100% 38px;
       background-origin: center;
       text-align:center;
       font-size: 12px;
   }
   .screen-cont{
     width: 100%;
     height: 100%;
     .cont {
      width: 100%;
      height: 100%;
      .compent-wrap{
          width: 100%;
          height: 100%;
          position: relative;
          // 测试图片
          img{
            width: 100%;
            max-height: 100%;
            height: auto;
          }
          .compent-btns{
            position:absolute;
            width: 100%;
            height: 100%;
            top:0px;
            left:0px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            color: #fff;
          }
      }
    }

   }
   .screen-bottom{
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      text-align: center;
   }

 }

</style>
