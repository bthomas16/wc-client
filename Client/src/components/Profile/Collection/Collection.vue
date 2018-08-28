<template>
    <b-container>
       <b-row align-h="center">
           <!-- <b-col cols="m3 border" xs="3" sm="2" md="2 m2"
           class="watch border m3"
            v-for="(watch) in collection" 
            :collection="collection" 
            :key="watch.id"
            >
                {{watch.src}}
           </b-col> -->
       </b-row>
    </b-container>
</template>

<script>
import axios from 'axios';

export default {
    // props: {
    //     collection: 
    //     {
    //         src: {
    //             type: String,
    //             required: true
    //         },
    //         title: {
    //             type: String,
    //             required: true
    //         },
    //         id: {
    //             type: Number,
    //             required: true
    //         }
    //     }
    // }
    // created: function() {
    //         this.jwt = localStorage.getItem('watchJwt');
    //         if(this.jwt !=  null) {
    //             console.log(this.jwt)
    //             this.hasJWT = true;
    //             axios.get('/api/user/profile/', {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'authorization': this.jwt
    //                 }
    //             })
    //             .then(res => {
    //             this.user = res.data.user[0];
    //             this.validJwt = res.data.validJwt;
    //         })
    //     }
    // }
    
}
</script>

<style>
@media(max-width: 767px) {
    .watch:nth-child(1n + 1) {
        display:none;
    }
}
   
    .pr0 {
        padding-right: 0 !important;
    }
</style>


<!-- b-form-1.vue -->

