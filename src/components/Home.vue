<template>
<div class="box">
    <div class="top">
        <h2>SHARE FILM</h2>
    </div>
    <div class="body">
        <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="创建公共房间" name="1">
                <el-form ref="form" :model="publicForm" label-width="100px">
                    <el-form-item label="房间名称">
                        <el-input v-model="publicForm.roomName"></el-input>
                    </el-form-item>
                     <el-button type="info" class="btn" round size="mini" @click="createPublicRoom()">创建房间</el-button>
                </el-form>
            </el-collapse-item>

            <el-collapse-item title="创建私人房间" name="2">
                <el-form ref="form" :model="privateForm" label-width="80px">
                    <el-form-item label="房间名称">
                        <el-input v-model="privateForm.roomName"></el-input>
                    </el-form-item>
                    <el-form-item label="房间密码">
                        <el-input v-model="privateForm.roomPwd"></el-input>
                    </el-form-item>
                     <el-button type="info" class="btn" round size="mini" @click="createPrivateRoom()">创建房间</el-button>
                </el-form>
                
            </el-collapse-item>
            <el-collapse-item title="加入公共房间" name="3">
                <el-button type="info" round @click="lookAllPublicRoom">查看所有公共房间</el-button>
            </el-collapse-item>
            <el-collapse-item title="加入私人房间" name="4">
                
            </el-collapse-item>
             <el-collapse-item title="查看个人资料" name="5">
                <div class="text item" v-model="privateProfile.userId">
                    <span>用户ID：</span>
                    <span>{{privateProfile.userId}}</span>
                </div>
                     <el-button type="info" class="btn" round size="mini" @click="checkProfile">查看更多</el-button>
                </el-form>
            </el-collapse-item>
            </el-collapse>
    </div>
    <div class="footer">
         
    </div>
</div>
</template>
<script>
import instance from '../network';
export default {
    name:'Home',
    data () {
        return {
            publicForm: {
                roomName: '',
                roomPwd:'',
            },
            privateForm: {
                roomName: '',
                roomPwd: ''
            },
            privateProfile: {
                userName: localStorage.getItem('userName'),
                userId: localStorage.getItem('userId'),
                userPhone: localStorage.getItem('userPhone')
                
            },
            activeName: '0'
        }
    },
    methods:{
        createPublicRoom () {
           const roomId = Math.floor(Math.random() * (9999-1000)) + 1000
            instance
            .post('/room/build',
            {
                userId: Number(localStorage.getItem('userId')),
                roomName: this.publicForm.roomName,
                roomId: roomId,
                roomAthority: true
            }
            ,
            {
                headers:{"Authorization":localStorage.getItem('userToken')}
            }
            )
            .then(res => {
                console.log(res)
                this.$router.push('/publicRoom')
            })
            .catch(err => {
                console.log(err)
            })

        },
        createPrivateRoom () {
            const roomID = Math.floor(Math.random() * (9999-1000)) + 1000
            instance
            .post('/room/build',
            {
                userId: localStorage.getItem('userId'),
                roomName: this.privateForm.roomName,
                roomId: roomID,
                roomAthority: 'false',
                roomPwd: this.privateForm.roomPwd
            },
            {
                headers:{"token":localStorage.getItem('userToken')}
            }
            )
            .then(res => {
                console.log(res)
                this.$router.push('/privateRoom')
            })
            .catch(err => {
                console.log(err)
            })

        },
        lookAllPublicRoom () {
            instance
            .get('/room/findAll')
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })

        },
        checkProfile() {
            this.$router.push("/profile");
        }
    }
}
</script>
<style scope>
.top{
    text-align: center;
    width:100%;
    margin-top: 25px;
    background-color: aqua;
    font-size: 30px;
    color: rgb(29, 144, 197);
}
.body{
    background-color: #ffffff;
    padding: 20px;
    width: 80%;
    margin: 0 auto;
    margin-top: 50px;
}
.btn{
    margin-left: 70%;
    margin-top: 20px;
    
}
</style>