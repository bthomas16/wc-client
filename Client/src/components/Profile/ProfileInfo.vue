<template>
    <b-container>
        <b-row align-v="center" align-h="center">
            <b-col cols="4" sm="3" md="12" class="border center text-center">
                <!-- <b-img rounded="circle" v-bind:src="User.profPic" fluid style="min-width: 80px; max-width: 35%;"></b-img> -->
            </b-col>
            <b-col cols="8 nowrap p0" sm="6" md="12" class="d-xs-none d-sm-block">
                <b-col cols="12 nowrap">{{User.firstName}} {{User.lastName}}</b-col>                
                <b-col cols="12 nowrap">Rating</b-col>
                <b-col cols="12 nowrap"># Trades</b-col>
                <b-col cols="12 nowrap">(4) Watches For Trade</b-col>
                <b-col cols="12 nowrap">(9) Watches for Sale</b-col>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import axios from 'axios';
    export default {
    props: {
        User: 
        {
            firstName: String,
            lastName: String,
            email: String,
            profPic: String,
            required: true
        }
    }
}
</script>

<style>
  
</style>