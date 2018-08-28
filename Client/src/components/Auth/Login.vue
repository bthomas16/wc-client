<template>
    <b-container class="mt3">
        <b-alert show v-bind:variant="responseStyle">{{responseMessage}}</b-alert>
        <b-form @submit.prevent="onSubmit">
            <b-form-group id="exampleInputGroup1"
                            label="Email address:"
                            label-for="exampleInput1"
                            description="We'll never share your email with anyone else.">
                <b-form-input id="exampleInput1"
                            type="email"
                            v-model="form.email"
                            required
                            placeholder="Enter email">
                </b-form-input>
            </b-form-group>
            <b-form-group id="exampleInputGroup2"
                            label="Your Password:"
                            label-for="exampleInput2">
                <b-form-input id="exampleInput2"
                            type="password"
                            v-model="form.password"
                            required
                            placeholder="Enter name">
                </b-form-input>
            </b-form-group>
            <b-row align-v="center">
                <b-col>
                    <b-button type="submit" variant="primary">Submit</b-button>
                </b-col>
                <b-col>
                    <p sm="9" class="mt2 h6">Don't have an account? <span class="link" @click="toggleAuthChild">Register Here</span></p>
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
            form: 
            {
                email: '',
                password: ''
            },
                showAlert: false,
                responseMessage: 'Login Here!',
                responseStyle: 'light',
        }
    },
    methods: {
        onSubmit () 
        {
            this.$store.dispatch('login', this.form).then(res => {
                    this.$router.push({ path: '/profile'  }) 
                }).catch(err => {
                    console.log(err)
                    this.showAlert = true;
                    this.responseStyle = 'danger';
                    this.responseMessage = err.message
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