import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('../components/Login.vue')
const Register = () => import('../components/Register.vue')
const Home = () => import('../components/Home.vue')
const Profile = () => import('../views/profile.vue')
const PublicRoom = () => import('../components/chatRoom.vue')
// const PrivateRoom = () => import('../views/privateRoom.vue')
const adminRegister = () => import('../components/admin/admin_reg.vue')
const adminLogin = () => import('../components/admin/admin_login.vue')
const adminAdd = () => import('../components/admin/admin_add.vue')
const joinPublicRoom = () => import('../views/joinPublicRoom.vue')
const joinPrivateRoom = () => import('../views/joinPrivateRoom.vue')
Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      redirect: '/login'
    },
   {
     path: '/login',
     component: Login
   },
   {
     path: '/register',
     component: Register
   },
   {
     path: '/home',
     component: Home
   },
   {
     path: '/profile',
     component: Profile
   },
   {
     path: '/publicRoom',
     component: PublicRoom
   },
   {
     path: '/admin_reg',
     component: adminRegister
   },
   {
     path: '/admin_login',
     component: adminLogin
   },
   {
     path: '/admin_add',
     component: adminAdd
   },
   {
     path: '/joinPublicRoom',
     component: joinPublicRoom
   },
   {
     path: '/joinPrivateRoom',
     component: joinPrivateRoom
   }
]


const router = new VueRouter({
  routes
})

//导航守卫
//使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login' || to.path === '/register' || to.path === '/admin_login' || to.path === 'admin_reg') {
//     next();
//   } else {
//     let token = localStorage.getItem('Authorization');
//     if (token === null || token === '') {
//       next('/login');
//     } else {
//       next();
//     }
//   }
// })

export default router
