<template>
    <b-container fluid>
        <b-row id="watchRow" align-h="start" class="mt-4">
            <b-col md="3" cols="12" class="watch border p-0 mx-0 mx-md-2" v-for="(watch) in Collection" :key="watch.id">
                <b-row align-v="start" align-h="center" class="p-3">
                    <b-col sm="12" xs="4" class="order-1">
                        <b-row align-v="start" aling-h="start" class="pr-2 pr-sm-0">
                            <b-col cols="7" class="mx-auto p-0">
                                <b-img src="https://www.bremont.com/images/collection/_1000x600_fit_center-center/AIRCO-MACH-3-BL-FRONT-1_180226_104014.png" fluid></b-img>
                            </b-col>
                            <b-col cols="5">
                                <b-row align-h="end" class="pr-2">
                                    <h6><strong>{{watch.name}}</strong></h6>
                                    <b-col cols="12" class="mt-5 px-1">
                                        <b-button variant="outline-info" size="sm" block @click="selectWatch(watch)">See More</b-button>
                                    </b-col>
                                    <b-col cols="12" class="px-1 h6"> 
                                        <b-button id="searchRef" variant="primary" class="mt-2" size="sm" block>Search Ref #</b-button>   
                                    </b-col>
                                    <b-row align-h="end" align-v="center">
                                        <b-col class="pointer">
                                            <b-img :src="emptyHeart" width="40px;"></b-img> 
                                        </b-col>
                                    </b-row>
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
    props: {
        Collection: {}
    },

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

    }
}
</script>

<style>



</style>

