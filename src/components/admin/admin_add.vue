<template>
  <!-- <el-form ref="form" label-width="80px">
    <el-form-item label="管理员ID">
     <el-input v-model="adminId"></el-input>
     </el-form-item>
  <el-form-item label="电影名称">
    <el-input v-model="movieName"></el-input>
  </el-form-item>
    <input type="file" @change="getFile($event)">
   <el-button type="success" @click="upload($event)">进行上传</el-button>
  </el-form> -->

   <div>
       <!-- <el-upload class="upload-demo"
              drag
              action="123"
              :before-upload="beforeUpload"
              multiple
              ref="newupload"
              
              accept=".mp4,.flv,.mov"
             >
             <i class="el-icon-upload"></i>
             <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>     </div>
             <div class="el-upload__tip" slot="tip">请注意您只能上传.mp4 .flv .mov格式的视频文件</div>
           </el-upload>
               <el-button type="primary" @click="newSubmitForm()" class="yes-btn">确定</el-button> -->

          <el-upload
            class="upload-demo"
            drag
            action="123"
            :before-upload="beforeUpload"
            accept=".mp4,.flv,.mov"
            ref="newupload"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <el-button type="primary" class="btn" round @click="getAllMovie()">查看全部上传的电影</el-button>
          <div class="allMovie">
              
            <ul>
              <li v-for="item in allMOvie"></li>
            </ul>
          </div>
   </div>
</template>

<script>
import instance from '../../network/index'
import {newVideo} from '../../network/index'
export default {
    name: 'adminAdd',
    data () {
        return {
          allMOvie: []

        }
    },
   
     methods: {
      // newSubmitForm () {
      //  this.$refs.newupload.submit()
      // },
      beforeUpload (file) {
        console.log(file)
        const movieID = Math.floor(Math.random() * (9999-1000)) + 1000;
        console.log(movieID)
        let fd = new FormData()
        fd.append('file', file)
        fd.append('movieId',movieID)
        fd.append('adminId', localStorage.getItem('adminId'))
        // console.log(fd)
        newVideo(fd).then(res => {
          console.log(res)
        })
       return true
     },
     getAllMovie () {
        instance
      .post('movie/list')
      .then(res => {
        console.log(res)
      })
      .catch(err => 
      console.log(err))


     }

     }
    
     

}














// import Axios from 'axios';/
// import instance from '../../network/index' 
// export default {
//     name: 'adminAdd',
//     data () {
//         return {
//             file:'',
//             adminId: '',
//             movieSrc: '',
//         }
//     },
//     methods: { 
//         getFile(event) {
//             this.file = event.target.files[0];
//             console.log(this.file)
//         },
//         upload (event) {
//             event.preventDefault();
//             this.movieId++;
//             let param = new FormData();
//             param.append('file',this.file);
//             param.append('movieId',this.movieId);
//             param.append('adminId',this.adminId);
//             instance
//             .post('/movie/upload',param,{
//                 headers:{"Content-Type":"multipart/form-data", "Authorization":localStorage.getItem('adminToken')}
//             })
//             .then(res => {
//                 console.log(res)
//                 console.log(headers)
//             })
//             .catch(err => {
//                 console.log(err)
//                 console.log(this.$store.state.adminToken)
//             })

//         }

//     }

// }
</script>

<style>

.upload-demo{
    text-align: center;
    margin-top: 100px;

}
.yes-btn{
    margin-top: 50px;
    margin-left: 50%;
    transform: translate(-50%,0);
}
.el-upload__tip{
  color: #ffffff;
}
.btn{
 margin-left: 50%;
 transform: translate(-50%,0);
  margin-top: 30px;
  
}

</style>