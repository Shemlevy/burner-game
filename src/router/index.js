import Vue from 'vue'
import Router from 'vue-router'
import GamePage from '@/components/GamePage'
import WelcomePage from '../components/WelcomePage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'WelcomePage',
      component: WelcomePage
    },
    {
      path: '/TheQuiz',
      name: 'GamePage',
      component: GamePage
    }
  ]
})
