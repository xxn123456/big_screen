<template>
    <el-button v-bind="commentProps" v-on="$listeners">
        <slot></slot>
    </el-button>
</template>

<script>
export default {
    props:{
        size:{
             type:String,
             default:"mini"
        }
    },
    computed:{
        commentProps(){
            return {...this.$attrs,...this._props}
        }
    },

}
</script>