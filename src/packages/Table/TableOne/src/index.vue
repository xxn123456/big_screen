<template>

  <div class="rank-wrap">
    <div class="title">
      武汉市万元以上社保数
    </div>
    <div class="header">
      <span v-for="item in tableData.title" :key="item.index">{{ item }}</span>
    </div>
    <!-- <swiper class="rows" :options=" tableData.swiperOption" ref="mySwiper">
      <swiper-slide class="row-item" v-for="item in tableData.cont" :key="item.index">
        <span v-for="chidren in item" :key="chidren.index">{{chidren}}</span>
      </swiper-slide>

    </swiper> -->

    <swiper ref="mySwiper" class="rows" :options="tableData.swiperOption">
      <swiper-slide v-for="item in tableData.cont" :key="item.index" class="row-item">
        <span v-for="chidren in item" :key="chidren.index">{{ chidren }}</span>
      </swiper-slide>

    </swiper>

  </div>

</template>
<script>
export default {
  name: 'TableOne',
  props: ['isOnResize'],
  data() {
    return {
      size: 0,
      tableData: {
        title: ['医院', '10-20', '20-50', '50+'],
        cont: [
          ['中医院', '21804', '3161', '2677'],
          ['武汉大学口腔医院', '21804', '3161', '2677'],
          ['武汉市中心医院', '21804', '3161', '2677'],
          ['湖北省第三人民医院', '21804', '3161', '2677'],
          ['中西结合医院', '21804', '3161', '2677'],
          ['协和医院', '21804', '3161', '2677']
        ],
        swiperOption: {
          direction: 'vertical',
          slidesPerView: 5,
          autoplay: {
            delay: 3000
          }
        }
      }
    }
  },
  watch: {
    size() {
      this.tableData.swiperOption = {
        direction: 'vertical',
        slidesPerView: 5,
        autoplay: {
          delay: 3000
        }
      }
    },
    isOnResize() {
      this.tableData.swiperOption = {
        direction: 'vertical',
        slidesPerView: 5,
        autoplay: {
          delay: 3000
        }
      }
    }

  },
  mounted() {
    this.size = 1
  }

}

</script>

<style lang="scss" scoped>
  .rank-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .title {
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      color: #fff;
      text-align: center;
    }

    .header {
      height: 40px;
      line-height: 40px;
      width: 100%;
      color: #fff;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
      font-size: 14px;
      background-color: rgba(50, 123, 250, 0.6);

      span {
        width: auto;
        display: inline-block;
        text-align: center;
        color: #fff;
      }

      span:nth-of-type(1) {
        background-color: "#e87e0d";
      }
    }

    .handle-btns {
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: right;
      color: #fff;
    }

    .rows {
      width: 100%;
      height: calc(100% - 70px);
      color: #fff;
      font-size: 12px;

      .swiper-wrapper {
        width: 100%;
        height: 100%;
      }

      .row-item {
        // height: 20%;
        // line-height: 40px;
        display: flex;
        flex-direction: row;

        justify-content: space-around;
        align-items: center;

        span {
          width: 200px;
          display: inline-block;
          text-align: center;
        }

      }

      .row-item:nth-child(odd) {
        background: rgba(50, 123, 250, 0.3);
      }

      .row-item:nth-child(even) {
        background: rgba(50, 123, 250, 0.2);
      }
    }

  }

</style>
