import Home from './components/Auth/Home.vue';
import Profile from './components/Profile/Profile.vue';
import store from './State/store.js';

export const routes = [
    { 
        path: '/', 
        name: 'home',
        component: Home
    },
    { 
        path: '/profile',
        name: 'profile',
        component: Profile,
        beforeEnter: requireAuth
    }
];

// function dissallowAuth(to, from, next) {
//     if(store.getters.getUserAuthStatus) next(false);
//     next()
// }

function requireAuth(to, from, next) {
    store.dispatch('validateJwt').then(res => {
        console.log('yep', res);
        next();
    }).catch(() => {
        console.log('nope')
        next('/')
    })

}