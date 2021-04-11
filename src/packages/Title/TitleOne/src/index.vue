<template>
  <div class="title-one">
    <textarea v-model="title" class="title" :style="textStyle" />
  </div>
</template>
<script>
export default {
  // 一级标题
  name: 'TitleOne',
  data() {
    return {
      title: '标题',
      textStyle: {
        width: '280px',
        height: '68px',
        color: '#fff',
        fontSize: '18px',
        lineHeight: '18px',
        textAlign: 'center'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .title-one{
      width: 100%;
      height: 100%;
      .title{
          width: 100%;
          height: 100%;
          background-color: transparent;
          border: 0px;
          outline:none;
          overflow: hidden;
          resize:none;
      }

  }
</style>

