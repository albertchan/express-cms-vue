import Vue from 'vue'
import Router from 'vue-router'
import BrowsePosts from '../pages/BrowsePosts'
import HomePage from '../pages/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/posts', component: BrowsePosts },
    { path: '/', component: HomePage }
  ]
})
