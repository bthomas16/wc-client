<template>
    <b-container class="p0 full">
       <b-row>
            <b-col xs="7 pr0" md="4" class="border">
               <app-profile-info :User="GetUser"></app-profile-info>
            </b-col>
            <b-col xs="12" md="8" class="border" >
                <app-collection :collection="collection"></app-collection>
            </b-col>
       </b-row>
       <b-row>
           <b-col class="d-none d-md-block" md="3"><app-sidebar></app-sidebar></b-col>
           <b-col cols="12" md="9" class="p2"><app-feed></app-feed></b-col>
       </b-row>
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
            jwt: localStorage.getItem('watchJwt'),
            collection: 
            [
                {id: 0, title: 'Big Title', src: 'src1'},
                {id: 1, title: 'Bigger Title', src: 'src2'},
                {id: 2, title: 'Big Title', src: 'src1'},
                {id: 3, title: 'Big Title', src: 'src1'},
                {id: 4, title: 'Big Title', src: 'src1'},
                {id: 5, title: 'Big Title', src: 'src1'},
                {id: 6, title: 'Big Title', src: 'src1'},
                {id: 7, title: 'Big Title', src: 'src1'}
            ]
        }
    },
    computed: {
        GetUser: function() {
            return this.$store.state.User
        }
    },
    created: function () {
        console.log('created hook')
        this.$store.dispatch('user');
    }
}
</script>

<style>
    .pr0 {
        padding-right: 0 !important;
    }
</style>

