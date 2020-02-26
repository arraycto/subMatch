<template>
  <div id="particlesId">
    <h1 class="title">四川工商学院科研管理系统</h1>
    <div class="login-warp">
      <el-form :model="loginForm">
        <el-form-item prop="username">
          <i class="el-icon-user"></i>
          <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <i class="el-icon-key"></i>
          <el-input v-model="loginForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="checkcode">
          <i class="el-icon-folder-checked"></i>
          <el-input 
            v-model="loginForm.checkcode" 
            placeholder="请输入验证码"
            @keydown.enter.native="login">
          </el-input>
          <span class="checkcode" @click="createCode">{{ ckcode }}</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
        <div class="login-foot">
          <a href="" class="regist">立即注册</a>
          <a href="" class="pwd">忘记密码？</a>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import particlesConfig from '@/assets/particleConfig.json'
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456',
        checkcode: ''
      },
        ckcode: '',
        rules: {
         username: [{ require: true, message: "请输入用户名", trigger: "blur"}],
         password: [{ require: true, message: "请输入密码", trigger: "blur"}],
         checkcode: [{ require: true, message: "请输入验证码", trigger: "blur"}]
        }
    }
  },
  mounted () {
    this.init();
    this.createCode();
  },
  methods: {
    init() {
      particlesJS('particlesId', particlesConfig);
    },
    login(){
      console.log('enter login');
      const notNullBox = document.querySelectorAll('el-form');//后面改
      // if(this.loginForm.checkcode != this.code) {
      //   this.$message({
      //     message: "验证码错误，请重新输入",
      //     type: "warning"
      //   });
      //   this.createCode();
      //   return false;
      // }
      if(this.loginForm.username && this.loginForm.password && this.loginForm.checkcode) {
        for (let i=0; i<notNullBox.length; i++) {
          notNullBox[i].innerHTML = '';
        }
        // this.loginForm.password = this.$sha1(this.loginForm.username + this.loginForm.password);
      } else {
        if (!this.loginForm.username) {
          notNullBox[0].innerHTML = '用户名不能为空！';
        } else if(!this.loginForm.password) {
          notNullBox[1].innerHTML = '密码不能为空！';
        } else if(!this.loginForm.checkcode) {
          notNullBox[2].innerHTML = '验证码不能为空';
        }
      }
      this.$router.replace('/home');
    },
    createCode() {//前端生成验证码
      let code = "";
      let codeLength = 4; //验证码的长度  
      let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
        'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数  
      for(let i = 0; i < codeLength; i++) { //循环操作  
        let index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）  
        code += random[index]; //根据索引取得随机数加到code上  
      }
      this.ckcode = code; //把code值赋给验证码  
    }
  }
}
</script>

<style lang="scss" scoped>
#particlesId{
  width: 100%;
  min-height: 100vh;
  display: flex;
  background-color: #000000;
  // background-color: rgb(49,143,254);
}
.particles-js-canvas-el{
  height: 100vh!important;
}
#particlesId .title{
  position: absolute;
  left: 50%;
  top: 12%;
  transform: translate(-50%, -50%);
  color: #fff;
}
.login-warp{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 50px 0;
  padding-right: 30px;
  width: 450px;
  background-color: rgba(49,143,254,.4);
  border-radius: 10px;
  box-shadow: 0px 0px 5px lavenderblush;
}
.el-button{
  width: 90%;
  margin-left: 45px;
  font-size: 14px;
  padding: 10px 0;
}
.el-icon-user, .el-icon-key, .el-icon-folder-checked{
  color: #fff;
  font-size: 35px;
  padding: 0 5px;
}
.checkcode{
  color: #fff;
}
.login-foot{
  display: flex;
  justify-content: space-between;
  margin-left: 45px;
}
.login-foot a{
  color: #fff;
  text-decoration: none;
}
</style>
<style lang="">
.el-form-item__content{
  display: flex;
  margin-bottom: 15px;
}
</style>