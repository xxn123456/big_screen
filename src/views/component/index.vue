<template>
  <div class="table-wrap">
    <div class="table-handle-btns">
      <el-button type="primary" @click="handleAdd">新增</el-button>
      <el-button @click="batchDel">删除</el-button>
      <!-- <el-button>导出</el-button> -->
    </div>
    <div class="search">
      <span class="demonstration">创建时间：</span>
      <el-date-picker v-model="search.time" type="daterange" range-separator="至" start-placeholder="开始日期"
        format="yyyy-MM-dd" value-format="yyyy-MM-dd HH:mm:ss" end-placeholder="结束日期">
      </el-date-picker>
    </div>
    <div class="search">
      <span class="demonstration">按照名称：</span>
      <el-input v-model="search.name" placeholder="请输入内容" class="search-name"></el-input>
      <el-button @click="searchList">开始搜索</el-button>
    </div>

    <div class="table-main">

      <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="name" label="组件名称" width="180" align="left">
        </el-table-column>

        <el-table-column prop="other_name" label="组件别名" align="left">
        </el-table-column>

        <el-table-column prop="component_type.categoryName" label="组件类别" align="left">
        </el-table-column>


        <el-table-column prop="component_pic" label="组件预览图" width="180" align="right">

        </el-table-column>


        <el-table-column prop="createdAt" label="创建时间" align="right" :formatter="Tableformatter">
        </el-table-column>



        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-nation">
      <el-pagination :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" background
        :total="total" @current-change="currentChange">
      </el-pagination>
    </div>

    <el-dialog title="操作" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="组件名称">
          <el-input v-model="form.name" style="width:300px"></el-input>
        </el-form-item>

        <el-form-item label="组件别名">
          <el-input v-model="form.other_name" style="width:300px"></el-input>
        </el-form-item>

        <el-form-item label="组件类别">
          <el-select v-model="form.component_type" placeholder="请选择">
            <el-option v-for="item in componentTypes" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="组件预览图">
          <el-upload class="upload-demo" action="http://localhost:3000/component/upload" multiple :limit="1"
            :file-list="fileList" :on-success="uploadSuccess" show-file-list="false">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="组件预览图">

          <prism-editor class="my-editor height-300" v-model="code" :highlight="highlighter"
            :line-numbers="lineNumbers"></prism-editor>

        </el-form-item>


      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {
    findAll,
    create,
    update,
    del,
    batchDel,
    findcomponentAndType
  } from "@/api/component.js";

  import qs from 'query-string';

  import {
    PrismEditor
  } from "vue-prism-editor";
  import "vue-prism-editor/dist/prismeditor.min.css";
  import {
    highlight,
    languages
  } from "prismjs/components/prism-core";
  import "prismjs/components/prism-clike";
  import "prismjs/components/prism-javascript";
  import "prismjs/themes/prism-tomorrow.css"; 
  export default {
    data() {
      return {
        search: {
          time: "",
          name: ""
        },
        code: "",
        lineNumbers: true,
        multipleSelection: [],
        form: {
          id: "",
          name: null,
          other_name: null,
          component_type: null,
          component_pic: null,
          createdAt: null
        },
        componentTypes: [],
        fileList: [],
        // 0代表新增操作,1代码修改操作
        submitState: 0,
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        categoryName: "",
        total: 400,
        dialogVisible: false

      }
    },
    mounted() {
      this.findAll();
      let test = new Date('2017-2-1').getTime();
      console.log("转换的时间", test)
    },
    components: {
      PrismEditor
    },
    methods: {
      highlighter(code) {
        return highlight(code, languages.js); //returns html
      },

    Tableformatter(row, column, cellValue, index) {
      if (cellValue == "" || cellValue == null || cellValue == undefined) {
        return "字段为空值"
      } else {
        return cellValue
      }
    },
    // 按照固定条件搜索
    searchList() {
      console.log("进入搜索");
      let msg = qs.stringify({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        categoryName: this.search.name,
        startTime: this.search.time[0],
        endTime: this.search.time[1]
      })
      return new Promise((resolve, reject) => {
        findAll(msg).then((res) => {
          let {
            data,
            code
          } = res;
          if (code == "200") {
            let new_list = data.rows.map((el, index) => {
              return {
                id: el.id,
                name: el.name,
                other_name: el.other_name,
                component_type: el.component_type,
                component_pic: el.component_pic,
                createdAt: el.createdAt
              }
            })
            this.tableData = new_list;
            this.total = data.count;
          } else {
            this.$message("获取分页失败")
          }

        })
      })


    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 批量删除
    batchDel() {
      let msg_del_before = this.multipleSelection.map((el, index) => {
        return {
          id: el.id
        }
      });
      let msg_del_after = [];
      msg_del_before.forEach((el, index) => {
        msg_del_after.push(el.id)
      });
      let msg = qs.stringify({
        batchList: msg_del_after
      });
      batchDel(msg).then((res) => {
        let {
          code
        } = res;
        if (code == "200") {
          this.findAll();

        } else {
          this.$message("批量删除失败")
        }

      })
    },
    uploadSuccess(response, file, fileList) {
      let {
        code,
        url
      } = response;
      if (code == "200") {
        this.form.component_pic = url;
      } else {
        this.$message("上传图片异常")
      }
      console.log("上传的文件夹", response);

    },
    findAllComponentType() {
      console.log("查询所有组件类别")
      return new Promise((resolve, reject) => {
        findcomponentAndType().then((res) => {
          let {
            code,
            data
          } = res;
          let new_type = [];
          if (code == "200") {


            this.componentTypes = data;


          }

        })
      })


    },
    findAll() {
      let msg = qs.stringify({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
      return new Promise((resolve, reject) => {
        findAll(msg).then((res) => {
          let {
            data,
            code
          } = res;
          if (code == "200") {
            let new_list = data.rows.map((el, index) => {
              return {
                id: el.id,
                name: el.name,
                other_name: el.other_name,
                component_type: el.component_type,
                component_pic: el.component_pic,
                createdAt: el.createdAt
              }
            })
            this.tableData = new_list;
            this.total = data.count;
          } else {
            this.$message("获取分页失败")
          }

        })
      })

    },
    handleAdd() {
      this.cleanRow();
      this.findAllComponentType();
      this.dialogVisible = true;
      this.submitState = 0;
    },
    // 进行编辑
    handleEdit(index, row) {

      this.findAllComponentType();
      this.dialogVisible = true;
      this.submitState = 1;
      let new_row = Object.assign({}, row);
      this.form.id = new_row.id;
      this.form.name = new_row.name;
      this.form.other_name = new_row.other_name;
      this.form.component_type =new_row.component_type.id;
      this.form.component_pic = new_row.component_pic;
    },
    cleanRow() {
      for (let key in this.form) {
        this.form[key] = ''
      }
    },
    // 进行删除
    handleDelete(index, row) {
      let msg_del = qs.stringify({
        id: row.id
      });
      del(msg_del).then((res) => {
        let {
          code
        } = res;
        if (code == "200") {
          this.dialogVisible = false;
          // 刷新表格
          this.findAll();
        } else {
          this.messages("删除失败")
        }

      })

    },
    // 当前页发生改变
    handleCurrentChange() {

    },
    submit() {
      switch (this.submitState) {
        case 0:
          console.log("开始")

          let msg_create = qs.stringify({
            name: this.form.name,
            other_name: this.form.other_name,
            component_type_id: this.form.component_type,
            component_pic: this.form.component_pic,

          });
          create(msg_create).then((res) => {
            let {
              articleType,
              code
            } = res;
            if (code == "200") {
              this.dialogVisible = false;
              // 刷新表格
              this.findAll();
            } else {
              this.messages("新增失败")
            }

          })
          break;
        case 1:

          let msg_update = qs.stringify({
            id: this.form.id,
            name: this.form.name,
            other_name: this.form.other_name,
            component_type_id: this.form.component_type,
            component_pic: this.form.component_pic,
          });
          update(msg_update).then((res) => {
            let {
              articleType,
              code
            } = res;
            if (code == "200") {
              this.dialogVisible = false;
              // 刷新表格
              this.findAll();
            } else {
              this.messages("修改失败")
            }

          })
          break;
        default:
          this.$message("操作异常")

      }

    },
    handleClose() {
      this.dialogVisible = false;
    },
    currentChange(page) {
      this.currentPage = page;
      this.findAll();
    }
  }
  }

</script>

<style lang="scss">
/* required class */
.my-editor {
 background: #2d2d2d;
 color: #ccc;
 
 font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
 font-size: 14px;
 line-height: 1.5;
 padding: 5px;
}
 
/* optional */
.prism-editor__textarea:focus {
 outline: none;
}
 
/* not required: */
.height-300 {
 height: 300px;
}
</style>
<style lang="scss" scoped>
  .table-wrap {
    width: 100%;
    padding: 90px 60px;
    color: #555555;
    background-color: #fff;

    .table-handle-btns {
      width: 100%;
      height: 50px;

    }

    .search {

      width: 100%;
      height: 50px;

      .demonstration {
        display: inline-block;
        width: 80px;
        height: 40px;
        margin-right: 10px;
      }

      .search-name {
        width: 240px;
      }

    }

    .table-main {
      width: 100%;

    }

    .page-nation {
      width: 100%;
      height: 50px;
      margin-top: 15px;
      text-align: center;

    }
  }

</style>
