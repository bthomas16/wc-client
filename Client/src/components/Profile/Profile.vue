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
                <app-collection :collection="collection"></app-collection>
            </b-col>
       </b-row>
       <b-row class="mr-0">
           <b-col cols="12" md="9"><app-feed></app-feed></b-col>
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
            collection: {
                name: "Boppity's Beuaitful Collection",
                totalValue: "$4,756",
                favoritePiece: 4,
                pieces:
                [
                    {
                        id: 0,
                        brand: "Rolex",
                        name: 'Rolex Submariner',
                        ref: 'jhg23424Silv__hg23424Silv___#$2r_#$2r',
                        model: 'Model_Number_Fake675869780',
                        acquiredFor: 469,
                        lowestOfferAccepting: 525,
                        dateAcquired: '4/11/17',
                        condition: 8.5,
                        isFullKit: true,
                        sizeWide: 41,
                        sizeHeight: 12,
                        movement: 'ETA 2824-2',
                        movementType: 'Automatic',
                        crystal: 'Sapphire, Domed Crystal',
                        band: 'Black Crocoidla Leather',
                        value: 590,
                        accuracy: '4',
                        forSalePrice: 575,
                        forTradeValue: 590,
                        src: 'https://n3.sdlcdn.com/imgs/e/v/o/SDL044502225_1-6ee47.jpg'
                     },
                     {
                        id: 1,
                        brand: "Omega",
                        name: 'Omega Planet Ocean',
                        ref: 'jhg23424Silv__hg23424Silv___#$2r_#$2r',
                        model: 'Model_Number_Fake675869780',
                        acquiredFor: 469,
                        lowestOfferAccepting: 525,
                        dateAcquired: '4/11/17',
                        condition: 8.5,
                        isFullKit: true,
                        sizeWide: 41,
                        sizeHeight: 12,
                        movement: 'ETA 2824-2',
                        crystal: 'Sapphire, Domed Crystal',
                        band: 'Black Crocoidla Leather',
                        value: 590,
                        accuracy: '4',
                        forSalePrice: 575,
                        forTradeValue: 590,
                        src: 'https://n3.sdlcdn.com/imgs/e/v/o/SDL044502225_1-6ee47.jpg'
                     },
                     {
                        id: 2,
                        brand: "Rolex",
                        name: 'Rolex Submariner',
                        ref: 'jhg23424Silv__hg23424Silv___#$2r_#$2r',
                        model: 'Model_Number_Fake675869780',
                        acquiredFor: 469,
                        lowestOfferAccepting: 525,
                        dateAcquired: '4/11/17',
                        condition: 8.5,
                        isFullKit: true,
                        sizeWide: 41,
                        sizeHeight: 12,
                        movement: 'ETA 2824-2',
                        movementType: 'Automatic',
                        crystal: 'Sapphire, Domed Crystal',
                        band: 'Black Crocoidla Leather',
                        value: 590,
                        accuracy: '4',
                        forSalePrice: 575,
                        forTradeValue: 590,
                        src: 'https://n3.sdlcdn.com/imgs/e/v/o/SDL044502225_1-6ee47.jpg'
                     },
                     {
                        id: 3,
                        brand: "Rolex",
                        name: 'Rolex Submariner',
                        ref: 'jhg23424Silv__hg23424Silv___#$2r_#$2r',
                        model: 'Model_Number_Fake675869780',
                        acquiredFor: 469,
                        lowestOfferAccepting: 525,
                        dateAcquired: '4/11/17',
                        condition: 8.5,
                        isFullKit: true,
                        sizeWide: 41,
                        sizeHeight: 12,
                        movement: 'ETA 2824-2',
                        movementType: 'Automatic',
                        crystal: 'Sapphire, Domed Crystal',
                        band: 'Black Crocoidla Leather',
                        value: 590,
                        accuracy: '4',
                        forSalePrice: 575,
                        forTradeValue: 590,
                        src: 'https://n3.sdlcdn.com/imgs/e/v/o/SDL044502225_1-6ee47.jpg'
                     },
                     {
                        id: 4,
                        brand: "Rolex",
                        name: 'Rolex Submariner',
                        ref: 'jhg23424Silv__hg23424Silv___#$2r_#$2r',
                        model: 'Model_Number_Fake675869780',
                        acquiredFor: 469,
                        lowestOfferAccepting: 525,
                        dateAcquired: '4/11/17',
                        condition: 8.5,
                        isFullKit: true,
                        sizeWide: 41,
                        sizeHeight: 12,
                        movement: 'ETA 2824-2',
                        movementType: 'Automatic',
                        crystal: 'Sapphire, Domed Crystal',
                        band: 'Black Crocoidla Leather',
                        value: 590,
                        accuracy: '4',
                        forSalePrice: 575,
                        forTradeValue: 590,
                        src: 'https://n3.sdlcdn.com/imgs/e/v/o/SDL044502225_1-6ee47.jpg'
                     },
                     {
                        id: 5,
                        brand: "Rolex",
                        name: 'Rolex Submariner',
                        ref: 'jhg23424Silv__hg23424Silv___#$2r_#$2r',
                        model: 'Model_Number_Fake675869780',
                        acquiredFor: 469,
                        lowestOfferAccepting: 525,
                        dateAcquired: '4/11/17',
                        condition: 8.5,
                        isFullKit: true,
                        sizeWide: 41,
                        sizeHeight: 12,
                        movement: 'ETA 2824-2',
                        movementType: 'Automatic',
                        crystal: 'Sapphire, Domed Crystal',
                        band: 'Black Crocoidla Leather',
                        value: 590,
                        accuracy: '4',
                        forSalePrice: 575,
                        forTradeValue: 590,
                        src: 'https://n3.sdlcdn.com/imgs/e/v/o/SDL044502225_1-6ee47.jpg'
                     },
                     {
                        id: 6,
                        brand: "Rolex",
                        name: 'Rolex Submariner',
                        ref: 'jhg23424Silv__hg23424Silv___#$2r_#$2r',
                        model: 'Model_Number_Fake675869780',
                        acquiredFor: 469,
                        lowestOfferAccepting: 525,
                        dateAcquired: '4/11/17',
                        condition: 8.5,
                        isFullKit: true,
                        sizeWide: 41,
                        sizeHeight: 12,
                        movement: 'ETA 2824-2',
                        movementType: 'Automatic',
                        crystal: 'Sapphire, Domed Crystal',
                        band: 'Black Crocoidla Leather',
                        value: 590,
                        accuracy: '4',
                        forSalePrice: 575,
                        forTradeValue: 590,
                        src: 'https://n3.sdlcdn.com/imgs/e/v/o/SDL044502225_1-6ee47.jpg'
                     },
                     {
                        id: 7,
                        brand: "Rolex",
                        name: 'Rolex Submariner',
                        ref: 'jhg23424Silv__hg23424Silv___#$2r_#$2r',
                        model: 'Model_Number_Fake675869780',
                        acquiredFor: 469,
                        lowestOfferAccepting: 525,
                        dateAcquired: '4/11/17',
                        condition: 8.5,
                        isFullKit: true,
                        sizeWide: 41,
                        sizeHeight: 12,
                        movement: 'ETA 2824-2',
                        movementType: 'Automatic',
                        crystal: 'Sapphire, Domed Crystal',
                        band: 'Black Crocoidla Leather',
                        value: 590,
                        accuracy: '4',
                        forSalePrice: 575,
                        forTradeValue: 590,
                        src: 'https://n3.sdlcdn.com/imgs/e/v/o/SDL044502225_1-6ee47.jpg'
                     },
                     {
                        id: 8,
                        brand: "Rolex",
                        name: 'Rolex Submariner',
                        ref: 'jhg23424Silv__hg23424Silv___#$2r_#$2r',
                        model: 'Model_Number_Fake675869780',
                        acquiredFor: 469,
                        lowestOfferAccepting: 525,
                        dateAcquired: '4/11/17',
                        condition: 8.5,
                        isFullKit: true,
                        sizeWide: 41,
                        sizeHeight: 12,
                        movement: 'ETA 2824-2',
                        movementType: 'Automatic',
                        crystal: 'Sapphire, Domed Crystal',
                        band: 'Black Crocoidla Leather',
                        value: 590,
                        accuracy: '4',
                        forSalePrice: 575,
                        forTradeValue: 590,
                        src: 'https://n3.sdlcdn.com/imgs/e/v/o/SDL044502225_1-6ee47.jpg'
                     }
                ]
            }
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
.mt-50 {
    margin-top: 20em;
}
</style>

