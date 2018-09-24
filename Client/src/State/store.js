import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const axios = require('axios'),
    LOADING = "LOADING",
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
    WATCH_ORDER_UPDATED = "WATCH_ORDER_UPDATED";

const config = {
    headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('watchJwt')
    }
}

const state = 
{
    isLoading: false,
    isAuthorized: false,
    User: {},
    Collection: [],
    isUserLoaded: false,
    isCollectionLoaded: false,
    selectedWatch: {}
}

const mutations = 
{
    [LOADING](state) {
        state.isLoading = true;
    },

    [AUTHENTICATING] (state) {
        state.isLoading = true;
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

    [WATCH_ORDER_UPDATED](state, watch) {
        state.Collection[watch.id].order = watch.order;
    }
}

const actions = 
{

    login(context, formData) 
    {
        return new Promise((resolve, reject) => {
            context.commit(AUTHENTICATING); // show spinner
                axios.post('/api/user/login', formData)
                .then(res => {
                    if(res.data.isSuccess)
                    {
                        localStorage.setItem('watchJwt', res.data.token);
                        context.commit(AUTH_SUCCESS, res.data.user);
                        resolve(res.data)
                    }
                    else 
                    {
                        context.commit(AUTH_FAILURE);
                        reject(res.data);
                    }  
                }).catch(err => {
                    context.commit(AUTH_FAILURE);
                        reject(err.data);
                })
            }
        )
    },

    register(context, formData) 
    {
        return new Promise((resolve, reject) => {
            context.commit(AUTHENTICATING); // show spinner
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
        axios.get('/api/user/profile', config).then(res => {
            context.commit(AUTH_SUCCESS, res.data.user)
        }).catch(err => {
            console.log(err)
        })
    },

    logout(context) 
    {   
        localStorage.removeItem('watchJwt');
        context.commit(LOGOUT);
    },

    validateJwt(context) 
    {
        return new Promise((resolve, reject) => {
            axios.get('/api/user/validate-jwt', {
                params: {
                    jwt: localStorage.getItem('watchJwt')
                }
            }).then(res => {
                if(res.data.isSuccess) {
                    context.commit(VALIDATE_JWT);
                    resolve(res.data)
                }
                else {
                    context.commit(INVALIDATE_JWT);
                    reject(res.data)
                }
            }).catch(err => {
                reject()
                console.log(err)
            })
        })
    },

    submitWatch(context, watch) {
        return new Promise((resolve, reject) => {
            if(!context.state.Collection) watch.order = 0;
            else watch.order = context.state.Collection.length + 1;
            axios.post('/api/watch', watch, config).then((res) => {
                    context.commit(SUBMIT_WATCH, res.data.watch)
                    resolve(res.data)
            }).catch(() => {
                reject(res.data);        
            })
        })
    },

    loadUserCollection(context) {
        context.commit(LOADING);
        axios.get('/api/watch', config)
        .then(res => {
            context.commit(LOAD_COLLECTION, res.data.collection);
        }).catch(err => {
            context.commit(LOAD_COLLECTION, []);
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
        axios.put('/api/watch', watchToUpdate, config)
        .then(res => {
            context.commit('WATCH_ORDER_UPDATED', watchToUpdate)
            console.log(res)
        }).catch(err =>{
            console.log(err);
        });
    }
}

const getters = 
{
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