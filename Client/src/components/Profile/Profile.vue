<template>
    <b-container ref="profileRef">
       <b-row>
            <b-col lg="2" md="3" cols="12" class="border bg-lightgray">
               <app-profile-info></app-profile-info>
               <b-row class="d-none d-md-block"  v-if="isUserLoaded">
                    <b-col class="mx-auto" cols="12"><app-sidebar></app-sidebar></b-col>
               </b-row>
               <b-row class="d-none d-md-block mt-50"  v-if="isUserLoaded">
                    <b-col class="mx-auto" cols="12"><app-sidebar></app-sidebar></b-col>
               </b-row>
            </b-col>
            <b-col lg="10" md="9" cols="12"  v-if="isUserLoaded">
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
        isUserLoaded() {
            console.log('isloaded', this.$store.state.isUserLoaded)
            return this.$store.state.isUserLoaded
        }
    },

    created: function () {
            console.log('creating isloaded', this.$store.state.isUserLoaded)
        
        this.$store.dispatch('user');
    }
}
</script>

<style scoped>
.container {
    max-width: 100%;
    background: white;
}
.mt-50 {
    margin-top: 20em;
}
</style>

