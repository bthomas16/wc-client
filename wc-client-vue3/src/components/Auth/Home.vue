<template>
    <b-container fluid :class="env == 'development' ? 'devBackground' : 'background'">
        
        <!-- <p v-if="img1.src">LOADING</p> -->
        <b-row align-v="start" align-h="center" no-gutters class="pt-1 pt-md-3">
            <b-col cols="12" md="11" lg="6" order="2" order-lg="1" class="mx-auto">
                <p class="bg-lightgray p-1 white h2 m-h1 mx-md-1 nowrap my-0"><strong>Featured Collection</strong></p>
                <!-- <p class="border-bottom pt-0 px-1 pb-3 white ml-1 my-0 Poppins w-75 d-block d-md-none"></p>
                <p class="border-bottom pt-0 px-1 pb-3 white ml-1 my-0 Poppins w-50 d-none d-md-block"></p> -->
                <featured-collection></featured-collection>
            </b-col> 
            <b-col cols="12" lg="6" class="mx-auto px-md-2">

                <b-card :img-src="ROOT_API + '/api/static-assets/watcheshomecardbg.jpg'" img-alt="Card image" class="p-0 card">
                    <b-row no-gutters align-h="center" align-v="center">
                        <b-col id="titleCard" class="bg-darkgray center t-0" cols="11" md="11">
                            <p class="h2 white center underline">Watch SOC: </p>
                            <p class="h4 white center">Manage your current, past & future <strong>Watch Collection</strong> </p>
                            <!-- <p class="h5 white center"><em>State of the (Watch) Collection</em></p> -->
                        </b-col>
                        <p v-if="isRegister" class="h4 my-0 left w-100">Register to<span class="nowrap left"> Manage your collection!</span></p>                            
                        <p v-if="!isRegister" class="h4 my-0 left w-100">Login to<span class="nowrap left"> Manage your collection!</span></p>                            
                        <app-register class="mt-2 mt-md-3" v-if="isRegister" v-on:toggleAuthView="toggleAuthParent"></app-register>
                        <app-login class="mt-2 mt-md-3" v-if="!isRegister" v-on:toggleAuthView="toggleAuthParent"></app-login>
                    </b-row>
                </b-card>

            </b-col>
        </b-row>
        
    </b-container>
</template>

<script>
import Register from './Register.vue';
import Login from './Login.vue';

import FeaturedCollection from '../FeaturedCollection.vue';


export default {
    components: {
      appRegister: Register,
      appLogin: Login,
      featuredCollection: FeaturedCollection
    },
    data () {
        return {
            ROOT_API: process.env.VUE_APP_ROOT_API,
            selectedWatch: {},
            showLogin: false,
            env: process.env.NODE_ENV,
            isRegister: true
        }
    },
    methods: {
        toggleAuthParent: function() {
            return this.isRegister = !this.isRegister;
        },

        isValidToken() {
            return this.$store.state.isAuthorized;
        }
    }
}
</script>

<style scoped>

    #titleCard {
        position: absolute;
        margin-top: 7rem;
    }

    .background {
        background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/api/static-assets/tablebg.jpg");
        min-height: 100%;
        height: auto;
        width: 100%;
        padding: 0 !important;
        background-position: center;
        background-repeat:repeat;
        background-size: cover;
    }
    .devBackground {
        background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("http://localhost:8081/api/static-assets/tablebg.jpg");
        min-height: 100%;
        height: auto;
        width: 100%;
        padding: 0 !important;
        background-position: center;
        background-repeat:repeat;
        background-size: cover;
        /* position: relative; */
    }

/*  */

    #watch-collection {
        /* background: rgba(40,40,40,.2   ); */
        overflow-y: scroll;
    }


    .outline {
        -webkit-text-stroke: 1px black;
    }

    #brandLogo {
        max-height: 75px;
    }

    .form-control:focus {
        border: none;
        outline: none !important;
    }

    .card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .fade-enter-active,
    .fade-leave-active {
    transition-duration: 0.1s;
    transition-property: opacity;
    transition-timing-function: ease;
    }

    .fade-enter,
    .fade-leave-active {
    opacity: 0
    }
        

    @media(max-width: 720px){
        .card, .card-img {
            box-shadow: none;
            border: none;
            border-radius: 0;
        }

        #titleCard {
            margin-top: 2.5rem;
        }
    }
</style>

<!-- b-form-1.vue -->

