import Layout from '@/layout'

const authorityRouter = {
  path: '/authority',
  name: 'Authority',
  component: Layout,
  children: [
    {
      path: '',
      name: 'Authority',
      component: () => import('@/views/authority/index.vue'),
      meta: { title: '权限管理', icon: 'password' }
    }
  ]
}

export default authorityRouter
