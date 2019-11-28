import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "HomeTemplate" */ '@/templates/HomeTemplate.vue'),
      children: [{
        path: '',
        component: () => import(/* webpackChunkName: "home" */ '@/pages/Home.vue')
      }]
    },
    {
      path: '/landing-page',
      name: 'landing-page',
      component: () => import(/* webpackChunkName: "HomeTemplate" */ '@/components/LandingPage.vue')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
