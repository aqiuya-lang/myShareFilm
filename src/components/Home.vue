<template>
<div class="box">
    <div v-if="!isJoin" v-model="myRoomId">
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
                <el-button type="info" round @click="lookAllPrivateRoom">查看所有私人房间</el-button>
                <el-form ref="form" :model="joinPrivateRoom" label-width="80px">
                 <el-form-item label="房间ID">
                        <el-input v-model="joinPrivateRoom.roomId"></el-input>
                    </el-form-item>
                    <el-form-item label="房间密码">
                        <el-input v-model="joinPrivateRoom.roomPwd"></el-input>
                    </el-form-item>
                    <el-button type="info" class="btn" round size="mini" @click="privateRoom()">加入私人房间</el-button>
                </el-form>
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
    <chat-room v-if="isJoin" :cRoomId="myRoomId"></chat-room>
  
</div>
</template>
<script>
import chatRoom from '../components/chatRoom'
import instance from '../network';
export default {
    name:'Home',
    components: {
        chatRoom
    },
    data () {
        return {
            isJoin: false,
            myRoomId: '',
            
            publicForm: {
                roomName: '',
                roomPwd:'',
            },
            privateForm: {
                roomName: '',
                roomPwd: ''
            },
            joinPrivateRoom: {
                roomId: '',
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
      mounted () {
    // 初始话人员
    this.getInformation ();
  },
    methods:{
        getInformation () {
        instance
            .get('/user/preupdate',)
            .then(res => {
                console.log(res.data.userName)
                this.$store.commit('setUserName',res.data.userName);
                console.log(localStorage.getItem('userName'))
            })
        },
        createPublicRoom () {
            console.log(localStorage.getItem('userId'))
           
            const roomId = Math.floor(Math.random() * (9999-1000)) + 1000
            this.myRoomId = roomId;
            console.log(this.myRoomId)
            instance
            .post('/room/build',
            {
                roomOwnId: Number(localStorage.getItem('userId')),
                roomName: this.publicForm.roomName,
                roomId: roomId,
                roomAuthority: true
            }
            ,
            {
                headers:{"Authorization":localStorage.getItem('userToken')}
            }
            )
            .then(res => {
                console.log(res)
                // this.$router.push('/publicRoom')
                 this.isJoin = true;
            })
            .catch(err => {
                console.log(err)
            })

        },
        createPrivateRoom () {
            
            const roomId = Math.floor(Math.random() * (9999-1000)) + 1000
            this.myRoomId = roomId;
            instance
            .post('/room/build',
            {
                roomOwnId: localStorage.getItem('userId'),
                roomName: this.privateForm.roomName,
                roomId: roomId,
                roomAuthority: false,
                roomPwd: this.privateForm.roomPwd
            },
            {
                headers:{"token":localStorage.getItem('userToken')}
            }
            )
            .then(res => {
                console.log(res)
                this.roomId = roomId
                this.isJoin = true;
                // this.$router.push('/publicRoom')
            })
            .catch(err => {
                console.log(err)
            })

        },
        lookAllPublicRoom () {
            this.$router.push('/joinPublicRoom')

        },
        lookAllPrivateRoom () {
            this.$router.push('/joinPrivateRoom')
        },
        privateRoom () {
            //5267
            // let param = new FormData();
            // param.append('roomId',this.joinPrivateRoom.roomId);
            // param.append('roomPwd',this.joinPrivateRoom.roomPwd);
            instance
            .post('/room/enter',{
                roomId: this.joinPrivateRoom.roomId,
                roomPwd: this.joinPrivateRoom.roomPwd

            })
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