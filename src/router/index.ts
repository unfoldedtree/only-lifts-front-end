import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
// import HomePage from '../views/HomePage.vue'
import Tabs from '../views/TabsComponent.vue'

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
        component: () => import('@/views/tabs/SocialComponent.vue'),
      },
      {
        path: 'talk',
        component: () => import('@/views/tabs/TalkComponent.vue'),
      },
      {
        path: 'train',
        component: () => import('@/views/tabs/TrainComponent.vue'),
      },
      {
        path: 'track',
        component: () => import('@/views/tabs/TrackComponent.vue'),
      },
      {
        path: 'settings',
        component: () => import('@/views/tabs/SettingsComponent.vue')
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
