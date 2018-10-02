import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const axios = require('axios'),
    LOADING = "LOADING",
    NOT_LOADING = "NOT_LOADING",
    AUTHENTICATING = "AUTHENTICATING",
    AUTH_SUCCESS = "AUTH_SUCCESS",
    AUTH_FAILURE = "AUTH_FAILURE",
    LOGOUT = "LOGOUT",
    GET_USER = "GET_USER",
    VALIDATE_JWT = "VALIDATE_JWT",
    INVALIDATE_JWT = "INVALIDATE_JWT",
    NAME_COLLECTION = "NAME_COLLECTION",
    LOAD_COLLECTION = "LOAD_COLLECTION",
    SUBMIT_WATCH = "SUBMIT_WATCH",
    SELECT_WATCH = "SELECT_WATCH",
    WATCH_ORDER_UPDATED = "WATCH_ORDER_UPDATED",
    TOGGLE_FAVORITE = "TOGGLE_FAVORITE",
    FAVORITES_COLLECTION = "FAVORITES_COLLECTION";

const state = 
{
    isLoading: false,
    isAuthorized: false,
    User: {},
    Collection: [],
    Favorites: [], //array of watch id's
    isUserLoaded: false,
    isCollectionLoaded: false,
    selectedWatch: {}
}

const mutations = 
{
    [LOADING](state) {
        state.isLoading = true;
    },

    [NOT_LOADING] (state) {
        state.isLoading = false;
    },

    [AUTH_SUCCESS] (state, user) 
    {
        state.User = user;        
        state.isAuthorized = true;
        state.isLoading = false;
        state.isUserLoaded = true;
    },

    [AUTH_FAILURE] (state) 
    {
        state.isAuthorized = false;
        state.isLoading = false;    
    },

    [LOGOUT](state) 
    {
        state.isAuthorized = false;
    },

    [VALIDATE_JWT](state) {
        state.isAuthorized = true;
    },

    [INVALIDATE_JWT](state) {
        state.isAuthorized = false;
    },

    [SUBMIT_WATCH](state, watch) {
        state.isCollectionLoaded = true;
        console.log(state.Collection)
        state.Collection.push(watch);
    },

    [LOAD_COLLECTION](state, collection) {
        state.isLoading = false;     
        state.isCollectionLoaded = true;               
        state.Collection = collection;
    },

    [SELECT_WATCH](state, watch) {
        state.selectedWatch = watch;
    },

    [WATCH_ORDER_UPDATED](state, reorderedCollection) {
        state.Collection = reorderedCollection;
    },

    [FAVORITES_COLLECTION](state, favorites) {
        if(favorites[0]) {
            let mappedFavorites = favorites.map(watch => {
                 if(watch.isCurrentFavorite == true) return watch;
             });
             state.Favorites = mappedFavorites;
        }
    },

    [TOGGLE_FAVORITE](state, favorites) {
        state.Favorites = favorites
    }
}

