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
    path: '/tutorial/:id',
    alias: '/tutoriais/:id',
    name: 'Tutorial',
    component: () => import('../views/Tutorial.vue')
  },
  {
    path: '/novo',
    alias: '/tutoriais',
    name: 'Novo',
    component: () => import('../views/AddTutorial.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
