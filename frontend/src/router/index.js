import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Main from '../views/main.vue'
import albumPhotos from '../views/albumPhotos.vue'
import searchResultPage from '../views/searchResultPage.vue'
import addAlbum from '../views/addAlbum.vue'

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
    path : '/search',
    name : 'Search page',
    component : searchResultPage
  },
  {
    path : '/:user',
    name : 'Main Page',
    component : Main
  },
  {
    path : '/:user/add-album',
    name : 'Add Album',
    component : addAlbum
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
