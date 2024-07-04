import { createRouter, createWebHistory } from 'vue-router'
import QuoteView from '../views/QuoteView.vue'

const routes = [
  {
    path: '/',
    name: 'quote',
    component: QuoteView
  },
  {
    path: '/apply',
    name: 'apply',
    component: () =>
      import(/* webpackChunkName: "apply" */ '../views/ApplyView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
