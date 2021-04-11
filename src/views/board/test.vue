<template>
  <div id="app">
    <div style="height: 800px; width: 1200px;position: relative;margin: 0 auto">

      <draggable
        v-model="proLayout.packs"
        class="base-drag"
        element="div"
        :options="proLayout.options"
        @start="isDragging=true"
        @end="isDragging=false"
      >
        <span>1111</span>

      </draggable>
      <vue-draggable-resizable
        :w="item.place.w"
        :h="item.place.h"
        :x="item.place.x"
        :y="item.place.y"
        :parent="true"
        v-for="item in layout"
        :debug="false"
        :min-width="200"
        :key="item.index"
        :min-height="200"
        :is-conflict-check="true"
        :snap="true"
        :snap-tolerance="10"
        class="cont"
        @activated="changeDate(item.compent.compentId)"
      >
        组件1
      </vue-draggable-resizable>

    </div>

  </div>
</template>

<script>
import draggable from 'vuedraggable'
import VueDraggableResizable from 'vue-draggable-resizable'
export default {
  name: 'App',
  components: {
    VueDraggableResizable
  },
  data() {
    return {
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
      layout: [{
        compent: {
          compentId: '1',
          compentApply: 'hsh-card',
          // 指标返回数据图表格式
          option: {}
        },
        place: {
          x: 0,
          y: 0,
          w: 300,
          h: 300
        }
      },
      {
        compent: {
          compentId: '2',
          compentApply: 'hsh-card',
          // 指标返回数据图表格式
          option: {}
        },
        place: {
          x: 300,
          y: 0,
          w: 200,
          h: 200
        }
      }
      ]
    }
  },
  methods: {
    changeDate(index) {
      console.log(index)
    }

  }
}

</script>

<style>
.base-drag{
  width: 400px;
  height: 300px;
}

</style>
