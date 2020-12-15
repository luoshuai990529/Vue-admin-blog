import Layout from '@/layout'

const articleRouter = {
  path: '/article',
  name: 'Article',
  component: Layout,
  children: [
    {
      path: '',
      name: 'Article',
      component: () => import('@/views/article/index.vue'),
      meta: { title: '文章管理', icon: 'form' }
    }
  ]
}

export default articleRouter
