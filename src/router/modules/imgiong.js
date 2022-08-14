import Layout from '@/layout'
export default {
  path: '/imgiong',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/imgiong'),
    }
  ]
}