import login from '../pages/login'
import index from '../pages/index'
import testRedux from '../pages/testRedux'

export default [
  { path: '/', name: 'default', auth: true, component: index },
  { path: '/index', name: 'index', auth: true,  component: index },
  { path: '/login', name: 'login', component: login },
  { path: '/testRedux', name: 'testRedux', component: testRedux },
]