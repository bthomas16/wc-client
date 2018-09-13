<template>
    <b-container fluid class="px-3">
        <b-row align-v="start" align-h="between" class="pt-3 px-3">
            <b-col cols="12" md="6" order="2" order-md="1" class="border px-3 pt-0">
                <h4 class="border-bottom pb-3">This Weeks Featured Collection</h4>
                <b-row class="mt-5" align-h="center">
                    <b-col v-for="watch in FeaturedWatches" :key="watch.id" cols="6" md="3" class="featured-watch border m-2">
                        <b-img :src="watch.src" fluid class="m-1 p-1"></b-img>
                        <h6>{{watch.name}}</h6>
                        <p class="green">${{watch.value}}</p>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="12" md="6" class="border bg-lightgray py-3">
                <span v-if="showLogin">
                    <app-login @toggleAuthView="toggleAuthParent"></app-login>
                </span>
                <span v-else>
                    <app-register @toggleAuthView="toggleAuthParent"></app-register>
                </span>
            </b-col>
        </b-row>
        
    </b-container>
</template>

<script>
import Register from './Register.vue';
import Login from './Login.vue';

export default {
    components: {
      appRegister: Register,
      appLogin: Login,
    },
    data () {
        return {
            FeaturedWatches: [
                {
                    src: 'http://static1.squarespace.com/static/53af7209e4b0911b3009149d/53af7250e4b0f61134967e91/555f5050e4b0b614ae768991/1432327291003/?format=1000w',
                    name: 'WatchGuy',
                    value: 375
                },
                {
                    src: 'http://static1.squarespace.com/static/53af7209e4b0911b3009149d/53af7250e4b0f61134967e91/555f5050e4b0b614ae768991/1432327291003/?format=1000w',
                    name: 'WatchGuy',
                    value: 375
                },
                {
                    src: 'http://static1.squarespace.com/static/53af7209e4b0911b3009149d/53af7250e4b0f61134967e91/555f5050e4b0b614ae768991/1432327291003/?format=1000w',
                    name: 'WatchGuy',
                    value: 375
                },
                {
                    src: 'http://static1.squarespace.com/static/53af7209e4b0911b3009149d/53af7250e4b0f61134967e91/555f5050e4b0b614ae768991/1432327291003/?format=1000w',
                    name: 'WatchGuy',
                    value: 375
                },
                {
                    src: 'http://static1.squarespace.com/static/53af7209e4b0911b3009149d/53af7250e4b0f61134967e91/555f5050e4b0b614ae768991/1432327291003/?format=1000w',
                    name: 'WatchGuy',
                    value: 375
                },
                {
                    src: 'http://static1.squarespace.com/static/53af7209e4b0911b3009149d/53af7250e4b0f61134967e91/555f5050e4b0b614ae768991/1432327291003/?format=1000w',
                    name: 'WatchGuy',
                    value: 375
                }
            ],
        showLogin: false
        }
    },
    methods: {
        toggleAuthParent: function() {
            return this.showLogin = !this.showLogin
        }
    }
}
</script>

<style>
.featured-watch {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
    .container-fluid {
        /* background-image: url('https://i.pinimg.com/originals/c5/18/2f/c5182fbba13c31f1f8d622448e430819.jpg'); */
        max-height: 100vh;
        width: 100vw;
        background-repeat: no-repeat;
    }
</style>

<!-- b-form-1.vue -->

