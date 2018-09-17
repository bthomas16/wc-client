<template>
    <b-container fluid class="pt-3">
        <b-row align-v="center" align-h="around" no-gutters>
            <b-col cols="12" md="5" order="2" order-md="1" class=" mx-auto">
                <b-row no-gutters>
                    <h2 class="border-bottom pt-0 px-1 pb-3 white mx-auto mt-3 my-1 mt-md-0 mx-md-0 Poppins bg-white-opaque"><strong>Featured Collection of the week</strong></h2>
                    <b-col id="watch-collection" cols="11" class="mx-auto ml-md-0 py-2 mt-3">
                        <b-row align-h="center">
                            <b-col v-for="watch in FeaturedWatches" :key="watch.id" cols="5" md="3" class="pointer bg-white box-shadow border p-1 m-1 "
                            @click="selectWatch(watch)">
                                <b-img :src="watch.src" fluid class="my-2"></b-img>
                                <b-row>
                                    <b-col cols="10" class="mx-auto p-1 pb-0 mt-2 border bg-white-opaque box-shadow lh-low">
                                        <b-col cols="10" class="mx-auto"><b-img :src="watch.logoSrc" fluid></b-img></b-col>
                                        <h5 class="my-0">{{watch.brand}}</h5>
                                        <h6 class="mt-1 mb-0">{{watch.name}}</h6>
                                        <h6 class="green mb-0">${{watch.value}}</h6>
                                    </b-col>
                                </b-row>  
                            </b-col>
                            <b-row>
                                <b-col cols="11" class="mx-auto border bg-lightgray mt-2" align-h="center">
                                    <b-row>
                                        <b-col cols="2">
                                            <b-img width="200" fluid src="https://ksr-ugc.imgix.net/assets/016/788/908/fe119610ee2998cc636c8a7ac224cebf_original.png?crop=faces&w=1552&h=873&fit=crop&v=1496084881&auto=format&q=92&s=7600a575bed419466c2b65a057adc28b">
                                            </b-img> 
                                        </b-col>
                                        <b-col>
                                            <b-row>
                                            <!-- <b-col cols="10" class="mx-auto">  -->
                                                <h4>Watch Name</h4>
                                                <h6>Brand Name</h6>
                                                <ul>
                                                    <li>spec</li>
                                                    <li>spec</li>
                                                    <li>spec</li>
                                                </ul>
                                                <h6 class="reen">$300</h6>
                                            <!-- </b-col> -->
                                            </b-row>
                                        </b-col>
                                    </b-row>
                                </b-col>
                            </b-row>    
                        </b-row>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="12" md="7" class="mx-auto">
                <b-row no-gutters>
                    <b-col cols="12" class="mx-auto">
                        <span v-if="showLogin">
                            <app-login @toggleAuthView="toggleAuthParent"></app-login>
                        </span>
                        <span v-else>
                            <app-register @toggleAuthView="toggleAuthParent"></app-register>
                        </span>  
                    </b-col>
                </b-row>
            </b-col>
        </b-row>

        <b-modal :title="selectedWatch.name" ref="seeFeaturedWatchModal">
            <app-see-more :selectedWatchObj="getSelectedWatch"></app-see-more>
        </b-modal>
        
    </b-container>
</template>

<script>
import Register from './Register.vue';
import Login from './Login.vue';
import SeeMore from '../Profile/Collection/SeeMore.vue'

