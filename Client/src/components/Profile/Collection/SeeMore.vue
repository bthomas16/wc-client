<template>
    <b-container fluid>

        <b-modal id="seeMoreModal"
            :title="selectedWatch.name">
            <b-container fluid>
                <b-row align-h="center">
                    <b-col cols="8" class="mx-auto border-bottom">
                        <b-img :src="selectedWatch.src" fluid></b-img>
                    </b-col>
                </b-row>
                <b-row align-h="start">
                    <b-col class="mt-3" cols="12">
                        <b-row align-v="center">
                            <b-col cols="6">
                                <h5>Specs:</h5>
                            </b-col>
                            <b-col cols="5" class="border p-2">
                                <strong>Condition:</strong><span class="brown ml-4"> {{selectedWatch.condition}}/10</span> 
                            </b-col>
                        </b-row>
                        <ul>
                            <li>
                                <strong>Brand:</strong>
                                <span> {{selectedWatch.brand}}</span>
                            </li>
                            <li>
                                <strong>Name:</strong>
                                <span> {{selectedWatch.name}}</span>
                            </li>
                            <li>
                                <strong>Value:</strong>
                                <strong class="green">${{selectedWatch.value}}</strong>
                            </li>
                            <li>
                                <strong>Movement Type:</strong>
                                <span> {{selectedWatch.movementType}}</span>   
                            </li>
                            <li>
                                <strong>Movement:</strong>
                                <span> {{selectedWatch.movement}}</span>   
                            </li>
                            <li>
                                <strong>Size:</strong>
                                <span> {{selectedWatch.sizeWide}}mm x {{selectedWatch.sizeHeight}}mm</span>
                            </li>
                            <li>
                                <strong>Crystal:</strong>
                                <span> {{selectedWatch.crystal}}</span>   
                            </li>
                            <li>
                                <strong>Full Kit:</strong>
                                <span> {{selectedWatch.isFullKit ? 'Yes' : 'No'}}</span>   
                            </li>
                            <li>
                                <strong>Band:</strong>
                                <span> {{selectedWatch.band}}</span>   
                            </li>
                            <li>
                                <strong>Model #:</strong>
                                <span> {{selectedWatch.model}}</span>
                            </li>
                            <li>
                                <strong>Ref #:</strong>
                                <span> {{selectedWatch.ref}}</span>
                            </li>
                            <li>
                                <strong>Accuracy:</strong>
                                <span>+/- {{selectedWatch.accuracy}} seconds</span>
                            </li>
                            <li>
                                <strong>For Sale Price:</strong>
                                <span class="green">${{selectedWatch.forSalePrice}}</span>
                            </li>
                            <li>
                                <strong>For Trade Value:</strong>
                                <span class="brown">${{selectedWatch.forTradeValue}}</span>
                            </li>
                        </ul>
                        <h5>{{selectedWatch.descriptionNotes}}</h5>
                        
                    </b-col>
                    <b-col cols="8" class="border-bottom mx-auto"></b-col>

                    <h6 class="lightgray mx-auto mt-2">This section is only visible to you</h6>                        
                    
                    <b-col class="mt-3" cols="12">
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
        </b-modal>


    </b-container>
</template>

<script>
import axios from 'axios';

export default {
    data () {
        return {
            emptyHeart: "https://png.icons8.com/metro/1600/like.png",
            fullHeart: "https://png.icons8.com/metro/1600/like.png",
            selectedWatch: this.$store.getters.getSelectedWatch
        }
    }
}
</script>

<style>



</style>

