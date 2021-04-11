<template>
  <!-- 服务商应用 -->
  <div class="friend-warp">

    <div class="table-mh">
      <span><i class="el-icon-tickets" /> 数据列表</span>
      <div class="search">
        <el-input v-model="serverSearch" placeholder="请输入内容" style="width:250px;" />
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="search-main">
        <el-button type="success" icon="el-icon-plus" size="small" @click="addPack" />
      </div>

    </div>
    <div class="cont">
      <el-table :data="friendPacks">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" />

        <el-table-column prop="packName" label="应用名称" />

        <el-table-column prop="packtype" label="应用类型" />

        <el-table-column prop="packCompent" label="应用组件" />

        <el-table-column prop="target.targetName" label="应用指标" />

        <el-table-column prop="targetItem.targetItemName" label="指标项" />

        <el-table-column prop="menu.menuName" label="菜单" />

        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text">修改</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <div class="page">
      <el-pagination background layout="prev, pager, next" :total="1000" />
    </div>

    <el-dialog title="操作指标" :visible.sync="dialogFormVisible" width="33%">
      <el-form :model="form">
        <el-form-item label="名称:" :label-width="formLabelWidth">
          <el-input v-model="form.packName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="应用类型:" :label-width="formLabelWidth">
          <el-select v-model="form.packtype.check" placeholder="请选择">
            <el-option
              v-for="item in form.packtype.option"
              :key="item.packtype"
              :label="item.packtype"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="组件名称:" :label-width="formLabelWidth">
          <el-input v-model="form.packCompent" autocomplete="off" />
        </el-form-item>

        <el-form-item label="应用指标:" :label-width="formLabelWidth">
          <!-- 指标项目->指标 -->
          <el-cascader v-model="form.target.check" :options="form.target.options" />
        </el-form-item>

        <el-form-item label="菜单:" :label-width="formLabelWidth">
          <el-select v-model="form.menu.check" placeholder="请选择">
            <el-option
              v-for="item in form.menu.option"
              :key="item.packtype"
              :label="item.packtype"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
import {
  getTargetItem,
  addTargetItem,
  queryDimension,
  editTargetItem,
  queryDimensionByTarget,
  delTargetItem
} from '@/api/target.js'
export default {
  data() {
    return {
      serverSearch: '',
      friendPacks: [{
        // 应用id
        packId: '',
        packName: '重复提醒次数',
        packtype: '表格',
        packCompent: 'apply-table',
        // 应用的上一级是哪一个菜单
        menu: {
          menuId: '',
          menuName: '基本医疗'
        },
        // 绑定指标项

        target: {
          // 指标id
          targetId: '',
          targetName: '重复用药提醒'
        }
        // 绑定指标

      }],
      // 弹窗相关字段
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        targetItemName: '',
        packtype: {
          check: '',
          options: []
        },
        target: {
          check: '',
          options: [
            {
              // s维度id
              value: '1',
              // 维度名称
              label: '重复用药提醒',
              children: [
                {
                  value: '1',
                  label: '时间维度',
                  children: [
                    {
                      value: '1',
                      label: '按年统计'
                    },
                    {
                      value: '2',
                      label: '按月统计'
                    }

                  ]

                },
                {
                  value: '2',
                  label: '地理维度'
                }
              ]
            }]
        },
        menu: {
          check: '',
          options: []
        }
      },
      submitState: 0,
      currentPage: 1,
      pageSize: 10

    }
  },
  mounted() {
    //   this.getTargetItems();
  },
  methods: {
    addPack() {
      this.dialogFormVisible = true
    }

    //   handleSubmit() {
    //     switch (this.submitState) {
    //       case 0:
    //         return new Promise((resolve, reject) => {
    //           let msg = JSON.stringify({
    //             "id": this.form.id,
    //             "targetItemName": this.form.targetItemName,
    //             "dimensionId": this.form.dimension.check
    //           })
    //           addTargetItem(msg).then((res) => {
    //             const {
    //               respData
    //             } = res;
    //             this.targetItems = respData.records;
    //             resolve()
    //           }).catch(error => {
    //             reject(error)
    //           })
    //         })
    //         break;
    //       case 1:

    //         return new Promise((resolve, reject) => {
    //           let msg = JSON.stringify({
    //             "targetItemName": this.form.targetItemName,
    //             "dimensionId": this.form.dimension.check
    //           })
    //           editTargetItem(msg).then((res) => {
    //             console.log("修改成功")
    //             resolve()
    //           }).catch(error => {
    //             reject(error)
    //           })
    //         })

    //         break;
    //       case 2:

    //         return new Promise((resolve, reject) => {
    //           let msg = JSON.stringify({
    //             "id": this.form.id
    //           })
    //           delTargetItem(msg).then((res) => {
    //             this.getTargetItems();
    //             resolve()
    //           }).catch(error => {
    //             reject(error)
    //           })
    //         })
    //         break;
    //       default:
    //     }

    //   },
    // 分页模块
    //   targetItemChange(page) {
    //     return new Promise((resolve, reject) => {
    //       let msg = JSON.stringify({
    //         "currentPage": page,
    //         "pageSize": this.pageSize
    //       })
    //       getTargetItem(msg).then((res) => {
    //         const {
    //           respData
    //         } = res;
    //         this.targetItems = respData.records;
    //         resolve()
    //       }).catch(error => {
    //         reject(error)
    //       })
    //     })
    //   },
    //   searchTargetItem(){
    //     return new Promise((resolve, reject) => {
    //       let msg = JSON.stringify({
    //         "currentPage": this.currentPage,
    //         "pageSize": this.pageSize,
    //         "targetItemName":this.serverSearch
    //       })
    //       getTargetItem(msg).then((res) => {
    //         const {
    //           respData
    //         } = res;
    //         this.targetItems = respData.records;
    //         resolve()
    //       }).catch(error => {
    //         reject(error)
    //       })
    //     })

    //   }

  }

}

</script>
<style lang="scss" scoped>
  .friend-warp {
    width: 100%;
    height: 100%;
    padding: 20px 15px;
    background-color: #fff;

    .table-mh {
      width: 100%;
      padding-left: 20px;
      padding-right: 20px;

      padding-top: 20px;
      padding-bottom: 20px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;

      .search {
        min-width: 400px;
        text-align: right;
        overflow: hidden;
      }

      .search-main {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-top: 30px;
      }

    }

    .cont {
      width: 100%;
      padding-left: 20px;
      padding-right: 20px;

      .handle-btn {
        color: #1890ff;
      }
    }

    .page {
      height: 100px;
      text-align: center;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }

</style>
