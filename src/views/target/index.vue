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
        @selection-change="handleSelectionChange" @expand-change="expandChange">

        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" class="demo-table-expand">

              <el-form-item label="数据源类型">
                <span>{{expand_table.source_type}}</span>
              </el-form-item>
              <el-form-item label="执行语句">
                <span>{{expand_table.sql_order}}</span>
              </el-form-item>



              <el-form-item label="表头">
                <span>{{expand_table.source_table}}</span>
              </el-form-item>

              <el-form-item label="结果集">
                <span>{{expand_table.content}}</span>
              </el-form-item>

            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="title" label="指标名称" width="180" align="left">
        </el-table-column>

        <el-table-column prop="target_type.title" label="指标类别" width="180" align="left">
        </el-table-column>

        <el-table-column prop="sql_order" label="sql语句" width="180" align="left">
        </el-table-column>
        <el-table-column prop="source_mysql.title" label="数据源名称" align="right" :formatter="Tableformatter">
        </el-table-column>


        <el-table-column prop="content" label="实时数据(结果集)" align="right" :formatter="TablePassFormatter">


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

    <el-dialog title="操作" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="角色:">
          <el-select v-model="form.role_id" placeholder="请选择">
            <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="操作" :visible.sync="dialogVisible_add" width="30%" :before-close="handleClose">
      <el-form ref="form_add" :model="form_add" label-width="80px">
        <el-form-item label="姓名:">
          <el-input v-model="form_add.userName" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="密码:">
          <el-input v-model="form_add.password" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="角色:">
          <el-select v-model="form_add.role_id" placeholder="请选择">
            <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
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
    findAllRole
  } from "@/api/target.js";

  import {
    findOne
  } from "@/api/sourceType.js";

  import Query from "@/utils/sourceQuery.js";


  import qs from 'query-string';
  export default {
    data() {
      return {
        search: {
          time: "",
          name: ""
        },
        multipleSelection: [],
        roles: [],
        form: {
          id: "",
          role_id: ""
        },
        form_add: {
          userName: "",
          password: "",
          role_id: ""
        },
        expand_table: {
          source_type: null,
          sql_order: null,
          source_table: null,
          content: null,

        },
        // 0代表新增操作,1代码修改操作
        submitState: 0,
        tableData: [{}],
        currentPage: 1,
        pageSize: 10,
        categoryName: "",
        total: 400,
        dialogVisible: false,
        dialogVisible_add: false

      }
    },
    mounted() {
      this.findAll();
    },
    methods: {
      // 构建表格提示标签

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


      // 按照固定条件搜索
      searchList() {
        let msg = qs.stringify({
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          userName: this.search.name,
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
                  userName: el.userName,
                  avatar: el.avatar,
                  role_id: el.role_id,
                  role_name: el.role.name,
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
      // 获取所有角色
      findAllRole() {
        return new Promise((resolve, reject) => {

          findAllRole().then((res) => {
            let {
              data,
              code
            } = res;
            if (code == "200") {
              this.roles = data
            }
          })

        })


      },
      // 多选操作
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      // 查询结果集
     async query_source(row) {
        let source_type, source_config, sql_order;
        source_config = row.source;
        sql_order = row.sql_order;
        let source_type_id = qs.stringify({
          id: row.source.source_type_id
        });
        return new Promise((resolve, reject) => {
          findOne(source_type_id).then((res) => {
            let {
              code,
              data
            } = res;
            if (code == "200") {
              source_type = data.catename;
              let query = new Query(source_type, source_config, sql_order);
              let query_reslut = query.conect_source();
              resolve(query_reslut)
            } else {
              this.$message("查询数据库类型失败")
            }
          });


        });



      },
      // 表格展开
     async expandChange(row) {
      let result= await this.query_source(row);

      console.log("结果执行了",result)
        










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
                  title: el.title,
                  sql_order: el.sql_order,
                  content: el.content,
                  target_type: el.target_type,
                  source: el.source_mysql,
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
        this.findAllRole();
        this.dialogVisible_add = true;
        this.submitState = 0;

      },
      // 进行编辑
      handleEdit(index, row) {
        this.dialogVisible = true;
        this.findAllRole();
        this.submitState = 1;
        let new_row = Object.assign({}, row);
        this.form.id = new_row.id;
        this.form.role_id = new_row.role_id;
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
            let msg_create = qs.stringify({
              userName: this.form_add.userName,
              password: this.form_add.password,
              role_id: this.form_add.role_id
            });
            create(msg_create).then((res) => {
              let {
                code
              } = res;
              if (code == "200") {
                this.dialogVisible_add = false;
                // 刷新表格
                this.findAll();
              } else {
                this.messages("创建用户失败")
              }

            })
            break;
          case 1:

            let msg_updata = qs.stringify({
              id: this.form.id,
              categoryName: this.form.categoryName,
              categoryCreater: "admin"
            });
            updata(msg_updata).then((res) => {
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
