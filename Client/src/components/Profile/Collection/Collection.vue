<template>
    <b-container id="collection-container bg-lightgray" fluid>
        <!-- WATCH COLLECTION SUMMARY -->
        <!-- WATCH COLLECTION SUMMARY -->
        <!-- WATCH COLLECTION SUMMARY -->
        <!-- WATCH COLLECTION SUMMARY -->

    <b-row v-if="hasWatchesCollection" class="p0">
        <b-row class="border-bottom mb-3 py-2 mx-2 ml-4" align-v="center">
            <b-col sm="7" xs="12" class="ml-2">
                <h3>{{userName}} Collection</h3>
            </b-col>
            <b-col class="ml-2">
                <b-row>
                    <b-col>
                        <b-col class="m-0 p-0 my-2 mb-md-3 ">
                             <h5>Favorite Piece: <strong>Rolex Submariner</strong> </h5> 
                        </b-col>
                        <b-col class="p-0">
                            <h5>  Total Value: <strong class="green">{{getCollectionTotalValue}}</strong> </h5>
                        </b-col>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>


        <!-- FILTER WATCH ARRAY / RESULTS -->
        <!-- FILTER WATCH ARRAY / RESULTS -->
        <!-- FILTER WATCH ARRAY / RESULTS -->
        <!-- FILTER WATCH ARRAY / RESULTS -->
        <!-- FILTER WATCH ARRAY / RESULTS -->
        
        <b-row class="px-4">
            <b-col cols="auto"  class="manage-btn-border pb-2 ml-2">
                <b-button variant="primary" v-b-modal.add-watch-modal>Manage</b-button>
            </b-col>
            <b-col class="ml-2">
                <b-row align-v="end">
                    <b-col>
                        <b-row>
                            <b-col cols="12" class="d-md-none" align-self="end" >
                                Filter By:
                            </b-col>
                            <b-col class="mt-0" block>
                                <b-dropdown id="ddown-divider" :text="filterBy" variant="info">
                                    <b-dropdown-item-button>First item</b-dropdown-item-button>
                                    <b-dropdown-item-button>Second item</b-dropdown-item-button>
                                    <b-dropdown-divider></b-dropdown-divider>
                                    <b-dropdown-item-button>Separated Item</b-dropdown-item-button>
                                </b-dropdown>
                            </b-col>
                        </b-row>
                    </b-col>
                    
                    <b-col lg="5" sm="12" xs="12" order="3" order-lg="2">
                        <b-input-group class="mt-2 mt-lg-0" prepend="&#9906;">
                            <b-form-input type="text" placeholder="Search"></b-form-input>
                        </b-input-group>
                    </b-col>
                    <b-col lg="4" md="4" sm="6" cols="6" order="2" order-lg="3">
                        <b-row align-v="center" align-h="start">
                            <b-col lg="4" md="6" sm="6">
                                Results:
                            </b-col>
                            <b-col md="6" sm="12" block>
                                <b-form-input placeholder="8" type="number" block></b-form-input>
                            </b-col>
                        </b-row>      
                    </b-col>
                </b-row>
            </b-col>
        </b-row>


        <!-- LOOP THROUGH WATCHES -->
        <!-- LOOP THROUGH WATCHES -->
        <!-- LOOP THROUGH WATCHES -->

       <b-row align-h="center" class="px-3 pl-4">
           <b-col md="5" cols="12"
           class="watch border p-0 m-2 ml-3"
            v-for="(watch) in Collection"   
            :key="watch.id"
            >
                <b-row align-v="start" align-h="center" class="p-3">
                    <b-col sm="12" xs="4" class="order-1">
                        <b-row align-v="start" aling-h="start" class="pr-2 pr-sm-0">
                            <b-col cols="7" class="mx-auto p-0">
                                <b-img src="https://www.bremont.com/images/collection/_1000x600_fit_center-center/AIRCO-MACH-3-BL-FRONT-1_180226_104014.png" fluid></b-img>
                            </b-col>
                            <b-col cols="5">
                                <b-row align-h="end" class="pr-2">
                                    <h6><strong>{{watch.name}}</strong></h6>
                                    <b-col cols="12" class="mt-5 px-1">
                                        <b-button variant="outline-info" size="" block v-b-modal.see-more-modal @click="selectWatch(watch)">See More</b-button>
                                    </b-col>
                                    <b-col cols="12" class="px-1 h6"> 
                                        <b-button id="searchRef" variant="primary" class="mt-2" size="sm" block>Search Ref #</b-button>   
                                    </b-col>
                                    <b-row align-h="end" align-v="center">
                                        <b-col class="pointer">
                                            <b-img :src="emptyHeart" width="40px;"></b-img> 
                                        </b-col>
                                    </b-row>
                                </b-row>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
           </b-col>
       </b-row>
    </b-row>

    <!-- START WATCH COLLECTION -->
    <!-- START WATCH COLLECTION -->

    <b-row v-else align-h="center">
        <b-col cols="11" md="8" class="ml-3 border my-5 center p-5" id="begin-collection">
            <h3 class="center">Welcome to the WATCH COLLECTION!</h3>  
            <h5 class="mt-5">Let's get you started by adding a few watches to your collection</h5>
            <b-row>
                <b-col cols="6" class="mx-auto my-3">
                        <b-button variant="success" class="my-2" size="lg" v-b-modal.add-watch-modal block>Okay!</b-button>
                        <b-button variant="warning" class="my-3" size="sm" v-b-modal.add-watch-modal block>Do I have to?</b-button>
                </b-col>
            </b-row>
        </b-col>
    </b-row>

    <!-- SEE MORE MODAL SEE MORE  MODAL SEE MORE  MODAL -->
       <!-- SEE MORE MODAL SEE MORE  MODAL SEE MORE  MODAL -->
       <!-- SEE MORE MODAL SEE MORE  MODAL SEE MORE  MODAL -->
       <!-- SEE MORE MODAL SEE MORE  MODAL SEE MORE  MODAL -->

    <b-modal ref="seeMoreModal" id="see-more-modal"
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
                <b-col v-if="!isEditMode" cols="8" class="border-bottom mx-auto"></b-col>

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
         <div slot="modal-footer" class="w-100">
            <b-btn size="sm" class="float-right" variant="primary" @click="submitWatch" v-if="isEditMode">
                Submit
            </b-btn>
            <b-btn size="sm" class="float-right" variant="primary" v-b-modal.see-more-modal.close v-if="isEditMode">
                Ok
            </b-btn>
        </div>
    </b-modal>


    <!-- ADD WATCH MODAL   ADD WATCH MODAL   ADD WATCH MODALL
    ADD WATCH MODAL   ADD WATCH MODAL   ADD WATCH MODALL
    ADD WATCH MODAL   ADD WATCH MODAL   ADD WATCH MODALL -->

    <b-modal id="add-watch-modal"
        :title="addWatchTitle"
        ref="addWatchForm">
        <div slot="modal-header-close" class="w-100" @click="cancelAddWatchForm">
            X
        </div>
        <b-container fluid>


            <!-- Add Img Row -->

            <b-row align-h="center" align-v="center" :class="addWatch_Count == 1 ? '' : 'hidden'">
                <b-col cols="8" class="mx-auto border center">
                    <b-img id="add-img-div" src="http://localhost:8081/api/static-assets/add-img-icon.png" fluid></b-img>
                </b-col>
                <b-col cols="12"><h6 cols="12" class="center mt-3" >Add Some Images</h6></b-col>     
            </b-row>



            <!-- Add Specs Row -->

            <b-row align-h="start" id="add-specs" :class="addWatch_Count == 2 ? '' : 'hidden'">
                <b-col class="mt-3" cols="12">
                    <b-row align-v="center">
                        <b-col cols="6">
                            <h5>Specs:</h5>
                        </b-col>
                        <b-col cols="5" class="border p-2">
                            <strong>Condition:</strong><span class="brown ml-4"> {{selectedWatch.condition}}/10</span> 
                        </b-col>
                    </b-row>


                    <ul class="mt-3">
                        <li class="my-2">
                            <b-row align-v="center">
                                <b-col cols="4" >
                                    <strong>Brand:</strong>  
                                </b-col>
                                <b-col cols="8">
                                    <b-form-input v-model="addWatch.brand"
                                        type="text"
                                        placeholder="Watch Brand"
                                        description="Provide a brand for the watch"
                                        label="Watch Brand">
                                    </b-form-input>
                                </b-col>
                            </b-row>
                        </li>
                        <li class="my-2">
                            <b-row align-v="center">
                                <b-col cols="4" >
                                    <strong>Name:</strong>  
                                </b-col>
                                <b-col cols="8">
                                    <b-form-input v-model="addWatch.name"
                                        type="text"
                                        placeholder="Watch Name"
                                        description="Provide a name for the watch"
                                        label="Watch Name">
                                    </b-form-input>
                                </b-col>
                            </b-row>
                        </li>
                        <li class="my-2">
                            <b-row align-v="center">
                                <b-col cols="4" >
                                    <strong>Value:</strong>  
                                </b-col>
                                <b-col cols="8">
                                    <b-form-input v-model="addWatch.value"
                                        type="number"
                                        placeholder="Watch Value"
                                        description="Provide a value for the watch"
                                        label="Watch Value">
                                    </b-form-input>
                                </b-col>
                            </b-row>
                        </li>
                        <li class="my-3">
                            <b-row align-v="center">
                                <b-col cols="4" >
                                    <strong>Movement Type:</strong>  
                                </b-col>
                                <b-col cols="8">
                                    <b-form-group>
                                        <b-form-radio-group v-model="addWatch.movementType" name="radioSubComponent">
                                            <b-form-radio value="automatic">Automatic</b-form-radio>
                                            <b-form-radio value="manual">Manual</b-form-radio>
                                            <b-form-radio value="quartz">Quartz</b-form-radio>
                                            <b-form-radio value="quartz">Solar</b-form-radio>
                                        </b-form-radio-group>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                        </li>
                        <li class="my-3">
                            <b-row align-v="center">
                                <b-col cols="4" >
                                    <strong>Movement:</strong>  
                                </b-col>
                                <b-col cols="8">
                                    <b-form-input v-model="addWatch.movement"
                                        type="text"
                                        placeholder="Watch Movement"
                                        description="Provide a movement for the watch"
                                        label="Watch Movement">
                                    </b-form-input>
                                </b-col>
                            </b-row>   
                        </li>
                        <li class="my-2">
                            <b-row align-v="center">
                                <b-col cols="4">
                                    <strong>Size:</strong>  
                                </b-col>
                                <b-col cols="12" md="4" lg="3" class="sizeClass">
                                    <b-form-input v-model="addWatch.sizeWide"
                                        type="text"
                                        placeholder="Width (mm)"
                                        description="Provide a movement for the watch"
                                        label="Watch Movement">
                                    </b-form-input>
                                </b-col>
                                x
                                <b-col cols="12" md="4" lg="3" class="sizeClass">
                                    <b-form-input v-model="addWatch.sizeHeight"
                                        type="text"
                                        placeholder="Height (mm)"
                                        description="Provide a movement for the watch"
                                        label="Watch Movement">
                                    </b-form-input>
                                </b-col>
                            </b-row>
                        </li>
                        <li class="my-2">
                            <b-row align-v="center">
                                <b-col cols="12" md="4" >
                                    <strong>Crystal:</strong>  
                                </b-col>
                                <b-col cols="12" md="8">
                                    <b-form-group>
                                        <b-form-radio-group v-model="addWatch.isFullKit" name="isFullKit" class="mt-3">
                                            <b-form-radio value="Sapphire" class="m-1">Sapphire</b-form-radio>
                                            <b-form-radio value="Domed-Sapphire" class="m-1">Domed-Sapphire</b-form-radio>
                                            <b-form-radio value="Mineral" class="m-1">Mineral</b-form-radio>
                                            <b-form-radio value="Domed-Mineral" class="m-1">Domed-Mineral</b-form-radio>
                                        </b-form-radio-group>
                                    </b-form-group>
                                </b-col>
                            </b-row>   
                        </li>
                    </ul>
                </b-col>
            </b-row>

            <!-- SPECS PART 2 -->

                    <b-row :class="addWatch_Count == 3 ? '' : 'hidden'">
                        <ul>
                            <li>
                                <b-row align-v="center">
                                    <b-col cols="3" >
                                        <strong>Full Kit:</strong>  
                                    </b-col>
                                    <b-col cols="9">
                                        <b-form-group>
                                            <b-form-radio-group v-model="addWatch.isFullKit" name="isFullKit" class="mt-3">
                                                <b-form-radio value="Yes">Yes</b-form-radio>
                                                <b-form-radio value="No">No</b-form-radio>
                                            </b-form-radio-group>
                                        </b-form-group>
                                    </b-col>
                                </b-row>   
                            </li>
                            <li class="my-2">
                                <b-row align-v="center">
                                    <b-col cols="3" >
                                        <strong>Band:</strong>  
                                    </b-col>
                                    <b-col cols="9">
                                        <b-form-input v-model="addWatch.band"
                                            type="text"
                                            placeholder="Watch Band"
                                            description="Provide band details for this watch"
                                            label="Watch Band">
                                        </b-form-input>
                                    </b-col>
                                </b-row>   
                            </li>
                            <li class="my-2">
                                <b-row align-v="center">
                                    <b-col cols="3" >
                                        <strong>Model #:</strong>  
                                    </b-col>
                                    <b-col cols="9">
                                        <b-form-input v-model="addWatch.model"
                                            type="text"
                                            placeholder="Watch Model #"
                                            description="Provide a model number for this watch"
                                            label="Watch Model Number">
                                        </b-form-input>
                                    </b-col>
                                </b-row>   
                            </li>
                            <li class="my-2">
                                <b-row align-v="center">
                                    <b-col cols="3" >
                                        <strong>Ref #:</strong>  
                                    </b-col>
                                    <b-col cols="9">
                                        <b-form-input v-model="addWatch.ref"
                                            type="text"
                                            placeholder="Watch Reference #"
                                            description="Provide a reference number for this watch"
                                            label="Watch Reference Number">
                                        </b-form-input>
                                    </b-col>
                                </b-row>   
                            </li>
                            <li class="my-2">
                                <b-row align-v="center">
                                    <b-col cols="3" >
                                        <strong>Accuracy:</strong>  
                                    </b-col>
                                    <b-col cols="9">
                                        <b-form-input v-model="addWatch.accuracy"
                                            type="text"
                                            placeholder="Watch Accuracy"
                                            description="Provide timing accuracy for this watch"
                                            label="Watch Timing Accuracy">
                                        </b-form-input>
                                    </b-col>
                                </b-row>   
                            </li>
                            <li class="my-2">
                                <b-row align-v="center">
                                    <b-col cols="3" >
                                        <strong>For Sale Price:</strong>  
                                    </b-col>
                                    <b-col cols="9">
                                        <b-form-input v-model="addWatch.forSalePrice"
                                            type="text"
                                            placeholder="Watch Sale Price"
                                            description="Provide a sale price for this watch"
                                            label="Watch Sale Price">
                                        </b-form-input>
                                    </b-col>
                                </b-row>   
                            </li>
                            <li>
                                <b-row align-v="center">
                                    <b-col cols="3" >
                                        <strong>For Trade Value:</strong>  
                                    </b-col>
                                    <b-col cols="9">
                                        <b-form-input v-model="addWatch.forTradeValue"
                                            type="text"
                                            placeholder="Watch Trade Value"
                                            description="Provide a trade value for this watch"
                                            label="Watch Trade Value">
                                        </b-form-input>
                                    </b-col>
                                </b-row>   
                            </li>
                        </ul>
                    </b-row>
                    <h5>{{selectedWatch.descriptionNotes}}</h5>   



                <!-- Keeping House -->

                <b-row id="add-keeping-house" :class="addWatch_Count == 4 ? '' : 'hidden'">
                    <b-col cols="8" v-if="!isEditMode" class="border-bottom mx-auto"></b-col>

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
        <div slot="modal-footer" class="w-100">
            <b-btn size="sm" class="float-right" :class="addWatch_Count == 1 ? '' : 'hidden'" variant="primary" @click="addWatch_Count++">
                Add Specs
            </b-btn>
            <b-button variant="info" @click="addWatch_Count++" :class="addWatch_Count == 2 ? 'float-right' : 'hidden'">
                Continue Specs
            </b-button>
            <b-btn size="sm" class="float-right" :class="addWatch_Count == 3 ? '' : 'hidden'" variant="primary" @click="addWatch_Count++">
                Add Owner Details
            </b-btn>
            <b-btn size="sm" class="float-right" :class="addWatch_Count == 4 ? '' : 'hidden'" variant="primary" @click="previewWatch">
                Preview
            </b-btn>
        </div>
    </b-modal>


    </b-container>
