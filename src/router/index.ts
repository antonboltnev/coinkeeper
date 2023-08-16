import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import AuthView from "@/views/AuthView.vue";

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from "@/firebase";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
        auth,
        (user) => {
          removeListener();
          resolve(user)
        },
        reject
    )
  })
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiredAuth)) {
    if (await getCurrentUser()) {
      next()
    } else {
      next({ name: 'Auth' })
    }
  }
  else next()
})

export default router
