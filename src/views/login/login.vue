<template>
  <div class="login-container">
    <div class="web-about">
      <div class="web-msg">
        <h2>大数据可视化系统</h2>
        <span>返回主页</span>
      </div>
    </div>
    <div class="login-wrap">
      <div class="reg">

        <div class="login">
          <div class="login-des">
            <span>
              密码登录
            </span>
            <br>

          </div>
          <div class="login-inputs">
            <div class="user">
              <span><i class="el-icon-user" /></span>
              <input v-model="loginForm.username" type="text" placeholder="用户名">
            </div>
            <div class="password">
              <span><i class="el-icon-lock" /></span>
              <input v-model="loginForm.password" :type="passwordType" placeholder="密码" @keyup.enter="handleLogin">

              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>

            </div>
            <span class="error-msg">{{ errorMsg }}</span>

          </div>

          <div class="login-btn" @click="handleLogin">
            登录<span v-show="loading==true">...</span>
          </div>
        </div>

      </div>

    </div>
    <div class="about-link">
      <div class="some-link">
        <ul>
          <li><span>大数据</span><span>|</span><span>大数据组件</span><span>|</span><span>作者简介</span></li>

          <li><span /></li>

        </ul>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: 'hsh',
        password: 'yjh123456'
      },
      passwordType: 'password',
      loading: false,
      errorMsg: '',
      showDialog: false

    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }

  },
  methods: {

    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      if (this.loginForm.username != '' || this.loginForm.password != '') {
        this.loading = true
        this.$store.dispatch('user/login', this.loginForm).then((error) => {
          console.log('进入跳转')
          this.loading = false
          this.$router.push({
            path: '/'
          })
          this.$store.dispatch('user/getInfo')
        }).catch(() => {
          this.loading = false
        })
      } else {
        this.$message('用户名或者密码不能为空')
      }
    }
  }
}

</script>

<style lang="scss" scoped>
  .login-container {
    height: 100%;
    width: 100%;

    background-position: center;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;

    .web-about {
      width: 100%;
      height: 90px;
      background-color: #fff;

      .web-msg {
        width: 1050px;
        height: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        span {
          font-size: 12px;
          color: #555555;
        }
      }

    }

    .about-link {
      width: 100%;
      min-height: 100px;

      .some-link {
        width: 1050px;
        margin: 60px auto;

        ul {
          padding-left: 0px;
          list-style: none;

          li {
            width: 100%;
            font-size: 14px;
            color: #555555;
            font-weight: 500;
            font-size: 12px;

            span {
              margin-right: 15px;
            }
          }

          li:first-of-type {
            display: inline-block;
            margin: 10px auto;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            height: 40px;
            line-height: 40px;
            font-size: 14px;

          }
        }

      }

    }

    .login-wrap {

      width: 100%;
      height: 600px;
      background-image: url('../../../public/login/login_bg.jpg');
      background-size: 100% 600px;

      .reg {
        width: 1050px;
        height: 600px;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;

        .login {

          width: 350px;
          height: 350px;
          background-color: #ffffff;
          border-radius: 2px;
          padding: 20px 20px 50px 20px;
          display: flex;
          flex-direction: column;
          opacity: 0.94;

          .error-msg {
            font-size: 12px;
            color: #C71D24;
            margin-left: 10px;
          }

          .remember-password {
            padding-left: 40px;
            font-size: 12px;
            margin-bottom: 30px;

          }

          .login-des {
            margin-bottom: 30px;
            font-size: 24px;
          }

          .login-inputs {
            width: 100%;
            height: 150px;
            display: flex;
            flex-direction: column;
            margin-top: 10px;

            .user {
              width: 100%;
              height: 40px;
              margin-bottom: 40px;
              border: 1px solid #efefef;
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;

              input {
                width: calc(100% - 80px);
                height: 38px;
                border: 0px;
                outline: 0px;
              }

              span {
                display: inline-flex;
                justify-content: center;
                align-items: center;
                width: 40px;
                height: 38px;
              }

            }

            .password {
              width: 100%;
              height: 40px;
              margin-bottom: 40px;
              border: 1px solid #efefef;
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;

              input {
                width: calc(100% - 80px);
                height: 38px;
                border: 0px;
                outline: 0px;
              }

              span {
                display: inline-flex;
                justify-content: center;
                align-items: center;
                width: 40px;
                height: 38px;
              }

              .show-pwd {
                width: 40px;
                height: 40px;

              }
            }

          }

          .login-btn {
            width: 60%;
            height: 40px;
            line-height: 40px;
            font-size: 20px;
            text-align: center;
            color: #fff;
            margin: 0 auto;
            margin-top: 15px;
            background-color: #4452d5;
            border-radius: 5px;
            cursor: pointer;
          }

        }
      }

    }
  }

</style>
