import Home from './components/Auth/Home.vue'
import Profile from './components/Profile/Profile.vue'
import store from './State/store.js'

export const routes = [
  {
    path: '',
    name: 'home',
    component: Home,
    beforeEnter: disallowAuth
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    beforeEnter: requireAuth
  },
  {
    path: '/discover',
    name: 'discover',
    component: () => import(/* webpackChunkName: "DiscoverWatches" */ './components/DiscoverWatches.vue')
  },
  {
    path: '/watch',
    name: 'watchShare',
    component: () => import(/* webpackChunkName: "DiscoverWatches" */ './components/WatchShare.vue')
  },
  // {
  //     path: '/watch-news',
  //     name: 'watchNews',
  //     component: () => import(/* webpackChunkName: "DiscoverWatches" */ './components/WatchNews.vue')
  // },
  // {
  //     path: '/watch-news/:id',
  //     name: 'watchNewsArticle',
  //     component: () => import(/* webpackChunkName: "DiscoverWatches" */ './components/WatchNewsArticle.vue')
  // },
  {
    path: '/contact',
    name: 'contact',
    component: () => import(/* webpackChunkName: "DiscoverWatches" */ './components/ContactPage.vue')
  },
  {
    path: '/*',
    name: 'wildcard',
    component: Home,
    beforeEnter: returnHome
  }
]

function returnHome (to, from, next) {
  next('/')
}

function getJwt () {
  return localStorage.getItem('watchJwt')
}

function requireAuth (to, from, next) {
  if (!getJwt()) {
    next('/')
    return
  }
  store.dispatch('validateJwt').then(res => {
    if (res.data.isSuccess) {
      next()
      return
    }
    next('/')
  })
}

function disallowAuth (to, from, next) {
  if (!getJwt()) {
    next()
    return
  }
  store.dispatch('validateJwt').then(res => {
    if (res.data.isSuccess) {
      next('/profile')
      return
    }
    next()
  })
}
