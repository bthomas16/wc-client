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
    SUBMIT_WATCH = "SUBMIT_WATCH";

const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('watchJwt')
    }
}

const state = 
{
    isLoading: false,
    isAuthorized: false,
    jwt: '',
    User: {},
    Collection: {},
    userLoadStatus: 'not-loaded',
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
        state.jwt = localStorage.getItem('watchJwt');
        state.isAuthorized = true;
        state.isLoading = false;
        state.userLoadStatus = 'loaded';
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

    [GET_USER](state, user)
    {
        state.isLoading = false;            
        state.User = user;
        state.isAuthorized = true;
        state.jwt = localStorage.getItem('watchJwt');
        state.userloadStatus = 'loaded';
    },

    [VALIDATE_JWT](state) {
        state.isAuthorized = true;
    },

    [INVALIDATE_JWT](state) {
        state.isAuthorized = false;
    },

    [NAME_COLLECTION](state, collectionName) {
        state.Collection.name = collectionName;
    },

    [SUBMIT_WATCH](state, watch) {
        console.log(state.Collection, state.Collection.pieces)
        return state.Collection.collection.push(watch);
    },

    [LOAD_COLLECTION](state, collection) {
        state.isLoading = false;                    
        state.Collection = collection;
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
                        console.log(res.data)
                        localStorage.setItem('watchJwt', res.data.token);
                        context.commit(AUTH_SUCCESS, res.data);
                        resolve(res.data)
                    }
                    else 
                    {
                        context.commit(AUTH_FAILURE);
                        reject(res.data);
                    }  
                }).catch(err => {
                    console.log('err', err)
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
                console.log('registtreee', res.data)
                localStorage.setItem('watchJwt', res.data.token);
                context.commit(AUTH_SUCCESS, res.data);
                resolve(res.data)
            })
            .catch(err => {
                this.responseStyle = 'danger';
                this.responseMessage = err.data.message;
                this.form = {}; 
                console.log(err.data)
                context.commit(AUTH_FAILURE );     
                reject(res.data)                              
            })
        })
    },

    logout(context) 
    {   
        localStorage.removeItem("watchJwt");
        context.commit(LOGOUT);
    },

    validateJwt(context) 
    {
        return new Promise((resolve, reject) => {
            axios.get('/api/user/validate-jwt', config).then(res => {
                if(res.data.success) {
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

    user(context) {
        axios.get('/api/user/profile', config).then(res => {
            context.commit(GET_USER, res.data.userStore)
        }).catch(err => {
            // context.commit(INVALID_USER, res.data.userStore)
            console.log(err)
        })
    },

    nameCollection(context, name) {
        return new Promise((resolve, reject) => {
            axios.post('/api/collection', { name }, config)
                .then(res => {
                    context.commit(NAME_COLLECTION, name)
                    resolve(res.data)
                }).catch(err => {
                    reject(err.data)
                })
            })
    },

    submitWatch(context, watch) {
        return new Promise((resolve, reject) => {
            axios.post('/api/watch', { watch }, config).then((res) => {
                if(res.data){
                    console.log('submitting watch', res.data)
                    context.commit(SUBMIT_WATCH, res.data)
                    resolve(res.data)
                }
                else {
                    console.log(err);
                    reject(err.data)
                }
            })
        })
    },

    loadUserCollection(context) {
        context.commit(LOADING);
        axios.get('/api/collection',  {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('watchJwt')
            }
        }).then(res => {
            console.log('collection be', res.data)
            context.commit(LOAD_COLLECTION, res.data)
        })
    }
}

const getters = 
{
    getUserAuthStatus(state) {    
        return state.isAuthorized;
    },

    getUserLoadStatus(state) {
        return function() {
            return state.userLoadStatus;
        }
    },

    getJwt(state) {
        return state.jwt;
    },

    getUser(state) {
        return function() {
            return state.User;
        }
    },
     getUserCollection(state){
         return state.Collection;
     }
}



export default new Vuex.Store
({
    state,
    actions,
    mutations,
    getters
})