<template>
  <div class='public'>
    <div class="msg-box">
      <div class="sendMsg">
      <el-input
        type="textarea"
        autosize
        placeholder="快来一起聊天吧"
        v-model="textarea1">
        </el-input>
        <el-button type="success" size="mini" plain>发送</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea1: '',
      textarea2: ''
    }
  }
}
</script>

<style>
.msg-box{
   display: flex;
  width: 50%;
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translate(-50%,0%);
  margin: 0 auto;
  width: 50%;
  height:50vh;
  border: solid 2px red;
}
.sendMsg{
  display: flex;
  width: 50%;
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%,0%);
}



</style>