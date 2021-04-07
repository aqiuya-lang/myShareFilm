import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    userId: "",
    userPwd: "",
    userPhone:"",
    adminId:'',
    adminName:'',
    //存储 token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
   
  },
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization', user.Authorization);
    },
    //存储用户ID
    setUserId (state,userId) {
      state.userId = userId;
      localStorage.userId = userId
    },

    //存储 userName
    setUserName (state,userName) {
      state.userName = userName;
      localStorage.userName = userName
    },
    //存储 userPhone
    setUserPhone (state,userPhone) {
      state.userPhone = userPhone;
      localStorage.userPhone = userPhone
    },

    //存储管理员ID
    setAdminId (state,adminId) {
      state.adminId = adminId;
      localStorage.adminId = adminId
    },
   
  },
  getters: {

    // getUserToken(state) {
    //   if(!state.userToken) {
    //     state.userToken = localStorage.getItem('userToken');
    //   }
    //   return state.userToken
    // },


    // //获取 token 方法
    // //判断是否有 token ，如果没有重新赋值，返回给 state 的 token 
    // getAdminToken(state) {
    //   if (!state.adminToken) {
    //     state.adminToken = localStorage.getItem('adminToken');
    //   }
    //   return state.adminToken
    // }
  },
  actions: {
  },
  modules: {
  }
})
