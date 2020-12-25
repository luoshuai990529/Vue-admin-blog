import Layout from '@/layout'

const todoRouter = {
  path: '/todo',
  name: 'Todo',
  component: Layout,
  meta: { title: '待办管理', icon: 'nested' },
  children: [
    {
      path: 'list',
      component: () => import('@/views/todo-list/index.vue'),
      meta: { title: '待办列表', icon: 'nested' }
    },
    {
      path: 'create',
      component: () => import('@/views/todo-history/index.vue'),
      meta: { title: '历史待办', icon: 'form' }
    }
  ]
}

export default todoRouter
