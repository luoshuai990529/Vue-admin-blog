import Layout from '@/layout'

const codesRouter = {
  path: '/codes',
  component: Layout,
  children: [
    {
      path: '',
      name: 'Codes',
      component: () => import('@/views/codes/index.vue'),
      meta: { title: '作品管理', icon: 'table' }
    }
  ]
}

export default codesRouter
