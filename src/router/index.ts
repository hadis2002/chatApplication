import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router';
import login from '../views/login.vue';
import home from '../views/home.vue'
import profile from '../views/profile.vue';

const routes = [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
