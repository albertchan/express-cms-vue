import Vue from 'vue'
import Router from 'vue-router'
import Posts from '../pages/Posts'
import Home from '../pages/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/posts', component: Posts },
    { path: '/', component: Home }
  ]
})
