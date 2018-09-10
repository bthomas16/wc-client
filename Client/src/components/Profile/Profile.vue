<template>
    <b-container>
       <b-row>
            <b-col lg="2" md="3" cols="12" class="border bg-lightgray">
               <app-profile-info :User="User"></app-profile-info>
               <b-row class="d-none d-md-block">
                    <b-col class="mx-auto" cols="12"><app-sidebar></app-sidebar></b-col>
               </b-row>
               <b-row class="d-none d-md-block mt-50">
                    <b-col class="mx-auto" cols="12"><app-sidebar></app-sidebar></b-col>
               </b-row>
            </b-col>
            <b-col lg="10" md="9" cols="12" class="border" >
                <app-collection :userName="userName"></app-collection>
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
    data () {
        return {
            User: this.$store.state.User,
            userName: this.$store.state.User.firstName
        }
    },

    created: function () {
        this.$store.dispatch('user');
    }
}
</script>

<style>



.container {
    max-width: 100%;
}
.mt-50 {
    margin-top: 20em;
}
</style>

