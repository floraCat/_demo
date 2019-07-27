import Vue from 'vue'
import Router from 'vue-router'
import C1 from '@/components/vuex_register/C1'
import C2 from '@/components/vuex_register/C2'
import state_class from '@/components/state_class'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/vuex_register',
      name: 'C1',
      component: C1
    },
    {
      path: '/vuex_register2',
      name: 'C2',
      component: C2
    },
    {
      path: '/state_class',
      name: 'state_class',
      component: state_class
    }
  ]
})
