<template>
    <b-container class="p0 full">
       <b-row>
            <b-col xs="7 pr0" md="4" class="border">
               <app-profile-info :User="User.user"></app-profile-info>
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
import Cookies from '../../State/cookies.js';


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
            profPic: 'http://www.bistiproofpage.com/wp-content/uploads/2018/04/cute-profile-pics-for-whatsapp-images.png',
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
            ],
            User: Cookies.GetCookies('User')
        }
    },
    computed: {
        GetJwt() {
            return localStorage.getItem('watchJwt');
        }
    }
}
</script>

<style>
    .pr0 {
        padding-right: 0 !important;
    }
</style>


// created: function () {
        
//         return this.$store.dispatch('user', this.GetJwt).then(res => {
//             this.User = this.$store.getters.getUser;
//         }).catch(err => {
//             console.log(err, 'oops')
//         })
//     },

