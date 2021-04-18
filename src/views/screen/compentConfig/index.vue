<script>
  import configText from "@/views/screen/compentConfig/configText.vue";
  export default {
    data: {
      return: {
        TEXT_C: ["text", "input"]
      }

    },
    props: {
      componentType: {
        type: String,
        // 默认为文本组件
        default: "text"
      }
    },
    components:{
        configText
    },
    render: function (createElement) {
     return createElement(
          'config-text',
           this.$slots.default
        )

    },
  }

</script>
