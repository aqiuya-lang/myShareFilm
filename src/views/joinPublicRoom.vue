<template>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>公共房间列表</span>
  </div>
  <div v-for="item in allPublicRoom"  class="text item">
    {{ '房间名称：' + item.roomName}}
    <el-button type="info" class="btn" size="mini" plain @click="joinThisRoom(item.roomId)">加入该房间</el-button>

  </div>
</el-card>
  
</template>item
item.roomName
<script>
import instance from '../network';
export default {
    name: 'joinPublicRoom',
    data () {
      return {
        allPublicRoom:[]
      }
    },
   mounted() {
      instance
            .get('/room/findAll')
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
       let param = new FormData();
       param.append('roomId',roomId)
       instance
       .post('/room/enter',param)
       .then(res => {
         console.log(res)
         console.log(roomId)
         this.$router.push('/publicRoom')
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