</template>

<script>
import axios from 'axios';

export default {
    data () {
        return {
            filterBy: "Recently Added",
            emptyHeart: "http://localhost:8081/api/static-assets/empty-heart.png",
            fullHeart: "http://localhost:8081/api/static-assets/full-heart.png",
            selectedWatch: {},
            showDismissibleAlert: false,
            addWatchTitle: "Add your first watch!",
            addWatch_Count: 1,
            addWatch: {},
            isEditMode: false
        }
    },

    props: ['userName'],

    computed: { 

        hasWatchesCollection() {
            let status = this.$store.getters.getCollectionLength;
            if (status == 0) return false;
            return true;
        },

        checkNameEnding() {
            let name = this.userName;
            name.toLowerCase();
            let lastLetter = name.slice(-1);
            if(lastLetter == 's') return name + "' "
            else return name + "'s"
        },

        getCollectionTotalValue() {
            return 'Make me a real function!';
        },

        Collection() {
            return this.$store.getters.getCollection
        } 
    },


    methods: {
        selectWatch(watch) {
            console.log(watch)
            this.selectedWatch = watch;
        },

        nameCollection(name) {
            this.isEditMode = true;
            this.$store.dispatch('nameCollection', name).then(res => {
                this.$refs.addWatchForm.show();
            }).catch(err => {
                console.log(err)
            })
        },

        addWatchSpecs(specs) {
            this.isEditMode = true;            
            this.addWatch.specs = 
            localStorage.setItem('addWatch', specs);
        },

        previewWatch() {
            this.isEditMode = true;            
            this.selectedWatch = this.addWatch;
            this.$refs.addWatchForm.hide();
            this.$refs.seeMoreModal.show();
        },

        submitWatch() {
            console.log('will be submitting this watch', this.addWatch)
            this.isEditMode = false;
            this.$store.dispatch('submitWatch', this.addWatch).then(() => {
                this.addWatch = {}
            })
        },

        cancelAddWatchForm() {
            this.isEditMode = false;
            this.addWatch = {};
            this.addWatch_Count = 1;
            this.$refs.addWatchForm.hide();
        }
    },

    created: function() {
        this.$store.dispatch('loadUserCollection');
    }
}
</script>

<style>

    #searchRef {
        font-size: .75em;
    }
    .manage-btn-border {
        border-right: 1px solid lightgray;
    }

    #add-img-div {
        min-width: 100px;
        min-height: 100px;
    }

    li .form-control {
        background-clip: none;
        border: none;
        border-bottom: 2px solid lightgray
    }

    .form-control:focus {
    border-color: inherit;
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  .btn {
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  }

  #begin-collection {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  @media(max-width:500px) {
    li .form-control {
        font-size: 8px;
    }

    #searchRef {
        font-size: 1em;
    }
  
}
</style>

