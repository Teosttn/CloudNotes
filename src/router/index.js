import { createRouter, createWebHistory } from 'vue-router'
import { messageBox } from '../utils/common'

const Home =()=> import('../views/Home/Home.vue')
const Register =()=> import('../views/Home/Register/RegisterPage.vue')
const Main =()=> import('../views/Main/MainPage.vue')
const AddNote =()=> import('../views/Main/body/ExtraPage/AddNote/AddNote.vue')
const EditNote =()=> import('../views/Main/body/ExtraPage/EditNote/EditNote.vue')
const routes= [
  {
    path:'/',
    name:Home,
    component:Home
  },
  {
    path:'/register',
    name:Register,
    component:Register
  },
  {
    path:'/main',
    name:Main,
    component:Main
  },
  {
    path:'/addNote',
    name:AddNote,
    component:AddNote,
  },
  {
    path:'/editNote',
    name:EditNote,
    component:EditNote,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


//创建路由守卫，检查是否有token
router.beforeEach((to, from) => {
  const token = localStorage.getItem('token');
  //添加判断，避免无限重定向和阻止注册
  if(!token && to.name !== Register &&to.name !== Home) {
    messageBox('请登录后再试','error')
    return {name:Home}
  }
})

export default router