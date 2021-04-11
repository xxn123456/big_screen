<template>
  <div class="title-two">
    <textarea v-model="title" class="title" :style="textStyle" />
  </div>
</template>
<script>
export default {
  // 文字正文
  name: 'TitleTwo',
  data() {
    return {
      title: '这是一段段落,用来描述文章正文',
      textStyle: {
        width: '280px',
        height: '68px',
        color: '#fff',
        fontSize: '12px',
        lineHeight: '12px',
        textAlign: 'center'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .title-two{
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

