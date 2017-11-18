import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import App from './App.vue';
import LogIn from './LogIn.vue';

import 'bootstrap'


var routes = [
  { path: '/home', component: LogIn },
  { path: '*', redirect: '/home' }
];

var router = new VueRouter({
  routes: routes
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
