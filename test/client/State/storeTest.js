let assert = require('chai').assert
let store = require('../../../client/State/store.js');
let axios = require('axios');

describe('Login', function() {
    describe('isSuccess', function() {
        it('Should Login Successfully, check isSuccess on response', function() {
            axios.post('http://localhost:8081/api/user/login', {
                email: 'bh@gmail.com',
                password: 'boo'
            }).then(res => {
                let value = res.data.isSuccess;
                value.should.eventually.equal(true)
            })
        })
    }),

    describe('message', function() {
        it('Login Success, show proper message for user', function() {
            axios.post('http://localhost:8081/api/user/login', {
                email: 'bh@gmail.com',
                password: 'boo'
            }).then(res => {
                let value = res.data.message;
                value.should.eventually.equal('Route to Profile now!')
            })
        })
    })
})
