export default [{
  path: '*',
  redirect: '/index'
}, {
  path: '/index',
  name: 'index',
  component: () => import( /* webpackChunkName: "home" */ '@/views/home/index.vue'),
  meta: {
    title: '首页'
  }
}];