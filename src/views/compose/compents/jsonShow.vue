<template>
  <div class="json-show">

    <json-viewer :value="data" :expand-depth="4" copyable="复制" sort />
  </div>
</template>
<script>
import JsonViewer from 'vue-json-viewer'
export default {
  components: {
    JsonViewer
  },
  props: ['data'],
  data() {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
    .json-show{
        width: 100%;
        height: auto;
    }
</style>
