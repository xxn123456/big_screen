<script>
  import configText from "@/views/screen/compentConfig/configText.vue";
  import configChart from "@/views/screen/compentConfig/configChart.vue";
  import configImg from "@/views/screen/compentConfig/configImg.vue";
  import configTable from "@/views/screen/compentConfig/configTable.vue";
  export default {
    props: {
      componentType: {
        type: String,
        // 默认为文本组件
        default: "text"
      }
    },

    components: {
      configText,
      configChart,
      configImg,
      configTable

    },
    render: function (createElement) {
      let _this = this;
      if (this.componentType == "文字") {
        return createElement(
          'config-text',
          this.$slots.default
        )

      }
      if (this.componentType == "界面组件") {
        return createElement(
          'config-text', {
            on: {
              change_type2(val) {

                _this.$emit("change_type2", val)



              }
            }
          },
          this.$slots.default
        )



      }




      if (this.componentType == "图片") {
        return createElement(
          'config-img',
          {
             on: {
              change_type2(val) {

                _this.$emit("change_type2", val)



              }
            }
          },
          this.$slots.default
          
        )


      }



      if (this.componentType == "折线图" || this.componentType == "柱状图" || this.componentType == "横向柱状图" || this
        .componentType == "扇形图" || this.componentType == "雷达图" || this.componentType == "地图") {
        return createElement(
          'config-chart', {
            on: {
              change(val) {

                _this.$emit("change", val)



              }
            }
          },
          this.$slots.default
        )

      }

      if (this.componentType == "表格") {
        return createElement(
          'config-table',
          this.$slots.default
        )

      }


    },
  }

</script>
