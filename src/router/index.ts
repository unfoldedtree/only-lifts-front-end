import { createRouter, createWebHistory } from '@ionic/vue-router';
import {NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw} from 'vue-router';
// import HomePage from '../views/HomePage.vue'
import Tabs from '../views/TabsComponent.vue'
import axios from "axios";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: 'social',
      },
      {
        path: 'social',
        name: 'social',
        meta: {
          requiresAuth: true
        },
        component: () => import('@/views/tabs/SocialComponent.vue'),
      },
      {
        path: 'talk',
        name: 'talk',
        meta: {
          requiresAuth: true
        },
        component: () => import('@/views/tabs/TalkComponent.vue'),
      },
      {
        path: 'train',
        name: 'train',
        meta: {
          requiresAuth: true
        },
        component: () => import('@/views/tabs/TrainComponent.vue'),
      },
      {
        path: 'track',
        name: 'track',
        meta: {
          requiresAuth: true
        },
        component: () => import('@/views/tabs/TrackComponent.vue'),
      },
      {
        path: 'settings',
        name: 'settings',
        meta: {
          requiresAuth: true
        },
        component: () => import('@/views/tabs/SettingsComponent.vue')
      }
    ],
  },
  {
    path: '/auth',
    name: 'auth',
    redirect: '/auth/login',
    component: () => import('@/views/PassThrough.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/LoginComponent.vue'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/RegisterUserComponent.vue'),
      },
      {
        path: 'verify',
        name: 'verify',
        component: () => import('@/views/VerifyUserComponent.vue'),
      },
      {
        path: 'reset-password',
        name: 'reset-password',
        component: () => import('@/views/ResetPasswordComponent.vue')
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.meta!.requiresAuth) {
    const { data } = await axios.get('http://localhost:3000/auth/verify-session');
    if (to.name !== 'login' && !data.accessToken){
      next({ name: 'login' })
    }
    else {
      next()
    }
  }
  else {
    next()
  }
})

export default router
