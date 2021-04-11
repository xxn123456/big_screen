<template>
  <div>
    <DDR :value="transform" :active="isactive">
      <div style="width:100%;height:100%;background:red">1</div>
    </DDR>
  </div>
</template>
<script>
import DDR from 'yoyoo-ddr'
import 'yoyoo-ddr/dist/yoyoo-ddr.css'
export default {
  components: {
    DDR
  },
  data() {
    return {
      transform: { x: 100, y: 100, width: 100, height: 100, rotation: 0 },
      isactive: true
    }
  }
}
</script>
