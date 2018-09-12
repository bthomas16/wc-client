<template>
    <b-container>
        <b-row align-h="center">
            <b-col cols="8" class="mx-auto border-bottom">
                <b-img :src="selectedWatchObj.selectedWatch.src" fluid></b-img>
            </b-col>
        </b-row>
        <b-row align-h="start">
            <b-col class="mt-3" cols="12">
                <b-row align-v="center">
                    <b-col cols="6">
                        <h5>Specs:</h5>
                    </b-col>
                    <b-col cols="5" class="border p-2">
                        <strong>Condition:</strong><span class="brown ml-4"> {{selectedWatchObj.selectedWatch.condition}}/10</span> 
                    </b-col>
                </b-row>
                <ul>
                    <li>
                        <strong>Brand:</strong>
                        <span> {{selectedWatchObj.selectedWatch.brand}}</span>
                    </li>
                    <li>
                        <strong>Name:</strong>
                        <span> {{selectedWatchObj.selectedWatch.name}}</span>
                    </li>
                    <li>
                        <strong>Value:</strong>
                        <strong class="green">${{selectedWatchObj.selectedWatch.value}}</strong>
                    </li>
                    <li>
                        <strong>Movement Type:</strong>
                        <span> {{selectedWatchObj.selectedWatch.movementType}}</span>   
                    </li>
                    <li>
                        <strong>Movement:</strong>
                        <span> {{selectedWatchObj.selectedWatch.movement}}</span>   
                    </li>
                    <li>
                        <strong>Size:</strong>
                        <span> {{selectedWatchObj.selectedWatch.sizeWidth}}mm x {{selectedWatchObj.selectedWatch.sizeHeight}}mm</span>
                    </li>
                    <li>
                        <strong>Crystal:</strong>
                        <span> {{selectedWatchObj.selectedWatch.crystal}}</span>   
                    </li>
                    <li>
                        <strong>Full Kit:</strong>
                        <span> {{selectedWatchObj.selectedWatch.isFullKit ? 'Yes' : 'No'}}</span>   
                    </li>
                    <li>
                        <strong>Band:</strong>
                        <span> {{selectedWatchObj.selectedWatch.band}}</span>   
                    </li>
                    <li>
                        <strong>Model #:</strong>
                        <span> {{selectedWatchObj.selectedWatch.model}}</span>
                    </li>
                    <li>
                        <strong>Ref #:</strong>
                        <span> {{selectedWatchObj.selectedWatch.ref}}</span>
                    </li>
                    <li>
                        <strong>Accuracy:</strong>
                        <span>+/- {{selectedWatchObj.selectedWatch.accuracy}} seconds</span>
                    </li>
                    <li>
                        <strong>For Sale Price:</strong>
                        <span class="green">${{selectedWatchObj.selectedWatch.forSalePrice}}</span>
                    </li>
                    <li>
                        <strong>For Trade Value:</strong>
                        <span class="brown">${{selectedWatchObj.selectedWatch.forTradeValue}}</span>
                    </li>
                </ul>
                <h5>{{selectedWatchObj.selectedWatch.descriptionNotes}}</h5>
                
            </b-col>
            <b-col v-if="!isEditMode" cols="8" class="border-bottom mx-auto"></b-col>

            <h6 class="lightgray mx-auto mt-2">This section is only visible to you</h6>                        
            
            <b-col class="mt-3" cols="12">
                <b-row align-v="center">
                    <b-col cols="6">
                        <h5>Keeping House:</h5>
                    </b-col>
                    <b-col cols="5" class="border p-2">
                        <strong>Turnaround:</strong><span class="green ml-4"> ${{selectedWatchObj.selectedWatch.lowestOfferAccepting - selectedWatchObj.selectedWatch.acquiredFor}}</span> 
                    </b-col>
                </b-row>
                <ul>
                    <li>
                        <strong>Acuired For:</strong>
                        <span class="red"> -${{selectedWatchObj.selectedWatch.acquiredFor}}</span>
                    </li>
                    <li>
                        <strong>Lowest Offer Accepting:</strong>
                        <span class="brown"> ${{selectedWatchObj.selectedWatch.lowestOfferAccepting}}</span>
                    </li>
                    <li>
                        <strong>Date Acquired:</strong>
                        <span> {{selectedWatchObj.selectedWatch.dateAcquired}}</span>
                    </li>
                </ul>
                <b-form-textarea id="ownerNotes"
                    placeholder="Description Notes"
                    :rows="3"
                    :max-rows="6"
                    :value="selectedWatchObj.selectedWatch.ownerNotes">
                </b-form-textarea>
            </b-col>
        </b-row>
        <div slot="modal-footer" class="w-100">
            <b-btn size="sm" class="float-right" variant="primary" @click="submitWatch" v-if="selectedWatchObj.isEdit">
                Submit
            </b-btn>
            <b-btn size="sm" class="float-right" variant="primary" v-b-modal.see-more-modal.close v-else>
                Ok
            </b-btn>
        </div>
    </b-container>
</template>

<script>
import axios from 'axios';

export default {
    name: 'seeMoreModal',
    props: {
        selectedWatchObj: {}
    },

    data () {
        return {
            isEditMode: false
        }
        
    },
    methods: {

        submitWatch() {
            console.log('will be submitting this watch', this.addWatch)
            this.isEdit = false;
            this.$store.dispatch('submitWatch', this.addWatch).then(() => {
                this.addWatch = {}
            })
        }

    }
}
</script>

<style>



</style>

