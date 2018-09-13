<template>
    <b-container>
        <b-row no-gutters>            
            <b-col cols="12" lg="8" class="mx-auto" align-h="center">
                <b-alert show v-bind:variant="responseStyle" v-if="showAlert">{{responseMessage}}</b-alert>
                <b-form @submit="submit">
                    <b-card-group deck>
                        <b-card img-src="https://i.redd.it/eghuai7i83ez.jpg"
                                img-alt="Card image"
                                v-if="card == 1"
                                class="m-0"
                                >
                            <div class="card-text mx-auto">
                                <h4>Begin Organizing your collection here!</h4>
                                <b-form-group id="credentials"
                                    description="We'll never share your email with anyone else.">
                                    <b-form-input id="email"
                                                type="email"
                                                v-model="form.email"
                                                required
                                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                                placeholder="Enter your email"
                                                @input="validateEmail(form.email)">
                                    </b-form-input>
                                    <b-form-input id="password"
                                                type="password"
                                                v-model="form.password"
                                                required
                                                placeholder="Create a password"
                                                class="mt2"
                                                v-if="showPassword"
                                                @input="validatePassword(form.password)">
                                    </b-form-input>
                                </b-form-group>
                                <h6 class="red thin h7">{{errMsg}}</h6>
                                <b-button variant="success" @click="card=2" :disabled="form.password.length <= 4">Continue</b-button>
                            </div>
                        </b-card>
                        <b-card img-src="https://i.ytimg.com/vi/hWEd4ImKHT0/maxresdefault.jpg"
                                img-alt="Card image"
                                v-if="card == 2"
                                >
                            <div class="card-text mx-auto" >
                                <b-form-group id="names"
                                    label-for="First Name">
                                    <label for="firstName">First Name:</label>
                                    <b-form-input id="firstName"
                                                type="email"
                                                v-model="form.firstName"
                                                required
                                                label="First Name:"
                                                placeholder="First Name">
                                    </b-form-input>
                                    <label class="mt2" for="firstName">Last Name:</label>
                                    <b-form-input id="password"
                                                type="password"
                                                v-model="form.lastName"
                                                required
                                                placeholder="Last Name"
                                                label="Last Name:"
                                                >
                                    </b-form-input>
                                </b-form-group>
                                <b-button variant="success" :disabled="!form.firstName || !form.lastName" type="submit">Finish</b-button>
                            </div>
                        </b-card>
                    </b-card-group>
                </b-form>
            </b-col>
        </b-row>
        


     
        
         
             <!--
            <b-row align-v="center">
                <b-col>
                    <b-button type="submit" variant="primary">Submit</b-button>
                </b-col>
                <b-col>
                    <p sm="9" class="mt2 h6">Already have an account? <span class="link" @click="toggleAuthChild">Login Here</span></p>
                </b-col>
            </b-row> -->

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
        showPassword: false,
        card: 1,
        showAlert: false,
        responseMessage: '',
        responseStyle: 'light',
        showForm: true,
        errMsg: '',
        formValid: true
        }
    },
    methods: {
        submit () 
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
        },

        validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(re.test(email)) {
                this.showPassword = true;
                return true;
            }
            else {
                this.showPassword = false;
                this.form.password = '';
                return re.test(email);
            }
        },

        validatePassword(password) {
            if(password.length <= 4) 
            {
                this.errMsg = 'Password must be more than 4 characters';
                return false;
            }
            else {
                this.errMsg = '';
                return true;
            }
        },

        validateNames(first, last) {
            if(first.length && last.length) return true;
            else return false;
        }
    }
}
</script>

<style>
    #register-wrapper {
        max-width: 60%;
        padding:auto;
    }

    .card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .card-img {
        max-width: 600px;
    }
</style>