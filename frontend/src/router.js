import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/:mode',
            name: 'app',
            component: App,
        }
    ]
})
