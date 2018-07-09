import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

Vue.use(VueRouter);

import App from './App.vue';
import LogIn from './LogIn.vue';
import Accounts from './accounts/Accounts.vue';
import AccountDetail from './accounts/AccountDetail.vue';
import TransactionManager from './transactions/TransactionManager.vue';
import ExpressionWizard from './expressions/ExpressionWizard.vue';
import ReportWizard from './reports/ReportWizard.vue';
import ReportOverview from './reports/ReportOverview.vue';
import ReportView from './reports/ReportView.vue';
import QueryWizard from './queries/QueryWizard.vue';
import CategoryManager from './categories/CategoryManager.vue';
import Dashboard from './dashboard/dashboard.vue';

import 'jquery';
import 'bootstrap';
import 'bootstrap-daterangepicker';
import moment from 'moment';

var routes = [
    { path: '/accounts/:id/transactions', component: TransactionManager, props: true },
    { path: '/accounts', component: Accounts },
    { path: '/accounts/:id', component: AccountDetail, props: true },
    { path: '/categories', component: CategoryManager },
    { path: '/home', name: 'home', component: LogIn },
    { path: '/configuration', component: QueryWizard },
    { path: '/expression-wizard', component: ExpressionWizard },
    { path: '/report-wizard', component: ReportWizard },
    { path: '/report-overview', component: ReportOverview },
    { path: '/report-view/:id', name: 'report-view', component: ReportView },
    { path: '/dashboard', name: 'dashboard', component: Dashboard, props: true },
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
Vue.http.options.root = 'http://localhost:5000/api';

// interceptors
Vue.http.interceptors.push(function (request, next) {
    var token = store.getToken();
    if (token != null) {
        request.headers.set('Authorization', store.getToken());
    }
    next();
});

Vue.http.interceptors.push(function (request, next) {
    next(function (response) {
        if (response.status == 401) {
            store.setToken(null);
            router.push({ name: "home" });
        }
    });
});

Vue.http.interceptors.push(function (request, next) {
    next(function (res) {
        console.log(res);
    });
});

// filters
Vue.filter('formatDate', function (value) {
    if (value)
        return moment(String(value)).format('DD.MM YYYY');
});

Vue.filter('yearMonth', function (value) {
    if (value)
        return moment(String(value)).format('YYYY/MM');
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});