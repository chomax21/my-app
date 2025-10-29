import { createMemoryHistory, createWebHistory, createRouter } from 'vue-router'

import Home from '../Home.vue'
import About from '../About.vue'
import Jobs from '../Jobs.vue'
import User from '../User.vue'
import Job from '../Job.vue'
import Error from '../Error.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/about', name: 'about', component: About },
  { path: '/jobs', name: 'jobs', component: Jobs },
  { path: '/create-user', name: 'create-user', component: User },
  { path: '/job/:id?', name: 'job', component: Job, props: true},
  { path: '/error', name: 'error', component: Error },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router