<template>
  <div class="table-wrap">
    <div class="table-handle-btns">
      <el-button type="primary" @click="openDig">新增</el-button>
      <el-button @click="batchDel">删除</el-button>
      <!-- <el-button>导出</el-button> -->
    </div>

    <el-form :model="search" label-width="80px" inline>

      <el-form-item label="创建时间:">
        <el-date-picker v-model="search.time" type="daterange" range-separator="至" start-placeholder="开始日期"
          @change="searchList" format="yyyy-MM-dd" value-format="yyyy-MM-dd HH:mm:ss" end-placeholder="结束日期">
        </el-date-picker>

      </el-form-item>
      <el-form-item label="按照名称:">

        <el-input v-model="search.name" placeholder="请输入内容" class="search-name" @change="searchList"></el-input>
      </el-form-item>


    </el-form>

    <div class="table-main">

      <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="180" align="left">


        </el-table-column>
        <el-table-column label="头像" width="180" align="left">

           <template slot-scope="scope">
             <img class="user-img" :src="scope.row.avatar" alt="">
           </template>
        </el-table-column>
        <el-table-column prop="role_name" label="角色名称" align="right" :formatter="Tableformatter">
        </el-table-column>

        <el-table-column prop="createdAt" label="创建时间" align="right" :formatter="Tableformatter">
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">变更权限</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-nation">
      <el-pagination :current-page="search.currentPage" :page-size="search.pageSize" layout="total, prev, pager, next, jumper" background
        :total="search.total" @current-change="currentChange">
      </el-pagination>
    </div>



    <el-dialog title="操作" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="姓名:" prop="username">
          <el-input v-model="form.username" placeholder="请输入内容" :disabled="this.form.id!=null"></el-input>
        </el-form-item>

        <el-form-item label="密码:" prop="password">
          <el-input v-model="form.password" placeholder="请输入内容" :disabled="this.form.id!=null"></el-input>
        </el-form-item>

        <el-form-item label="头像:" prop="fileList">

          <el-upload class="upload-demo" :action="upLoadUrl"
            :headers="rquestToken"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :limit="1"
            :file-list="form.fileList"

            >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>



        </el-form-item>




        <el-form-item label="角色:" prop="role_id">
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
  } from "@/api/user.js";
  import qs from 'query-string';
  export default {
    name:"User",
    data() {
      return {
        search: {
          time: [],
          name: "",
          total:0,
          currentPage:1,
          pageSize:10
          
        },
        multipleSelection: [],
        roles: [],
        form: {
          id:null,
          username: "",
          password: "",
          role_id: "",
          avatar:null,
          fileList:[]
        },
        rules:{
          username:[
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          role_id:[
            { required: true, message: '未选择角色', trigger: 'change' }
          ],
          fileList:[
            { required: true, message: '没有选择图片', trigger: 'change' }
          ],
        },
        tableData: [],
        dialogVisible: false,
        rquestToken:{
          Authorization:'Bearer '+ this.$store.state.user.token
        }
      }
    },
    computed:{
      upLoadUrl(){
        return process.env.VUE_APP_BASE_API + '/user/upload'
      }

    },
    
    mounted() {
      this.search.currentPage=1;
      this.searchList();
     
      
    },
    methods: {

      handleRemove(){

      },
      handleSuccess(res){
      

        this.form.avatar=res.url

       

      },
      // 构建表格提示标签

      Tableformatter(row, column, cellValue, index) {
        if (cellValue == "" || cellValue == null || cellValue == undefined) {
          return "字段为空值"
        } else {
          return cellValue
        }
      },
      // 按照固定条件搜索
      searchList() {

        let msg = qs.stringify({
          currentPage: this.search.currentPage,
          pageSize: this.search.pageSize,
          username: this.search.name,
          startTime: this.search.time[0],
          endTime: this.search.time[1]
        });



        findAll(msg).then((res) => {
            let {
              data,
              code
            } = res;
            if (code == "200") {
              let new_list = data.rows.map((el, index) => {
                return {
                  id: el.id,
                  username: el.username,
                  avatar: el.avatar,
                  password:el.password,
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
    
      openDig() {
        this.dialogVisible=true;


        this.form={
            id:null,
          username: "",
          password: "",
          role_id: "",
          avatar:null,
          fileList:[]
        };

        this.findAllRole();
      

      },
      // 进行编辑
      handleEdit(row) {
        
        row['fileList']=[{
          url:row.avatar,
          name:row.avatar
        }];
        
        this.dialogVisible = true;
        this.findAllRole();
        
        let new_row = Object.assign({}, row);

        
        this.form=new_row;
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

          this.$refs['form'].validate((valid) => {

            if(this.form.id){

                     let msg_updata = qs.stringify({
              id: this.form.id,
               username: this.form.username,
  
              role_id: this.form.role_id,
              avatar:this.form.avatar
            });
            update(msg_updata).then((res) => {
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

           

            }else{

            let msg_create = qs.stringify({
              username: this.form.username,
              password: this.form.password,
              role_id: this.form.role_id,
              avatar:this.form.avatar
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

            }

            console.log("校验的值",valid)

          })
      

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
    padding: 30px 40px;
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
      .user-img{
        width: 50px;
        height: 50px;
      }

    }

    .page-nation {
      width: 100%;
      height: 50px;
      margin-top: 15px;
      text-align: center;

    }
  }

</style>
