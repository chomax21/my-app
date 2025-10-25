import { createMemoryHistory, createWebHistory, createRouter } from 'vue-router'

import Home from '../Home.vue'
import About from '../About.vue'
import Jobs from '../Jobs.vue'
import CreateUser from '../CreateUser.vue'
import CreateJob from '../CreateJob.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/about', name: 'about', component: About },
  { path: '/jobs', name: 'jobs', component: Jobs },
  { path: '/create-user', name: 'create-user', component: CreateUser },
  { path: '/create-jobs', name: 'create-job', component: CreateJob },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router