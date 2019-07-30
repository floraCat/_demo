import Vue from 'vue'
import Router from 'vue-router'

import home from '@/components/home'
import flight from '@/components/flight'
import flight_index from '@/components/flight_index'
import flight_search from '@/components/flight_search'
import flight_list from '@/components/flight_list'
import flight_single from '@/components/flight_single'

import detail_terminal from '@/components/detail_terminal'
import img_list from '@/components/img_list'

/*--------------*/
import cats from '@/components/_common/_frame'

import detail_traffic_01 from '@/components/detail_traffic_01'
import detail_traffic_02 from '@/components/detail_traffic_02'
import detail_traffic_03 from '@/components/detail_traffic_03'

import detail_service_01 from '@/components/detail_service_01'
import detail_service_02 from '@/components/detail_service_02'
import detail_service_03 from '@/components/detail_service_03'
import detail_service_04 from '@/components/detail_service_04'

import detail_guide_01 from '@/components/detail_guide_01'
import detail_guide_02 from '@/components/detail_guide_02'
import detail_guide_03 from '@/components/detail_guide_03'



Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/flight',
      name: 'flight',
      component: flight
    },
    {
      path: '/flight_index',
      name: 'flight_index',
      component: flight_index
    },
    {
      path: '/flight_search',
      name: 'flight_search',
      component: flight_search
    },
    {
      path: '/flight_list',
      name: 'flight_list',
      component: flight_list
    },
    {
      path: '/flight_single',
      name: 'flight_single',
      component: flight_single
    },
    {
      path: '/detail_terminal',
      name: 'detail_terminal',
      component: detail_terminal
    },
    {
      path: '/img_list',
      name: 'img_list',
      component: img_list
    },

    {
      path: '/cats',
      name: 'cats',
      component: cats
    },
    /*-----------------*/
    {
      path: '/detail_service_01',
      name: 'detail_service_01',
      component: detail_service_01
    },
    {
      path: '/detail_service_02',
      name: 'detail_service_02',
      component: detail_service_02
    },
    {
      path: '/detail_service_03',
      name: 'detail_service_03',
      component: detail_service_03
    },
    {
      path: '/detail_service_04',
      name: 'detail_service_04',
      component: detail_service_04
    },

    {
      path: '/detail_traffic_01',
      name: 'detail_traffic_01',
      component: detail_traffic_01
    },
    {
      path: '/detail_traffic_02',
      name: 'detail_traffic_02',
      component: detail_traffic_02
    },
    {
      path: '/detail_traffic_03',
      name: 'detail_traffic_03',
      component: detail_traffic_03
    },

    {
      path: '/detail_guide_01',
      name: 'detail_guide_01',
      component: detail_guide_01
    },
    {
      path: '/detail_guide_02',
      name: 'detail_guide_02',
      component: detail_guide_02
    },
    {
      path: '/detail_guide_03',
      name: 'detail_guide_03',
      component: detail_guide_03
    },
    
  ]
})
