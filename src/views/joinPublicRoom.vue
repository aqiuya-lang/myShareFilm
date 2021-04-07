<template>
<div>
  <el-card v-if="!isEnter " class="box-card">
  <div slot="header" class="clearfix">
    <span>公共房间列表</span>
  </div>
  <div v-for="item in allPublicRoom"  class="text item">
    {{ '房间名称：' + item.roomName}}
    <el-button type="info" class="btn" size="mini" plain @click="joinThisRoom(item.roomId)">加入该房间</el-button>
  </div>
</el-card>
<div v-model="roomMsg.isHost"></div>
<div v-model="roomMsg.rooId"></div>
<div v-model="roomMsg.playingMovie"></div>
<chat-room :cIsHost="roomMsg.isHost" :cRoomId="roomMsg.roomId" :cPlayingMovie="roomMsg.playingMovie" v-if="isEnter"></chat-room>
</div>
</template>
<script>
import chatRoom from '../components/chatRoom'
import instance from '../network';
export default {
    name: 'joinPublicRoom',
    data () {
      return {
        isEnter: false,
        roomMsg: {
          isHost: false,
          roomId: '',
          playingMovie: '',
        },
        allPublicRoom:[]
      }
    },
    components: {
      chatRoom
    },
   mounted() {
      instance
            .get('/room/findAllPublic')
            .then(res => {
                console.log(res)
                console.log(res.data)
                this.allPublicRoom = res.data
            })
            .catch(err => {
                console.log(err)
            })
   },
   methods: {
     joinThisRoom (roomId) {
       console.log(roomId)
        // this.roomId = roomId;
      //  let param = new FormData();
      //  param.append('roomId',roomId)
       instance
       .post('/room/enter',{
         roomId
       })
       .then(res => {
         console.log(res)
         console.log(res.roomOwnId)
         console.log(res.userId)
         if(res.userId === res.roomOwnId){
           this.roomMsg.isHost = true
           this.roomMsg.playingMovie = res.movieSrc
           console.log(this.roomMsg.playingMovie)
           this.roomMsg.roomId = roomId
          //  this.playingMovie = res.data.movieSrc;
         } else {
           this.roomMsg.isHost = false
           this.roomMsg.playingMovie = res.movieSrc
           console.log(this.roomMsg.playingMovie)
           this.roomMsg.roomId = roomId
         }
         this.isEnter = true
        //  this.$router.push('/publicRoom')
       })
       .catch(err => {
         console.log(err)
       })
     }
   }
}
</script>

<style>
 .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
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
    width: 480px;
  }
</style>