import Vue from 'vue'
import Router from 'vue-router'

import Utils from './utils.js';
import Components from './components';

Vue.use(Router);

let routes = [].concat(Utils).concat(Components);

export default new Router({
  routes: routes
})
