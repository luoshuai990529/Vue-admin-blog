import Layout from '@/layout'

const commentRouter = {
  path: '/comment',
  component: Layout,
  children: [
    {
      path: '',
      name: 'Comment',
      component: () => import('@/views/comment/index.vue'),
      meta: { title: '评论管理', icon: 'user' }
    }
  ]
}

export default commentRouter
