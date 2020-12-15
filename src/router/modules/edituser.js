import Layout from '@/layout'

const edituserRouter = {
  path: '/edituser',
  name: 'Edituser',
  component: Layout,
  children: [
    {
      path: '',
      name: 'Edituser',
      component: () => import('@/views/edituser/index.vue'),
      hidden: true,
      meta: { title: '编辑资料', icon: 'form' }
    }
  ]
}

export default edituserRouter