const actions = 
{

    login(context, formData) 
    {
        context.commit(LOADING); // show spinner
        return new Promise((resolve, reject) => {
                axios.post('/api/user/login', formData)
                .then(res => {
                    localStorage.setItem('watchJwt', res.data.token);
                    context.commit(AUTH_SUCCESS, res.data.user);
                    resolve(res.data)
                }).catch(err => {
                    context.commit(AUTH_FAILURE);
                        reject(err.data);
                })
            }
        )
    },

    register(context, formData) 
    {
        context.commit(LOADING);// show spinner
        return new Promise((resolve, reject) => {
            axios.post('/api/user/register', formData)
            .then(res => {
                localStorage.setItem('watchJwt', res.data.token);
                context.commit(AUTH_SUCCESS, res.data.user);
                resolve(res.data)
            })
            .catch(err => {
                this.responseStyle = 'danger';
                this.responseMessage = err.data.message;
                this.form = {}; 
                context.commit(AUTH_FAILURE );     
                reject(res.data)                              
            })
        })
    },

    user(context) {
        context.commit(LOADING);        
        axios.get('/api/user/profile', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('watchJwt')
            }
        }).then(res => {
            context.commit(AUTH_SUCCESS, res.data.user)
        }).catch(err => {
            console.log(err)
            context.commit(NOT_LOADING);
        })
    },

    logout(context) 
    {   
        context.commit(LOADING);        
        localStorage.removeItem('watchJwt');
        context.commit(LOGOUT);
        context.commit(NOT_LOADING);        
    },

    validateJwt(context) 
    {
        context.commit(LOADING);        
        return new Promise((resolve, reject) => {
            console.log('validating jwt', localStorage.getItem('watchJwt'))
            axios.get('/api/user/validate-jwt', {
                params: {
                    jwt: localStorage.getItem('watchJwt')
                }
            }).then(res => {
                context.commit(VALIDATE_JWT);
                resolve(res.data)
            }).catch(err => {
                reject()
                context.commit(NOT_LOADING);
                console.log(err)
            })
        })
    },

    loadUserCollection(context) {
        context.commit(LOADING);
        axios.get('/api/watch', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('watchJwt')
            }
        })
        .then(res => {
            context.commit(LOAD_COLLECTION, res.data.collection);
            context.commit(NOT_LOADING);            
        }).catch(err => {
            console.log('errorreres', err)
            context.commit(LOAD_COLLECTION, []);
            context.commit(NOT_LOADING);            
        })
    },

    submitWatch(context, watch) {
        context.commit(LOADING);        
        return new Promise((resolve, reject) => {
            if(!context.state.Collection) watch.order = 0;
            else watch.order = context.state.Collection.length + 1;
            axios.post('/api/watch', watch, {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('watchJwt')
                }
            })
                .then((res) => {
                    console.log('SUBMITTED', res.data, res.data.watch)
                    context.commit(SUBMIT_WATCH, res.data.watch)
                    resolve(res.data)
            }).catch((err) => {
                reject(err.data);   
                    context.commit(NOT_LOADING);      
            })
        })
    },

    selectWatch(context, watch) {
        if(watch != null) {
            context.commit('SELECT_WATCH', watch);
            return true;
        }
        throw new Error('HOLY SHIT!');
    },

    updateWatchOrder(context, watchToUpdate) {
        if (!watchToUpdate) return false;
        axios.put('/api/watch', watchToUpdate, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('watchJwt')
            }
        })
        .then(res => {
            let reorderedCollection = res.data.reorderedCollection
            context.commit('WATCH_ORDER_UPDATED', reorderedCollection)
        }).catch(err =>{
            console.log(err);
        });
    },

    getFavorites(context) { //On load watch collection
        axios.get('/api/watch/favorite', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('watchJwt')
            }
        }).then(res => {
            console.log('favorites be', res.data.favorites)
            context.commit('FAVORITES_COLLECTION', res.data.favorites);
        }).catch(err => {
            console.log(err);
        })
    },

    toggleWatchFavorite(context, watchId) {
        axios.post('/api/watch/favorite',  { watchId }, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('watchJwt')
            }
        }).then(res => {
            console.log('toggled', res.data)
            context.commit('TOGGLE_FAVORITE', res.data.favorites);
        }).catch(err => {
            console.log('fuckit', err);
        })
    }

}

const getters = 
{
    getLoadingStatus(state) {
        return state.isLoading;
    },

    getUserAuthStatus(state) {    
        return state.isAuthorized;
    },

    getUserLoadStatus(state) {    
        return state.isUserLoaded;
    },

    getCollectionLoadStatus(staste) {
        return state.isCollectionLoaded;
    },

    getCollection(state) {
        return state.Collection;
    },

    getFavorites(State) {
        return state.Favorites;
    },

    getUser(state) {
        return state.User;
    }
}



export default new Vuex.Store
({
    state,
    actions,
    mutations,
    getters
})