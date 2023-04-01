import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/Home.vue')
const Page1 = () => import('../views/Pages/Page1.vue')

const routes= [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Page1',
    name: 'Page1',
    component: Page1
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
