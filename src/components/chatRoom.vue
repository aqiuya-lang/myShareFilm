<template>
  <div>
    <div class="movie">
      <el-dropdown>
  <span v-if="isHoster" class="el-dropdown-link">
    请选择你要播放的电影<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item @click.native="check(item)" v-for="item in movieList" :key="item.movieId">{{item.movieId}}</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
<el-button @click="closeRoom()" v-if="isHoster" type="mini">关闭该房间</el-button>
<el-button @click="outRoom()" type="mini">退出该房间</el-button>

  <div class="playMovie">
    <video :src="playingMovie" id="video-active"  controls width="600px" height="500px"></video>
      </div>
    </div>
    <div>
      <room></room>
    </div>
    
  </div>
</template>
<script>
import room from '../components/room'
import instance from '../network/index'
export default {
  name: 'chat_room',
  data () {
    return {
        myMovie: '',
        
        movieCurrentTime: '',
      movieList: [],
      isHoster: this.cIsHost,
      playingMovie: this.cPlayingMovie,
      roomID: this.cRoomId,
      masterRoomID: this.masterRoomId
    }
  },
  props: {
    cIsHost: {
      type: Boolean,
      default: true
    },
    cRoomId: {
      type: Number
    },
    cPlayingMovie: {
      type: String
    },
    masterRoomId: {
      type: Number
    },

  },
  components :{
    room
  },
  mounted () {
    instance
    .post('/movie/list')
    .then(res => {
      console.log(res);
      this.movieList = res.data
    })
    .catch(err => {
      console.log(err)
    }),
   setTimeout(() => {
     let video = document.getElementById('video-active');
  //    video.addEventListener('timeupdate',
  //    function () {
  //      this.movieCurrentTime = video.currentTime
  //      console.log(this.movieCurrentTime);
  //      let sync = new Map();
  //      sync.set(this.roomID,this.movieCurrentTime);
      //  let param = new FormData();
      //  param.append('Map<Long,Time>',sync)
  //      instance
  //      .post('/sync',param)
  //     .then(res => {
  //      console.log(res)
  //    })
  //    .catch(err => {
  //      console.log(err)
  //    })
  video.addEventListener('timeupdate',() => {
    this.movieCurrentTime = video.currentTime
    let sync = new Map();
    sync.set(this.roomID,this.movieCurrentTime);
    let param = new FormData();
    param.append('Map<Long,Time>',sync)
    instance
    .post('/sync',param)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  })

   },1000)
  },
   methods: {
      closeRoom () {
      let parma = new FormData();
      parma.append('roomId',this.roomID)
      instance
      .post('/room/delete',parma)
      .then(res => {
        console.log(res)
        alert('房主关闭了房间哟！')
        this.$router.replace('/home')
      })
      .catch(err => {
        console.log(err)
      })
    },
     check (item) {
       let param = new FormData();
       param.append('movieId',item.movieId)
       console.log(item.movieId)
       instance
       .post('/checkMovie',param)
       .then(res => {
           console.log(res);
            this.playingMovie = item.movieSrc 
            alert("你选择的电影是" + item.movieName)
            console.log(item.movieName)
       })
            //  this.myMovie = item.movieSrc 
            // alert("你选择的电影是" + item.movieName)

     },
      outRoom () {
        instance
        .post('/room/exit')
        .then(res => {
            console.log(res)
            if(res.message == 'success'){
                alert(localStorage.getItem('userId') + '退出房间')
            }
            this.$router.replace('/home')
        })
        .catch(err => {
            console.log(err)
        })
        }
    },
  }
   
</script>

<style>
.movie{
  width: 90%;
  height: 40%;
  margin-left: 10%;
  margin-top: 5px;
}
.playMovie {
  width: 90%;
  height: 200px;
}
.el-dropdown-link {
  color: #ffffff;
}
</style>