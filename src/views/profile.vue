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
                  <el-form-item label="年龄">
                    <el-input v-model="formLabelAlign.changeAge"></el-input>
                  </el-form-item>
                  <el-form-item label="地区">
                    <el-input v-model="formLabelAlign.changeArea"></el-input>
                   </el-form-item>
                </el-form> 

                <el-row>
                  <el-button type="success" round @click="storge()">保存资料</el-button>
                </el-row>
              </div>
             
            </el-drawer>
        </div>
    <div class="text item" v-model="username">
        <span>昵称：</span>
        <span>{{username}}</span>
     </div>
      <div class="text item" v-model="sex">
         <span>性别：</span>
         <span>{{sex}}</span>
     </div>
      <div class="text item" v-model="age">
         <span>年龄：</span>
         <span>{{age}}</span>
     </div>
    <div class="text item" v-model="area">
         <span>地区：</span>
         <span>{{area}}</span>
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
            username: "",
            sex: "",
            age: "",
            area: "",
            drawer: false,
            direction: 'rtl',
            labelPosition: 'right',
        formLabelAlign: {
          changeName: '',
          changeSex: '',
          changeAge: '',
          changeArea: ''
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
        .get('/user/preupdate',)


      },

       handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      storge () {
        this.username = this.formLabelAlign.changeName,
        this.sex = this.formLabelAlign.changeSex,
        this.age = this.formLabelAlign.changeAge,
        this.area = this.formLabelAlign.changeArea
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