export default {
    components: {
      appRegister: Register,
      appLogin: Login,
      appSeeMore: SeeMore 
    },
    data () {
        return {
            selectedWatch: {},
            FeaturedWatches: [
                {
                    src: 'http://static1.squarespace.com/static/53af7209e4b0911b3009149d/53af7250e4b0f61134967e91/555f5050e4b0b614ae768991/1432327291003/?format=1000w',
                    brand: 'Omega',
                    name: 'WatchGuy',
                    value: 375,
                    logoSrc: 'http://logok.org/wp-content/uploads/2014/07/Omega_Logo-880x660.png'
                },
                {
                    src: 'http://static1.squarespace.com/static/53af7209e4b0911b3009149d/53af7250e4b0f61134967e91/555f5050e4b0b614ae768991/1432327291003/?format=1000w',
                    brand: 'Omega',
                    name: 'WatchGuy',
                    value: 375,
                    logoSrc: 'http://logok.org/wp-content/uploads/2014/07/Omega_Logo-880x660.png'
                },
                {
                    src: 'http://static1.squarespace.com/static/53af7209e4b0911b3009149d/53af7250e4b0f61134967e91/555f5050e4b0b614ae768991/1432327291003/?format=1000w',
                    brand: 'Omega',
                    name: 'WatchGuy',
                    value: 375,
                    logoSrc: 'http://logok.org/wp-content/uploads/2014/07/Omega_Logo-880x660.png'
                },
                {
                    src: 'http://static1.squarespace.com/static/53af7209e4b0911b3009149d/53af7250e4b0f61134967e91/555f5050e4b0b614ae768991/1432327291003/?format=1000w',
                    brand: 'Omega',
                    name: 'WatchGuy',
                    value: 375,
                    logoSrc: 'http://logok.org/wp-content/uploads/2014/07/Omega_Logo-880x660.png'
                },
                {
                    src: 'http://static1.squarespace.com/static/53af7209e4b0911b3009149d/53af7250e4b0f61134967e91/555f5050e4b0b614ae768991/1432327291003/?format=1000w',
                    brand: 'Omega',
                    name: 'WatchGuy',
                    value: 375,
                    logoSrc: 'http://logok.org/wp-content/uploads/2014/07/Omega_Logo-880x660.png'
                },
                {
                    src: 'http://static1.squarespace.com/static/53af7209e4b0911b3009149d/53af7250e4b0f61134967e91/555f5050e4b0b614ae768991/1432327291003/?format=1000w',
                    brand: 'Omega',
                    name: 'WatchGuy',
                    value: 375,
                    logoSrc: 'http://logok.org/wp-content/uploads/2014/07/Omega_Logo-880x660.png'
                },
                 {
                    src: 'http://static1.squarespace.com/static/53af7209e4b0911b3009149d/53af7250e4b0f61134967e91/555f5050e4b0b614ae768991/1432327291003/?format=1000w',
                    brand: 'Omega',
                    name: 'WatchGuy',
                    value: 375,
                    logoSrc: 'http://logok.org/wp-content/uploads/2014/07/Omega_Logo-880x660.png'
                },
                {
                    src: 'http://static1.squarespace.com/static/53af7209e4b0911b3009149d/53af7250e4b0f61134967e91/555f5050e4b0b614ae768991/1432327291003/?format=1000w',
                    brand: 'Omega',
                    name: 'WatchGuy',
                    value: 375,
                    logoSrc: 'http://logok.org/wp-content/uploads/2014/07/Omega_Logo-880x660.png'
                },
                {
                    src: 'http://static1.squarespace.com/static/53af7209e4b0911b3009149d/53af7250e4b0f61134967e91/555f5050e4b0b614ae768991/1432327291003/?format=1000w',
                    brand: 'Omega',
                    name: 'WatchGuy',
                    value: 375,
                    logoSrc: 'http://logok.org/wp-content/uploads/2014/07/Omega_Logo-880x660.png'
                }
            ],
        showLogin: false
        }
    },
    methods: {
        toggleAuthParent: function() {
            return this.showLogin = !this.showLogin
        },

        selectWatch(watch) {
            this.selectedWatch = watch;
            this.$refs.seeFeaturedWatchModal.show();
        }
    },
    computed: {
        getSelectedWatch() {
            return {
                selectedWatch: this.selectedWatch,
                isEdit: false,
                isFeaturedWatch: true
            }
        }
    }
}
</script>

<style scoped>
.container-fluid {
    background: linear-gradient( rgba(55, 55, 55, .45), rgba(55, 55, 55, .45) ), url('https://topwatch.vn/upload_images/images/topwatch-huong-dan-su-dung-va-bao-quan-dong-ho(1).jpg');
    height: 100vh;
    background-repeat: no-repeat;
    background-size: cover;
    overflow-y: hidden !important;
}

#watch-collection {
    background: rgba(40,40,40,.6);
    max-height: 69vh;
    overflow-y: scroll;
}
.box-shadow {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);   
}

.outline {
    -webkit-text-stroke: 1px black;
}

@media(max-height: 768px) {
    .container-fluid {
        overflow-y: scroll !important;
        height: auto;
    }
}
</style>

<!-- b-form-1.vue -->

