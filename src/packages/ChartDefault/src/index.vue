<template>
    <div class="chart-error" :loading="true">
        <span><i class="el-icon-loading" style="font-size:24px;"></i></span>
        <span>图表加载异常</span>
        <span style="font-size:12px;">(请检查组件跟指标)</span>
      
    </div>
</template>
<script>
export default {
    name:"ChartDefault",
    data(){
        return{

        }
    }
}
</script>
<style lang="scss" scoped>
    .chart-error{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction:column;
        justify-content: center;
        align-items: center;
        color: rgb(24, 144, 255);
    }
</style>