import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('@/views/fileList/FileList.vue')
    },
    {
      path: '/detail/:fileName/:step',
      name: 'detail',
      component: () => import('@/views/detail/DetailView.vue'),
      props: true
    },
    {
      path: '/error/:fileName/:step',
      name: 'error',
      component: () => import('@/views/error/ErrorView.vue'),
      props: true
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('@/views/setting/SettingView.vue')
    },
    {
      path : '/:pathMatch(.*)*',
      name : 'not-found',
      component: () => import('@/views/error/NotFoundView.vue')
    }
  ],
})

export default router
