import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Main from '../views/main.vue'
import albumPhotos from '../views/albumPhotos.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path : '/login',
    name : 'Login',
    component : Login
  },
  {
    path : '/:user',
    name : 'Main Page',
    component : Main
  },
  {
    path : '/:user/:album',
    name : 'photos',
    component : albumPhotos
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
