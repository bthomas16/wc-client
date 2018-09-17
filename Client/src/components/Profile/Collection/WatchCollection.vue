<template>
    <b-container fluid>
        <b-row id="watchRow" align-h="start" class="mt-4">
            <b-col cols="3" md="4" class="watch border p-2 pt-0 mx-1" v-for="(watch) in Collection" :key="watch.id">
                <b-row align-v="start" align-h="center" no-gutters>
                    <b-col cols="12" class="order-1">
                        <b-row aling-h="center" align-v="center" no-gutters>
                            <b-col cols="12" lg="6" class="mx-auto p-1">
                                <b-img
                                @click="selectWatch(watch)" 
                                src="https://www.bremont.com/images/collection/_1000x600_fit_center-center/AIRCO-MACH-3-BL-FRONT-1_180226_104014.png" 
                                fluid>
                                </b-img>
                            </b-col>
                            <b-col lg="6" class="d-none d-lg-block pr-2">
                                <b-row align-h="end" no-gutters>
                                    <h6><strong>{{watch.name}}</strong></h6>
                                    <b-col cols="10" class="mt-5 px-1">
                                        <b-button variant="outline-info" size="sm" block @click="selectWatch(watch)">See More</b-button>
                                    </b-col>
                                    <b-col cols="10" class="px-1 h6"> 
                                        <b-button id="searchRef" variant="primary" class="mt-2" size="sm" block>Search Ref #</b-button>   
                                    </b-col>
                                    <b-col cols="10" class="p-0" >
                                        <b-img :src="emptyHeart" width="40px;" class="pointer right" ></b-img> 
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import axios from 'axios';

export default {
    name: 'watchCollection',

    data () {
        return {
            isEditMode: false,
            emptyHeart: "http://localhost:8081/api/static-assets/empty-heart.png",
            fullHeart: "http://localhost:8081/api/static-assets/full-heart.png"
        }
        
    },
    methods: {
        selectWatch(watch) {
            this.$emit('selectWatch', watch)
        },

        submitWatch() {
            console.log('will be submitting this watch', this.addWatch)
            this.isEdit = false;
            this.$store.dispatch('submitWatch', this.addWatch).then(() => {
                this.addWatch = {}
            })
        }
    },

    computed: {
        Collection() {
            return this.$store.state.Collection
        }
    }
}
</script>

<style>
    #searchRef {
        font-size: .75em;
    }

    .btn {
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }

    .right {
        float: right;
    }

    @media(min-width: 765px) and (max-width: 815px) {
        #searchRef {
            font-size: .5em;
        }
    }

    @media(max-width: 415px) {
        #searchRef {
            font-size: .65em;
        }
    }


</style>

