import Layout from '@/layout'

const approvalRouter = {
  path: '/approval',
  name: 'Approval',
  component: Layout,
  children: [
    {
      path: '',
      name: 'Article',
      component: () => import('@/views/approval/index.vue'),
      meta: { title: '审批管理', icon: 'form' }
    }
  ]
}

export default approvalRouter
