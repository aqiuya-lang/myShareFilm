<template>
 <div>
    <div class="personal-msg">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>个人资料</span>
            <el-button @click="drawer = true" type="primary" style="float: right; padding:  5px">修改资料</el-button>
            <el-drawer
              title="请修改你的资料"
              :visible.sync="drawer"
              :direction="direction"
              :before-close="handleClose">
              <div>
                <el-form :label-position="labelPosition" label-width="50px" :model="formLabelAlign">
                  <el-form-item label="昵称">
                    <el-input v-model="formLabelAlign.changeName"></el-input>
                  </el-form-item>
                  <el-form-item label="性别">
                    <el-input v-model="formLabelAlign.changeSex"></el-input>
                  </el-form-item>
                  <el-form-item label="电话">
                    <el-input v-model="formLabelAlign.changePhone"></el-input>
                  </el-form-item>
                </el-form> 
                <el-row>
                  <el-button type="success" round @click="storge()">保存资料</el-button>
                </el-row>
              </div>
             
            </el-drawer>
        </div>
    <div class="text item" v-model="userName">
        <span>昵称：</span>
        <span>{{userName}}</span>
     </div>
      <div class="text item" v-model="userSex">
         <span>性别：</span>
         <span>{{userSex}}</span>
     </div>
      <div class="text item" v-model="userPhone">
         <span>电话：</span>
         <span>{{userPhone}}</span>
     </div>
    <div class="text item" v-model="userId">
         <span>ID：</span>
         <span>{{userId}}</span>
     </div>
    </el-card>
  </div>
 </div>
</template>

<script>
import instance from '../network/index'
export default {
    name: "Profile",
    data () {
        return {
            userName: "",
            userSex: "",
            userId: "",
            userPhone: "",
            drawer: false,
            direction: 'rtl',
            labelPosition: 'right',
        formLabelAlign: {
          changeName: '',
          changeSex: '',
          changePhone: '',
        }
        }
    },
    mounted () {
    // 初始话人员
    this.getInformation ();
  },
    methods: {
      getInformation () {
        instance
        .get('/user/preupdate')
        .then(res => {
          console.log(res)
          this.userName = res.data.userName;
          this.userSex = res.data.userSex;
          this.userPhone = res.data.userPhone
          this.userId = res.data.userId
        })
        .catch(err => {
          console.log(err)
        })


      },

       handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      storge () {
        let param = new FormData();
        param.append("userName",this.formLabelAlign.changeName);
        param.append("userSex",this.formLabelAlign.changeSex);
        param.append("userPhone",this.formLabelAlign.changePhone)
        instance
        .post('/user/update',param)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
        this.userName = this.formLabelAlign.changeName,
        this.userSex = this.formLabelAlign.changeSex,
        this.userPhone = this.formLabelAlign.changePhone
      }
    }
}
</script>

<style>
.text {
    width: 100%;
    height: 30px;
    font-size: 16px;
  }

  .item {
    margin-bottom: 18px;
  }
  .text span{
      padding: 0 30px 0 0;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
      margin: 0 auto;
      width: 100vw;
  }
</style>