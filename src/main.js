import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

Vue.use(VueRouter);

import App from './App.vue';
import LogIn from './LogIn.vue';
import Accounts from './account/Accounts.vue';

import 'bootstrap'

var routes = [
    { path: '/accounts', component: Accounts },
    { path: '/home', component: LogIn },
    { path: '*', redirect: '/home' }
];

var router = new VueRouter({
    routes: routes
});

export const store = {
    state: {
        isAuthetnicated: false,
        token: null
    },
    setToken: function (token) {
        if (token != null) {
            this.state.isAuthetnicated = true;
            this.state.token = token
            localStorage.setItem('t', token);
        } else {
            this.state.isAuthetnicated = false;
            this.state.token = null
        }
    },
    getToken: function () {
        if (this.state.token == null)
            return null;
        return 'bearer ' + this.state.token;
    }
}

var t = localStorage.getItem('t')
if (t != null) {
    store.setToken(t);
}

Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:9020/api';
Vue.http.interceptors.push(function (request, next) {
    var token = store.getToken();
    if (token != null) {
        request.headers.set('Authorization', store.getToken());
    }
    next();
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});