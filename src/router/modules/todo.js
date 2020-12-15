import Layout from '@/layout'

const todoRouter = {
  path: '/todo',
  name: 'Todo',
  component: Layout,
  children: [
    {
      path: '',
      name: 'Todo',
      component: () => import('@/views/todo/index.vue'),
      meta: { title: '待办管理', icon: 'nested' }
    }
  ]
}

export default todoRouter
