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
        <el-table-column prop="title" label="数据源名称" align="left">
        </el-table-column>
        <el-table-column prop="source_type.catename" label="数据源类别" align="left">
        </el-table-column>
        <el-table-column prop="sql_user" label="数据库账号" align="left">
        </el-table-column>



        <el-table-column prop="sql_pass" label="数据库密码" align="left" :formatter="TablePassFormatter">
        </el-table-column>

        <el-table-column prop="host" label="数据库连接地址" align="right">
        </el-table-column>

        <el-table-column prop="port" label="数据库端口" align="right">
        </el-table-column>

        <el-table-column prop="time_zone" label="数据库时区" align="right">
        </el-table-column>

        <el-table-column prop="createdAt" label="创建时间" align="right">
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

    <el-dialog title="操作" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="数据源名称:">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="数据源类型:">
          <el-radio-group v-model="form.enter">
            <el-radio :label="1">数据库</el-radio>
            <!-- <el-radio :label="2">接口</el-radio>
            <el-radio :label="3">excel导入</el-radio> -->
          </el-radio-group>
        </el-form-item>

        <el-form-item label="数据库类别:">

          <el-select v-model="form.source_type_id" placeholder="请选择">
            <el-option v-for="item in sourceType" :key="item.id" :label="item.catename" :value="item.id">
            </el-option>
          </el-select>

        </el-form-item>

        <el-form-item label="用户名:">
          <el-input v-model="form.sql_user"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="form.sql_pass"></el-input>
        </el-form-item>
        <el-form-item label="数据库地址:">
          <el-input v-model="form.host"></el-input>
        </el-form-item>
        <el-form-item label="端口:">
          <el-input v-model="form.port"></el-input>
        </el-form-item>
        <el-form-item label="时区:">
          <el-input v-model="form.time_zone"></el-input>
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
    batchDel
  } from "@/api/source.js";
  import {
    findAllSoureType
  } from "@/api/sourceType.js";
  import qs from 'query-string';
  export default {
    data() {
      return {
        search: {
          time: "",
          name: ""
        },
        multipleSelection: [],
        form: {
          id: "",
          title: "",
          // 入口方式
          enter: 1,
          source_type_id: null,
          sql_user: "",
          sql_pass: "",
          host: "",
          port: "",
          time_zone: "",
          source_type: ""
        },
        sourceType: [],
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
    },
    methods: {

      Tableformatter(row, column, cellValue, index) {
        if (cellValue == "" || cellValue == null || cellValue == undefined) {
          return "字段为空值"
        } else {
          return cellValue
        }
      },

      TablePassFormatter(row, column, cellValue, index) {
        return "**********"
      },

      findAllSoureType() {
        return new Promise((resolve, reject) => {

          findAllSoureType().then((res) => {
            let {
              code,
              data
            } = res;
            if (code == "200") {
              this.sourceType = data

            } else {
              this.$message("查询失败")
            }

          })

        })

      },
      // 按照固定条件搜索
      searchList() {

        let msg = qs.stringify({
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          title: this.search.name

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
                  title: el.title,
                   source_type_id:el.source_type_id,
                  sql_user: el.sql_user,
                  sql_pass: el.sql_pass,
                  host: el.host,
                  port: el.port,
                  time_zone: el.time_zone,
                  source_type: el.source_type

                }
              })
              this.tableData = new_list;
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
      findAll() {
        let msg = qs.stringify({
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          catename: this.categoryName
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
                  title: el.title,
                  source_type_id:el.source_type_id,
                  sql_user: el.sql_user,
                  sql_pass: el.sql_pass,
                  host: el.host,
                  port: el.port,
                  time_zone: el.time_zone,
                  source_type: el.source_type
                }
              })
              this.tableData = new_list;
            } else {
              this.$message("获取分页失败")
            }

          })
        })

      },
      handleAdd() {
        this.cleanRow();
        this.findAllSoureType();
        this.dialogVisible = true;
        this.submitState = 0;
      },
      // 进行编辑
      handleEdit(index, row) {
        this.findAllSoureType();
        this.dialogVisible = true;
        this.submitState = 1;
        let new_row = Object.assign({}, row);
        this.form.id = new_row.id;

        

        this.form.title = new_row.title;
        this.form.source_type_id = new_row.source_type_id;
        this.form.sql_user = new_row.sql_user;
        this.form.sql_pass = new_row.sql_pass;
        this.form.host = new_row.host;
        this.form.port = new_row.host;
        this.form.time_zone = new_row.time_zone;
        this.form.source_type = new_row.time_zone

      },
      cleanRow() {
        for (let key in this.form) {
          if (key != "enter") {
            this.form[key] = ''
          }

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
              title: this.form.title,
              source_type_id:this.form.source_type_id,
              sql_user: this.form.sql_user,
              sql_pass: this.form.sql_pass,
              host: this.form.host,
              port: this.form.port,
              time_zone: this.form.time_zone,
              source_type: this.form.source_type
            });
            create(msg_create).then((res) => {
              let {

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
              title: this.form.title,
              source_type_id:this.form.source_type_id,
              sql_user: this.form.sql_user,
              sql_pass: this.form.sql_pass,
              host: this.form.host,
              port: this.form.port,
              time_zone: this.form.time_zone,
              source_type: this.form.source_type
            });
            update(msg_update).then((res) => {
              let {

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
