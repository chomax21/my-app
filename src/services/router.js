import { createMemoryHistory, createRouter } from 'vue-router'

import Home from '../Home.vue'
import About from '../About.vue'
import Jobs from '../Jobs.vue'
import CreateUser from '../CreateUser.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/jobs', component: Jobs },
  { path: '/create-user', component: CreateUser },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router