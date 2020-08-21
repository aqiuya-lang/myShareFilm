<template>
  <div class="login-container">
      <div class="login-box">
        <h2 class="theme">Share FILM</h2>
        

          <!-- admin注册页面入口 -->
        <el-button type="warning" round size="small" round class="go-reg" @click="goRegister">没有账号，去注册</el-button>

       <!-- admin登录表单区域 -->
       <el-form label-width='80px' class="login-form" :model="loginForm" :rules="loginRules" ref="ruleForm" >

           <!-- 管理员ID -->
            <el-form-item label="管理员ID" prop="userId">
                <el-input placeholder="请输入您的用户ID" v-model="loginForm.userId"></el-input>
            </el-form-item>

            <!-- admin密码 -->
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
import instance from '../../network/index'
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
              //表单验证规则
            loginRules : {
              userId: [
                 { required: true, message: '请输入用户名', trigger: 'blur' },
                 { min: 3,  trigger: 'blur' }
              ],
              userPwd: [
                 { required: true, message: '请输入密码', trigger: 'blur' },
                 { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
            ]        
            }
        }
    },

    methods: {
        ...mapMutations(['changeLogin']),
        //进行重置
        resetForm(formName) {
        this.$refs[formName].resetFields();
        },

        //1597847126066
        //aqiuiya
        loginCheck(adminId,adminPwd){
            //请求参数以 form-data 形式发送
            let adminID = Number(adminId);
            let param = new FormData();
            param.append('adminId',adminID);
            param.append('adminPwd',adminPwd);

            //发送请求
            instance.post('/admin/login',param)
            .then(res => {
                console.log(res);
                if(res.message == "管理员登陆成功"){
                    alert("管理员登陆成功")
                    this.changeLogin({Authorization: res.token})
                    this.$store.commit('setAdminId',adminID)
                    console.log(localStorage.getItem('Authorization'))
                    this.$router.replace('/admin_add')
                }else {
                    alert('用户名不存在或者密码错误');
                }
            })
            .catch(err => {
                console.log(err)
            })
        },

        goRegister () {
            this.$router.push('/admin_reg')
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
    bottom: 8%;
    right: 2%;
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