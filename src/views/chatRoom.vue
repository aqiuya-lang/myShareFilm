<template>
  <div>
    <div class="movie">
      <el-dropdown>
  <span class="el-dropdown-link">
    请选择你要播放的电影<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item @click.native="check(item)" v-for="item in movieList" :key="item.movieId">{{item.movieId}}</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
  <div class="playMovie">
    <video :src="myMovie" controls width="600px" height="500px"></video>
      </div>
    </div>
    <room></room>
  </div>
 
</template>
<script>
import room from '../components/room'
import instance from '../network'
export default {
  data () {
    return {
      movieList: [],
      myMovie: '' 
    }
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
    })
  },
   methods: {
     check (item) {
       this.myMovie = 
       alert("你选择的电影是" + item.movieName)
       console.log(item.movieName)
       this.myMovie = item.movieSrc
       console.log(this.myMovie)

     }   
    }
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