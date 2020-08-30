<template>
  <div class="login-container">
      <div class="login-box">
        <h2 class="theme">Share FILM</h2>
        

          <!-- 注册页面入口 -->
        <el-button type="warning" round size="small" round class="go-reg" @click="goRegister">去注册</el-button>

       <!-- 登录表单区域 -->
       <el-form label-width='80px' class="login-form" :model="loginForm" :rules="loginRules" ref="ruleForm" >

           <!-- 用户名 -->
            <el-form-item label="用户ID" prop="userId">
                <el-input placeholder="请输入您的用户ID" v-model="loginForm.userId"></el-input>
            </el-form-item>

            <!-- 密码 -->
            <el-form-item label="密码" prop="userPwd" >
                <el-input placeholder="请输入您的密码" type="password" v-model="loginForm.userPwd"></el-input>
            </el-form-item>

              <!-- 按钮区域 -->
     <el-row class="btn">
         <el-button type="primary" @click="loginCheck(loginForm.userId,loginForm.userPwd)" size="small">登录</el-button>
         <el-button type="info"@click="resetForm('ruleForm')" size="small">重置</el-button>
          
    </el-row>
     </el-form>

   
      </div>
  </div>
</template>

<script>

import instance from '../network/index'
import { mapMutations } from 'vuex'

export default {
    name: 'Login',
    data () {
        return {
            //登录表单绑定的数据
            loginForm: {
                userId: '',
                userPwd: ''
            },
            userToken: '',
              //表单验证规则
            loginRules : {
              userId: [
                 { required: true, message: '请输入用户名', trigger: 'blur' },
                 { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ],
              userPwd: [
                 { required: true, message: '请输入密码', trigger: 'blur' },
                 { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
            ]        
            }
        }
    },
    //1597763280902
    //aqiuya

    //1598698691813
    //aqiuya
    methods: {
        ...mapMutations(['changeLogin']),
  
        resetForm(formName) {
        this.$refs[formName].resetFields();
        },
        loginCheck(userId,userPwd){
            let param = new FormData();
            param.append('userId',Number(userId));
            param.append('userPwd',userPwd);
            instance
            .post("/user/login",param)
            .then(res => {
                console.log(res);
                if(res.message == "登陆成功"){
                    alert("登录成功");
                     this.userToken = res.token;
                     //将用户 token 保存到 vuex 中
                     this.changeLogin({Authorization: this.userToken})
                     this.$store.commit('setUserId',userId);
                    
                     console.log(localStorage.getItem('userId'));
                     console.log(userId);
                     console.log(res.token)
                    this.$router.replace('/home')
                }else {
                    alert('用户名不存在或者密码错误');
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        goRegister () {
            this.$router.push('/register')
        }
    },

  

}
</script>

<style>
.theme{
    margin-top: 20px;
    margin-bottom: 50px;
    text-align: center;
}
.go-reg{
    position: absolute;
    bottom: 2%;
    right: 40%;
}
.login-container{
    width: 100%;
    height: 100vh;
    background-color: #2b4b6b;
}
.login-box{
    width: 480px;
    height: 330px;
    background-color: #ffffff;
    border-radius: 4px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.login-form{
 position: absolute;
 left: 50%;
 transform: translate(-60%, 0);
}
.btn{
    margin-left: 90px;
}
</style>