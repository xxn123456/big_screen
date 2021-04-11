<template>
  <div class="num-scroll">
    <span class="title">{{ cardData.title }}</span>
    <countTo
      :start-val="cardData.startVal"
      :end-val="cardData.endVal"
      :duration="3000"
      style="
        font-size: 36px;
        font-family: 'lcdd';
        color: rgba(50,123,250,1);"
    />
    <span class="unit">{{ cardData.unit }}</span>
  </div>
</template>
<script>
import countTo from 'vue-count-to'
export default {
  name: 'NumOne',
  components: {
    countTo
  },
  data() {
    return {
      cardData: {
        title: '武汉市新生儿新增数',
        startVal: 0,
        endVal: 2017,
        unit: '/个'
      }
    }
  },
  computed: {
    numScroll() {
      return this.cardData.endVal
    }
  },
  watch: {
    numScroll(val, old) {
      this.cardData.startVal = old
    }
  },
  mounted() {
    setTimeout(() => {
      this.cardData.endVal = 3000
    }, 5000)
  }
}

</script>
<style scoped>
  @font-face {
    font-family: 'lcdd';
    src: url('../lccd/lcdd.ttf');
    font-weight: normal;
    font-style: normal;
  }

  .num-scroll {
    width: 100%;
    height: 100%;
  }
  .title{
      font-size: 18px;
      color: #fff;
      margin-right: 5px;
  }
  .unit{
      font-size: 12px;
      color: #fff;
      margin-left: 5px;
  }

</style>
