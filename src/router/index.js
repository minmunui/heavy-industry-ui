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
      path: '/detail/:fileName',
      name: 'detail',
      component: () => import('@/views/detail/DetailView.vue'),
      props: true
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('@/views/setting/SettingView.vue')
    }
  ],
})

export default router
