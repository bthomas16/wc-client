import Vue from 'vue';
import Vuex from 'vuex';
import Cookies from './cookies.js';

Vue.use(Vuex);

const axios = require('axios');
const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";
const LOGOUT = "LOGOUT";
const GET_USER = "GET_USER";
const VALIDATE_JWT = "VALIDATE_JWT";
const INVALIDATE_JWT = "INVALIDATE_JWT";

const state = 
{
    isLoading: false,
    isAuthorized: false,
    jwt: '',
    User: {},
    userLoadStatus: 'not-loaded',
}

const mutations = 
{
    [LOGIN] (state) {
        state.isLoading = true;
    },

    [LOGIN_SUCCESS] (state, body) 
    {
        state.User = body;        
        state.jwt = localStorage.getItem('watchJwt');
        state.isAuthorized = true;
        state.isLoading = false;
        state.userLoadStatus = 'loaded';
    },

    [LOGIN_FAILURE] (state) 
    {
        state.isAuthorized = false;
        state.isLoading = false;    
    },

    [LOGOUT](state) 
    {
        state.isAuthorized = false;
    },

    [GET_USER](state, body)
    {
        state.isLoading = false;        
        state.User = body;
        state.isAuthorized = true;
        state.jwt = localStorage.getItem('watchJwt');
        state.userloadStatus = 'loaded';
    },

    [VALIDATE_JWT](state) {
        state.isAuthorized = true;
    },

    [INVALIDATE_JWT](state) {
        state.isAuthorized = false;
    }
}

const actions = 
{

    login(context, formData) 
    {
        return new Promise((resolve, reject) => {
            context.commit(LOGIN); // show spinner
                axios.post('/api/user/login', formData)
                .then(res => {
                    if(res.data.isSuccess)
                    {
                        console.log(res.data)
                        localStorage.setItem('watchJwt', res.data.token);
                        context.commit(LOGIN_SUCCESS, res.data);
                        Cookies.SetCookies('User', res.data)
                        resolve(res.data)
                    }
                    else 
                    {
                        context.commit(LOGIN_FAILURE);
                        reject(res.data);
                    }  
                }).catch(err => {
                    console.log('err', err)
                    context.commit(LOGIN_FAILURE);
                        reject(err.data);
                })
            }
        )
    },


    logout(context) 
    {   
        localStorage.removeItem("watchJwt");
        context.commit(LOGOUT);
    },


    validateJwt(context) 
    {
        return new Promise((resolve, reject) => {
            axios.get('/api/user/validate-jwt', {
                headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('watchJwt')
                }
            }).then(res => {
                if(res.data.success) {
                    context.commit(VALIDATE_JWT);
                    resolve(res.data)
                }
                else {
                    context.commit(INVALIDATE_JWT);
                    reject(res.data)
                }
            }).catch(err => console.log(err))
        })
    },

    user(context) {
        state.isLoading = true;
        axios.get('/api/user/profile', {
            headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('watchJwt')
            }
        }).then(res => {
            console.log('showing profile', res.data)
            context.commit(GET_USER, res.data.userStore)
        }).catch(err => {
            // context.commit(INVALID_USER, res.data.userStore)
            console.log(err)
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

    createAuthHeader() {
        let authHeader = {
            'Content-Type': 'application/json',
            'authorization': jwt
        }
        return authHeader;
    }
}



export default new Vuex.Store
({
    state,
    actions,
    mutations,
    getters
})