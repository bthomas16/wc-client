<template>
    <b-container fluid>
       <b-row class="mr-0">
            <b-col lg="2" md="3" xs="12" class="border bg-lightgray">
               <app-profile-info :User="GetUser"></app-profile-info>
               <b-row class="d-none d-md-block">
                    <b-col class="mx-auto" cols="12"><app-sidebar></app-sidebar></b-col>
               </b-row>
               <b-row class="d-none d-md-block mt-50">
                    <b-col class="mx-auto" cols="12"><app-sidebar></app-sidebar></b-col>
               </b-row>
            </b-col>
            <b-col lg="10" md="9" xs="12" class="border" >
                <app-collection></app-collection>
            </b-col>
       </b-row>
       <!-- <b-row class="mr-0">
           <b-col cols="12" md="9"><app-feed></app-feed></b-col>
       </b-row> -->
    </b-container>
</template>

<script>
import axios from 'axios';
import ProfileInfo from './ProfileInfo.vue';
import Collection from './Collection/Collection.vue';
import Sidebar from './Sidebar.vue';
import Feed from './Feed/Feed.vue';


export default {
    components: {
        appProfileInfo: ProfileInfo,
        appCollection: Collection,
        appSidebar: Sidebar,
        appFeed: Feed
    },

    computed: {
        GetUser: function() {
            return this.$store.state.User
        }
    },

    created: function () {
        this.$store.dispatch('user');
    }
}
</script>

<style>
.mt-50 {
    margin-top: 20em;
}
</style>

