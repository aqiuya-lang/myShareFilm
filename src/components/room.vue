<template>
  <div class='public'>
    <div class="msg-box">
      <div class="msg">
        <ul class="userMsg">

        </ul>
      </div>
     
    </div>
     <div class="sendMsg">
      <el-input
        type="textarea"
        autosize
        v-model="textarea1">
        </el-input>
        <el-button type="success" size="mini" @click="sendMsg" plain>发送</el-button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'room',
  props: {
    
  },
  data() {
    return {
      textarea1: '',
      userName: localStorage.getItem('userName') + '：'
    }
  },
  methods: {
    sendMsg () {
      let userMsg = document.getElementsByClassName('userMsg')[0];
      userMsg.innerHTML +=  '<li>' + 
            '<span class="userName" type="success">' + this.userName +'</span>' +
            '<span class="userMsgs" type="info">' + this.textarea1 + '</span>' +
          '</li>';
          this.textarea1 = '';
    }

  }
}
</script>

<style>
.msg-box{
  display: flex;
  position: absolute;
  bottom: -200px;
  left: 50%;
  transform: translate(-50%,0%);
  margin: 0 auto;
  width: 80%;
  height:30vh;
  border: solid 2px rgba(46, 221, 198, 0.63);
  border-radius: 5px;
  overflow: auto;
}
.sendMsg{
  display: flex;
  width: 80%;
  position: absolute;
  bottom: -240px;
  left: 50%;
  transform: translate(-50%,0%);
}
ul {
  text-decoration: none;
}
.userName{
  display: inline-block;
  margin: 5px;
  background: oldlace;
  border-radius: 2px;
  padding: 3px;
}
.userMsgs{
  display: inline-block;
  background: oldlace;
  border-radius: 2px;
  margin-top: 15px;
  padding: 3px;
}




</style>