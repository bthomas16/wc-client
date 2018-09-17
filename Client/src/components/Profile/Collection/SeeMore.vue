<template>
    <b-container>
        <!-- <b-row align-h="center" v-if="selectedWatch.src">
            <b-col cols="8" class="mx-auto pb-3 border-bottom">
                <b-img :src="selectedWatch.src" fluid></b-img>
            </b-col>
        </b-row> -->
        <b-row align-h="start">
            <b-col class="mt-3" cols="12">
                <b-row align-v="center">
                    <b-col cols="6">
                        <h5 class="m-0 p-0">Specs:</h5>
                    </b-col>
                    <b-col cols="5" class="border p-2" v-if="!isFeaturedWatch">
                        <!-- <strong>Condition:</strong><span class="brown ml-4"> {{selectedWatch.condition || 10}}/10</span>  -->
                    </b-col>
                    <b-col cols="5" class="nowrap p-2" v-if="isFeaturedWatch">
                        <a class="brown ml-4 link" href="https://www.ebay.com">Shop {{selectedWatch.name}}</a>
                    </b-col>
                </b-row>
                <ul class="mt-2">
                    <li v-if="selectedWatch.brand">
                        <strong>Brand:</strong>
                        <span> {{selectedWatch.brand}}</span>
                    </li>
                    <li v-if="selectedWatch.name">
                        <strong>Name:</strong>
                        <span> {{selectedWatch.name}}</span>
                    </li>
                    <li v-if="selectedWatch.value">
                        <strong>Value:</strong>
                        <strong class="green">${{selectedWatch.value}}</strong>
                    </li>
                    <li v-if="selectedWatch.movementType">
                        <strong>Movement Type:</strong>
                        <span> {{selectedWatch.movementType}}</span>   
                    </li>
                    <li v-if="selectedWatch.movement">
                        <strong>Movement:</strong>
                        <span> {{selectedWatch.movement}}</span>   
                    </li>
                    <li v-if="selectedWatch.sizeWidth && selectedWatch.sizeHeight">
                        <strong>Size:</strong>
                        <span> {{selectedWatch.sizeWidth}}mm x {{selectedWatch.sizeHeight}}mm</span>
                    </li>
                    <li v-if="selectedWatch.crystal">
                        <strong>Crystal:</strong>
                        <span> {{selectedWatch.crystal}}</span>   
                    </li>
                    <li v-if="selectedWatch.isFullKit">
                        <strong>Full Kit:</strong>
                        <span> {{selectedWatch.isFullKit ? 'Yes' : 'No'}}</span>   
                    </li>
                    <li v-if="selectedWatch.band">
                        <strong>Band:</strong>
                        <span> {{selectedWatch.band}}</span>   
                    </li>
                    <li v-if="selectedWatch.model">
                        <strong>Model #:</strong>
                        <span> {{selectedWatch.model}}</span>
                    </li>
                    <li v-if="selectedWatch.ref">
                        <strong>Ref #:</strong>
                        <span> {{selectedWatch.ref}}</span>
                    </li>
                    <li v-if="selectedWatch.accuracy">
                        <strong>Accuracy:</strong>
                        <span>+/- {{selectedWatch.accuracy}} seconds</span>
                    </li>
                    <li v-if="selectedWatch.forSalePrice">
                        <strong>For Sale Price:</strong>
                        <span class="green">${{selectedWatch.forSalePrice}}</span>
                    </li>
                    <li v-if="selectedWatch.forTradeValue">
                        <strong>For Trade Value:</strong>
                        <span class="brown">${{selectedWatch.forTradeValue}}</span>
                    </li>
                </ul>
                <h5 v-if="selectedWatch.descriptionNotes">{{selectedWatch.descriptionNotes}}</h5>
                
            </b-col>

            
            <b-col class="mt-3" cols="12" v-if="isUsersWatch">
            <h6 class="lightgray mx-auto mt-2">This section is only visible to you</h6>                        
            <b-col v-if="!isEdit" cols="8" class="border-bottom mx-auto"></b-col>
                <b-row align-v="center">
                    <b-col cols="6">
                        <h5>Keeping House:</h5>
                    </b-col>
                    <b-col cols="5" class="border p-2">
                        <strong>Turnaround:</strong><span class="green ml-4"> ${{selectedWatch.lowestOfferAccepting - selectedWatch.acquiredFor}}</span> 
                    </b-col>
                </b-row>
                <ul>
                    <li>
                        <strong>Acuired For:</strong>
                        <span class="red"> -${{selectedWatch.acquiredFor}}</span>
                    </li>
                    <li>
                        <strong>Lowest Offer Accepting:</strong>
                        <span class="brown"> ${{selectedWatch.lowestOfferAccepting}}</span>
                    </li>
                    <li>
                        <strong>Date Acquired:</strong>
                        <span> {{selectedWatch.dateAcquired}}</span>
                    </li>
                </ul>
                <b-form-textarea id="ownerNotes"
                    placeholder="Description Notes"
                    :rows="3"
                    :max-rows="6"
                    :value="selectedWatch.ownerNotes">
                </b-form-textarea>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import axios from 'axios';

export default {
    name: 'seeMoreModal',
    props: ['selectedWatch', 'isEdit', 'isFeaturedWatch'],

    data () {
        return {
            isUsersWatch: false
        }
        
    },
    methods: {

        

    }
}
</script>

<style>



</style>

