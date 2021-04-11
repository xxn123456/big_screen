<template>
  <div class="screen-title">
    <span>{{ name }}</span>
  </div>
</template>
<script>
export default {
  name: 'HeadOne',
  props: ['screenPage'],
  data() {
    return {
      name: '测试大屏'
    }
  },
  computed: {
    fatherTitle() {
      return this.screenPage.title
    }
  },

  watch: {
    fatherTitle() {
      this.name = this.fatherTitle
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.name = this.screenPage.title
    }
  }
}
</script>
<style lang="scss" scoped>
    .screen-title {
      background-image: url('../img/newtop1.png');
      height: 100%;
      background-size: 100% 100%;
      background-origin: center;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      color: #fff;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items:center;
    }
</style>
