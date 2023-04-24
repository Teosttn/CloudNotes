import { createRouter, createWebHistory } from 'vue-router'

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router