<template>
  <div class="register-container">
    <div class="register-box">
      <h2 class="theme">Share FILM</h2>

      <!-- 登录页面入口 -->
      <el-button type="warning" round size="small" class="go-reg" @click="goLogin">去登录</el-button>

      <!-- 注册表单区域 -->
      <el-form
        label-width="80px"
        class="register-form"
        :model="registerForm"
        :rules="registerRules"
        ref="ruleForm"
      >
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="请输入您的用户名" v-model="registerForm.username"></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入您的密码" type="password" v-model="registerForm.password"></el-input>
        </el-form-item>

        <!-- 手机号 -->
        <el-form-item label="手机号" prop="phone">
          <el-input placeholder="请输入您的号码" v-model="registerForm.phone"></el-input>
        </el-form-item>

        <!-- 按钮区域 -->
        <el-row class="btn">
          <el-button
            type="primary"
            @click="sendRegister(registerForm.username,registerForm.password,registerForm.phone)"
            size="small"
          >注册</el-button>
          <el-button type="info" @click="resetForm('ruleForm')" size="small">重置</el-button>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import instance from '../network/index'

export default {
  name: "Register",
  data() {
    return {
       
      //登录表单绑定的数据
      registerForm: {
        username: "",
        password: "",
        phone: "",
      },
      //表单验证规则
      registerRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, trigger: "blur" },
        ],
      },
    };
  },


  methods: {
    goLogin() {
      this.$router.push("/login");
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    sendRegister(username,password, phone) {
      const num = (Date.now && Date.now()) || new Date().getTime();
      const userId = Number(num);
      instance
        .post("/user/reg", {
          userName: username,
          userId: userId,
          userPwd: password,
          userPhone: Number(phone),
          userSex: '女'
        })
        .then((res) => {
          console.log(res);
          alert("注册成功,你的用户ID为");
          alert(userId);  
          this.$store.commit('setUserName',username);
          this.$store.commit('setUserPhone',phone);
          this.$store.commit('setUserId',userId);
          console.log(localStorage.getItem('userName'));
          console.log(localStorage.getItem('userId'));
          console.log(localStorage.getItem('userPhone'));
          this.$router.push("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.theme {
  margin-top: 20px;
  margin-bottom: 30px;
  text-align: center;
}
.go-reg {
  position: absolute;
  bottom: 4%;
  right: 40%;
 
}
.register-container {
  width: 100%;
  height: 100vh;
  background-color: #2b4b6b;
}
.register-box {
  width: 480px;
  height: 370px;
  background-color: #ffffff;
  border-radius: 4px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.register-form {
  position: absolute;
  left: 50%;
  transform: translate(-60%, 0);
}
.btn {
  margin-top: 0px;
  margin-left: 90px;
}
</style>