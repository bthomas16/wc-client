<template>
    <b-container class="mt3">
        <b-alert show v-bind:variant="responseStyle" v-if="showAlert">{{responseMessage}}</b-alert>
        <b-form @submit.prevent="onSubmit" v-if="showForm">
            <b-form-group id="exampleInputGroup1"
                            label="Email address:"
                            label-for="Email Address"
                            description="We'll never share your email with anyone else.">
                <b-form-input id="email"
                            type="email"
                            v-model="form.email"
                            required
                            placeholder="Enter Email Address">
                </b-form-input>
            </b-form-group>
            <b-form-group id="exampleInputGroup2"
                            label="Your First Name:"
                            label-for="First Name">
                <b-form-input id="firstName"
                            type="text"
                            v-model="form.firstName"
                            required
                            placeholder="Enter First Name">
                </b-form-input>
                <b-form-group id="exampleInputGroup2"
                            label="Your Last Name:"
                            label-for="Last Name">
                <b-form-input id="lastName"
                            type="text"
                            v-model="form.lastName"
                            required
                            placeholder="Enter Last Name">
                </b-form-input>
            </b-form-group>
            <b-form-group id="exampleInputGroup2"
                            label="Your Password:"
                            label-for="Password">
                <b-form-input id="password"
                            type="password"
                            v-model="form.password"
                            required
                            placeholder="Enter Password">
                </b-form-input>
            </b-form-group>
            </b-form-group>
            <b-row align-v="center">
                <b-col>
                    <b-button type="submit" variant="primary">Submit</b-button>
                </b-col>
                <b-col>
                    <p sm="9" class="mt2 h6">Already have an account? <span class="link" @click="toggleAuthChild">Login Here</span></p>
                </b-col>
            </b-row>
        </b-form>
    </b-container>
</template>

<script>
    import axios from 'axios';
    export default {
    data () {
        return {
        form: {
            email: '',
            firstName: '',
            lastName: '',
            password: ''
        },
        showAlert: false,
        responseMessage: '',
        responseStyle: 'light',
        showForm: true
        }
    },
    methods: {
        onSubmit () 
        {
            this.showAlert = false;
            this.form.email.toLowerCase();
            this.$store.dispatch('register', this.form).then(res => {
                if(res.isSuccess) this.$router.push({path: '/profile'})
                else {
                    this.showAlert = true;
                    this.responseMessage = res.message;
                    this.responseStyle = 'danger';
                }
            }).catch(err => {
                this.showAlert = true;
                this.responseMessage = err.message;
                this.responseStyle = 'danger';
            })
        },
        toggleAuthChild ()
        {
            this.$emit('toggleAuthView')
        }
    }
}
</script>

<style>
    #register-wrapper {
        max-width: 60%;
        padding:auto;
    }
  
</style>