<template>
    <b-container fluid class="p-0 m-0" >
        <b-row align-v="center" align-h="center" class="p-0 mx-auto py-3">
            <b-col cols="5" lg="8" md="12" class="m-0 mx-auto pt-lg-1">
                <b-img :src="profPic" fluid style="height: auto; max-height: 200px;" class="profPic" rounded="circle"></b-img>
            </b-col>
            <b-col cols="7" lg="12" md="12" class="left mx-auto p-0 pl-2 mt-2" >
                    <b-col class="p0 ml-1 h4 bold">{{User.firstName}} {{User.lastName}}</b-col>  
                    <b-col class="p0 ml-1">Rating</b-col>              
                    <b-col class="p0 ml-1"><strong>(4)</strong> Watches for Trade</b-col>
                    <b-col class="p0 ml-1"><strong>(19)</strong> Trades</b-col>
                    <b-col class="p0 ml-1"><strong>(16)</strong> Watches for Sale</b-col>
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
    },
    data () {
        return {
profPic: "http://www.bistiproofpage.com/wp-content/uploads/2018/04/cute-profile-pics-for-whatsapp-images.png"
        }
    },
    methods: {
        
    }
}
</script>

<style>

.profPic {
    border: 3px soldi green;
}

@media(max-width:350px){
    .profPic {
        height:140px;
    }
}
  
</style>