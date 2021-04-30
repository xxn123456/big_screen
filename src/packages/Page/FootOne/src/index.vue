<template>
  <div class="foot">
    <div class="top">
      武汉市测试屏幕
    </div>
    <div class="bottom">
      <div class="left">

        特别鸣谢:小小鸟提供技术支持
        <!-- <img src="../img/ctylogo.png" alt="">

        <img src="../img/wdlogo.png" alt=""> -->
      </div>
      <div class="right">
        联合技术支持
      </div>

    </div>
  </div>
</template>
<script>
export default {
  name: 'FootOne',
  data() {
    return {

    }
  }
}

</script>
<style lang="scss" scoped>
  .foot {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction:column;
    justify-content:center;
    align-items: center;

    .top {
      width: 100%;
      height: 16px;
      color: #fff;
      font-size: 14px;
      text-align: center;
    }

    .bottom {

      height: 24px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      text-align: center;

      .left {
        height: 24px;
        display: flex;
        flex-direction: row;

        img {
          height: 24px;
        }
      }

      .right {
        height: 24px;
        line-height: 24px;
        font-size: 12px;
        margin-left: 10px;
        color: #fff;
      }

    }
  }

</style>
