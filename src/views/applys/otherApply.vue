<template>
  <!-- 服务商应用管理 -->
  <div class="server-admin">
    <div class="server-search">
      <div class="search-btn">
        <el-input v-model="serverSearch" placeholder="请输入内容" prefix-icon="el-icon-search" style="width:180px" />
      </div>
      <div class="search-name">
        <div class="title">
          服务商名称：
        </div>
        <div class="type">

          <span>数据厂商一</span>
          <span>数据厂商二</span>
          <span>数据厂商三</span>

        </div>
      </div>

    </div>
    <div class="server-cont">
      <div class="server-apply">
        <div class="apply-pic">
          <img src="/charttypes/baseZxt.png" alt="">
        </div>
        <div class="apply-name">
          应用名称
        </div>
      </div>
      <div class="server-apply">
        <div class="apply-pic">
          <img src="/charttypes/baseZxt.png" alt="">
        </div>
        <div class="apply-name">
          应用名称
        </div>
      </div>

    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      serverSearch: '搜索相应服务商'
    }
  }
}

</script>
<style lang="scss" scoped>
  .server-admin {
    width: 1200px;
    margin: 0 auto;
    height: 100%;

    .server-search {

      line-height: 30px;
      padding: 30px 15px;
      margin-bottom: 30px;

      text-align: right;
      background-color: #fff;
      display: flex;
      flex-direction: column;

      .search-name {
        height: 100px;
        display: flex;
        flex-direction: row;
        border: 1px solid #e8e8e8;
        padding: 10px 20px;
        margin-top: 15px;

        .title {
          font-size: 16px;
          color: #999999;
          width: 100px;
        }

        .type {
          width: calc(100% - 100px);

          span {
            float: left;
            margin-right: 40px;
            font-size: 14px;
            color: #000;
            text-decoration: none;
          }
        }
      }

    }

    .server-cont {
      min-height: 240px;
      min-width: 960px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .server-apply {
        width: 220px;
        height: 230px;
        margin-right: 25px;
        background-color: #fff;

        .apply-pic {
          height: calc(100% - 80px);
          width: 100%;
          margin-top: 20px;
          margin-bottom: 20px;
          text-align: center;
          border-bottom: 1px solid #f7f7f7;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .apply-name {
          height: 40px;
          line-height: 40px;
          color: #4a4a4a;
          font-size: 14px;
          text-align: center;
        }
      }

      .server-apply:nth-of-type(5n) {
        margin-right: 0px;
      }
    }
  }

</style>
