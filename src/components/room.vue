<template>
<!-- <div>
    <ul id="content">

    </ul>
    <input type="text" id="msg">
    <button @click="send()">发送</button>
</div> -->

 
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
// export default {
//   name: 'room',
  
//   mounted() {
//     this.creatServe();
//     var ws = new WebSocket('ws://localhost:3000');
//         var inputNode = document.getElementById('msg');
//         var ulCon = document.getElementById('content');
//         //接收信息
//         ws.onmessage = function (msg) {
//             ulCon.innerHTML += '<li>' + msg.data + '</li>'
//             console.log(msg.data)
//         }
    
//   },
 
//   data() {
//     return {
      
//     }
//   },
//   methods: {
//     creatServe() {
//       //多个终端 通过 websocet 进行通信
//       //引入 websocket server 模块

// var webSocketServer = require('websocket').server;

// //引入http模块 搭建服务器
// var http = require('http');

// var server = http.createServer();
// server.listen(3000, () => {
//     console.log('服务器搭建成功')
// })
// //存储所有终端的连接
// var clients = [];

// //创建websocet服务对象
// var wsServer = new webSocketServer({httpServer:server})

// //监听连接请求 建立连接
// //webSocketRequest 当前的请求
// wsServer.on('request', (webSocketRequest) => {
//     //当前连接 回话

//     var connection = webSocketRequest.accept(null,'accepted-origin');

//     //把连接添加到终端
//     clients.push(connection)

//     //定时向客户端发送
//     // setInterval(() => {
//     //     connection.sendUTF('hello world' + (new Date()))
//     // },1000)


//     //监听客户端发信息
//     connection.on('message', (msg) => {
//         //当前输入的是 utf8类型数据
//         if(msg.type == 'utf8') {
//             //给每一个连接发送数据
//             clients.forEach(function(item) {
//                 //发送数据
//                 item.sendUTF(msg.utf8Data)
//             })
//         }
//     })




//     connection.on('close', function (reasonCode, description) {
//         console.log("断开了一个连接")

//         //获取当前索引
//         var index = clients.indexOf(connection);
//         //删除
//         clients.splice(index,1)
//     })

// })


// //连接断开时候 触发事件


//     }
   
//   },
//   send () {
//      ws.send(inputNode.value)
//   }
// }


//连接断开时候 触发事件

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
        if(this.textarea1 === '')
        {
            alert('发送内容不能为空！')
        } else {
             let userMsg = document.getElementsByClassName('userMsg')[0];
             userMsg.innerHTML +=  '<li>' + 
            '<span class="userName" type="success">' + this.userName +'</span>' +
            '<span class="userMsgs" type="info">' + this.textarea1 + '</span>' +
             '<li>';
          this.textarea1 = '';
        }
     
    }
  },
  
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