import Home from './components/Auth/Home.vue';
import Profile from './components/Profile/Profile.vue';
import Collection from './components/Profile/Profile.vue';
import store from './State/store.js';

export const routes = [
    { 
        path: '', 
        name: 'home',
        component: Home,
        beforeEnter: dissallowAuth    
    },
    { 
        path: '/profile',
        name: 'profile',
        component: Profile,
        beforeEnter: requireAuth    
    }
];

function dissallowAuth(to, from, next) {
    store.dispatch('validateJwt').then(res => {
        next('/profile');
    }).catch(() => {
        next()
    })
}

function requireAuth(to, from, next) {
    store.dispatch('validateJwt').then(res => {
        next();
    }).catch(() => {
        next('/')
    })
}