import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../pages/HomePage'
import ProfilePage from '../pages/ProfilePage'
import PostPage from '../pages/PostPage'


Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/profiles', redirect: '/' },
    { path: '/profiles/:user_id', component: ProfilePage('read') },
    { path: '/profiles/:user_id/edit', component: ProfilePage('edit') },
    { path: '/profiles/:user_id/posts', component: PostPage('list') },
    { path: '/profiles/:user_id/posts/:post_id', component: PostPage ('read') },
    { path: '/profiles/:user_id/posts/:post_id/edit', component: PostPage ('edit') },
    { path: '/', component: PostPage('list') },
    { path: '*', redirect: '/' }
  ]
})
