import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    alias: '/tutoriais',
    name: 'TutorialList',
    component: () => import("../views/TutorialList.vue")
  },
  {
    path: '/tutoriais/:id',
    name: 'Tutorial',
    component: () => import('../views/Tutorial.vue')
  },
  {
    path: '/tutoriais/novo',
    name: 'Novo',
    component: () => import('../views/AddTutorial.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
