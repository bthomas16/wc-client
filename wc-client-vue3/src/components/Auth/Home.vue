<template>
    <b-container fluid class="background">

        <!-- <p v-if="img1.src">LOADING</p> -->
        <b-row align-v="start" align-h="center" no-gutters>
            <b-col cols="12" class="p-0 m-0">
                <b-row no-gutters>
                    <b-col class="relative imgWrapper">
                        <b-row no-gutters align-h="center">
                            <b-col id="titleCard" class="absolute bgYellow center t-0 p-2 p-md-3" cols="11" md="8" lg="6">
                                <p class="h1 white center">Watch SOC</p>
                                <p class="h2 m-h3 white center">Manage your current, past & future <strong class="nowrap">Watch SOC</strong> </p>
                            </b-col>
                        </b-row>
                        <!-- <b-img class="img w-100" :src="ROOT_API + '/api/static-assets/watcheshomecardbg_copy.jpg'"></b-img> -->
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="12" class="bg-white">
                <b-row no-gutters align-v="center" class="m-0 p-0 wrapper">
                    <b-col cols="12" md="6" class="my-0 bg-white">
                        <p v-if="isRegister" class=" h3 my-0 p-2 bg-light-blue white left">Register to<span class="nowrap left"> Manage your collection!</span></p>
                        <p v-if="!isRegister" class=" h3 my-0 p-2 bg-light-blue white left">Login to<span class="nowrap left"> Manage your collection!</span></p>
                        <app-register class="p-3" v-if="isRegister"  v-on:toggleAuthView="toggleAuthParent"></app-register>
                        <app-login class="p-3" v-if="!isRegister" v-on:toggleAuthView="toggleAuthParent"></app-login>
                    </b-col>
                    <b-col cols="12" md="6" class="d-none d-md-block bgBlue h-100 m-0 p-2">
                        <ul class="mt-4 pl-md-0 pl-lg-4 nowrap">
                            <!-- <p class="h2 underline h-100">What is Watch SOC?</p> -->
                            <li>Always keep your Collection with you</li>
                            <li>Add, edit &amp; remove Watches</li>
                            <li>Manage sales, trades &amp; acquisitions</li>
                            <li>Randomize today's timepiece</li>
                            <li>Discover new watches &amp; brands</li>
                            <li>Learn what your WOTD is today!</li>
                        </ul>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="12">
                <featured-collection></featured-collection>
            </b-col>
        </b-row>

    </b-container>
</template>

<!-- <b-row align-h="center" no-gutters>
                    <b-col cols="12">
                        <b-card :img-src= img-alt="Card image" class="p-0 card">
                            <b-row no-gutters align-h="center" align-v="center">
                                <b-col id="titleCard" class="bg-darkgray center t-0" cols="11" md="11">
                                    <p class="h2 white center underline">Watch SOC: </p>
                                    <p class="h4 white center">Manage your current, past & future <strong>Watch SOC</strong> </p>
                                </b-col>
                                <p v-if="isRegister" class="h3 my-0 left w-100">Register to<span class="nowrap left"> Manage your collection!</span></p>
                                <p v-if="!isRegister" class="h3 my-0 left w-100">Login to<span class="nowrap left"> Manage your collection!</span></p>
                                <app-register class="mt-2 mt-md-3" v-if="isRegister" v-on:toggleAuthView="toggleAuthParent"></app-register>
                                <app-login class="mt-2 mt-md-3" v-if="!isRegister" v-on:toggleAuthView="toggleAuthParent"></app-login>
                            </b-row>
                        </b-card>
                    </b-col>
                </b-row> -->

<script>
import Register from './Register.vue'
import Login from './Login.vue'

import FeaturedCollection from '../FeaturedCollection.vue'

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
    toggleAuthParent: function () {
      return this.isRegister = !this.isRegister
    },

    isValidToken () {
      return this.$store.state.isAuthorized
    }
  }
}
</script>

<style scoped>
    .wrapper {
        height: 19.4rem;
    }

    .bgBlue {
        background-color: rgba(9, 25, 37, .2);
        height: 100%;

    }

    .bgYellow {
        background-color: rgba(32, 99, 155, .5);
    }

    ul li{
        /* margin-top: .35rem; */
        line-height: 30px;
        /* height: 50px; */
        padding-left: 45px;
        font-weight: 700;
        background-repeat: no-repeat;
        margin-top: 1rem;
        background-image: url('http://localhost:8081/api/static-assets/favicon-32x32.png');
    }

    /* ul {
        margin: 70px;
    } */

    .imgWrapper {
       background-image: linear-gradient(rgba(0, 0, 0, .25), rgba(0, 0, 0, .25)), url('http://localhost:8081/api/static-assets/watcheshomecardbg.jpg');
       background-repeat: no-repeat;
       background-size: cover;
       background-position: center; 
       height: 27rem;
       overflow: hidden;
    }

    #titleCard {
        position: absolute;
        margin-top: 6rem;
    }

    input {
        border: none;
        border-bottom: 2px solid gray;
        outline: none;
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

    @media(max-width: 995px){
        .card {
            border: none;
            border-radius: 0;
        }

        #titleCard {
            margin-top: 5rem;
        }

        .imgWrapper {
            height: 24rem;
        }

        .wrapper {
            height: 19.375rem;
        }
    }

    @media(max-width: 765px){
        .card, .card-img {
            box-shadow: none;
            border: none;
            border-radius: 0;
        }

        #titleCard {
            margin-top: 5rem;
        }

        .imgWrapper {
            height: 20rem;
        }

        .wrapper {
            height: 18.9rem;
        }
    }
</style>

<!-- b-form-1.vue -->
