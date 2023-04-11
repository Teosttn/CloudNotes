import { createRouter, createWebHistory } from 'vue-router'

const Home =()=> import('../views/Home/Home.vue')
const Register =()=> import('../views/Home/Register/RegisterPage.vue')
const Main =()=> import('../views/Main/MainPage.vue')
const Test =()=> import('../views/Main/Test/Test.vue')
const AddNote =()=> import('../views/Main/AddNote/AddNote.vue')
const EditNote =()=> import('../views/Main/EditNote/EditNote.vue')

const routes= [
  {
    path:'/',
    name:Home,
    component:Home
  },
  {
    path:'/Register',
    name:Register,
    component:Register
  },
  {
    path:'/Main',
    name:Main,
    component:Main
  },
  {
    path:'/Main/Test',
    name:Test,
    component:Test
  },
  {
    path:'/Main/AddNote',
    name:AddNote,
    component:AddNote,
  },
  {
    path:'/Main/EditNote',
    name:EditNote,
    component:EditNote,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
