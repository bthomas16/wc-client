<template>
    <b-container>
        <b-row align-v="center" align-h="center" class="py-3" >
            <b-col cols="5" sm="4" md="12" class="m-0 mx-auto center pt-lg-1">
                <b-img :src="profPic" fluid style="height: auto; max-height: 125px;" class="profPic mx-auto box-shadow" rounded="circle"></b-img>
            </b-col>
            <b-col cols="7" sm="7" md="12" class="left mx-auto p-0 pl-2 mt-2" >
                <!-- {{state}} -->
                <p class="p-0 my-1 ml-1 h5 bold">{{User.firstName}} {{User.lastName}}</p>
                <!-- <b-col class="p-0 my-1 ml-1 h4">Rating</b-col>               -->
                <p class="p-0 my-1 mt-2 ml-1 m-h5 h7"><strong>({{Collection.length || 0}})</strong> Watches Total</p>
                <p class="p-0 my-1 ml-1 m-h5 h7"><strong>({{watchesForTrade.length || 0}})</strong> Watches FSOT</p>
                <p class="p-0 my-1 ml-1 m-h5 h7"><strong>({{Favorites.length || 0}})</strong> Watches Favorited</p>
            </b-col>
            
        </b-row>
    </b-container>
</template>

<script>
    import axios from 'axios';
    export default {
    data () {
        return {
            profPic: "http://www.bistiproofpage.com/wp-content/uploads/2018/04/cute-profile-pics-for-whatsapp-images.png"
        }
    },
    methods: {
        
    },
    computed: {
        User() {
            return this.$store.state.User
        },

        Collection() {
            return this.$store.getters.getCollection;
        },

        watchesForTrade() {
            let Collection = this.$store.getters.getCollection;
            let filteredCollection = Collection.filter(watch => {
                if(watch.isForSale || watch.isForTrade) return watch;
            })
            return filteredCollection;
        },

        Favorites() {
            return this.$store.state.Favorites;
        }
    }
}
</script>

<style scoped>

.profPic {
    border: 2px solid lightgray;
}

@media(max-width:350px){
    .profPic {
        height:140px;
    }

}
  
</style>