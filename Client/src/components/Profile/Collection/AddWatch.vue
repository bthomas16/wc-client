<template>
    <b-container>

        <!-- ADD WATCH MODAL   ADD WATCH MODAL   ADD WATCH MODALL
        ADD WATCH MODAL   ADD WATCH MODAL   ADD WATCH MODALL
        ADD WATCH MODAL   ADD WATCH MODAL   ADD WATCH MODALL -->

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
                            <b-col cols="4">
                                <h5>Specs:</h5>
                            </b-col>
                            <b-col cols="7" class="border">
                                <b-row align-h="center" align-v="center" class="p-2 pr-3">
                                    <b-col cols="4">Condition:</b-col>
                                    <b-col cols="4">
                                        <b-form-input 
                                            v-model="addWatch.condition"
                                            type="number"
                                            placeholder="9"
                                            description="Provide a condition for the watch"
                                            label="Watch Condition">
                                        </b-form-input>
                                    </b-col>
                                    <b-col cols="4">/10</b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                        <b-row align-h="center">
                            <b-col cols="10">
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
                                            <b-col cols="4" >
                                                <strong>Size (lug-lug):</strong>  
                                            </b-col>
                                            <b-col cols="8">
                                                <b-form-input v-model="addWatch.sizeLugToLug"
                                                    type="number"
                                                    placeholder="Watch lug to lug size"
                                                    description="Provide a size for the lug width"
                                                    label="Watch lug to lug size">
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
                                                <b-form-input v-model="addWatch.sizeWidth"
                                                    type="number"
                                                    placeholder="Width (mm)"
                                                    description="Provide a movement for the watch"
                                                    label="Watch Movement">
                                                </b-form-input>
                                            </b-col>
                                            x
                                            <b-col cols="12" md="4" lg="3" class="sizeClass">
                                                <b-form-input v-model="addWatch.sizeHeight"
                                                    type="number"
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
                    </b-col>
                </b-row>

                <!-- SPECS PART 2 -->

                <b-row :class="addWatch_Count == 3 ? '' : 'hidden'" align-h="center">
                    <b-col cols="12">
                        <h5>Specs Continued</h5>
                    </b-col>
                    <ul class="m-0 p-0" cols="10">
                        <li class="border bg-lightgray p-2">
                            <b-row align-v="center" class="p-0">
                                <b-col cols="4" >
                                    <strong>Full Kit:</strong>  
                                </b-col>
                                <b-col cols="8">
                                    <b-form-group>
                                        <b-form-radio-group v-model="addWatch.isFullKit" name="isFullKit" class="mt-3">
                                            <b-form-radio value="Yes">Yes</b-form-radio>
                                            <b-form-radio value="No">No</b-form-radio>
                                        </b-form-radio-group>
                                    </b-form-group>
                                </b-col>
                            </b-row>  
                            <b-row align-v="center" class="p-0">
                                <b-col cols="4" >
                                    <strong>For Sale:</strong>  
                                </b-col>
                                <b-col cols="8">
                                    <b-form-group>
                                        <b-form-radio-group v-model="addWatch.isForSale" name="isForSale" class="mt-3">
                                            <b-form-radio value="Yes">Yes</b-form-radio>
                                            <b-form-radio value="No">No</b-form-radio>
                                        </b-form-radio-group>
                                    </b-form-group>
                                </b-col>
                            </b-row>   
                            <b-row align-v="center" class="p-0">
                                <b-col cols="4" >
                                    <strong>For Trade:</strong>  
                                </b-col>
                                <b-col cols="8">
                                    <b-form-group>
                                        <b-form-radio-group v-model="addWatch.isForTrade" name="isForTrade" class="mt-3">
                                            <b-form-radio value="Yes">Yes</b-form-radio>
                                            <b-form-radio value="No">No</b-form-radio>
                                        </b-form-radio-group>
                                    </b-form-group>
                                </b-col>
                            </b-row>    
                        </li>
                        <li class="my-2">
                            <b-row align-v="center">
                                <b-col cols="4" >
                                    <strong>Band:</strong>  
                                </b-col>
                                <b-col cols="8">
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
                                <b-col cols="4" >
                                    <strong>Model #:</strong>  
                                </b-col>
                                <b-col cols="8">
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
                                <b-col cols="4" >
                                    <strong>Ref #:</strong>  
                                </b-col>
                                <b-col cols="8">
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
                                <b-col cols="4" >
                                    <strong>Accuracy:</strong>  
                                </b-col>
                                <b-col cols="8">
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
                                <b-col cols="4" >
                                    <strong>For Sale Price:</strong>  
                                </b-col>
                                <b-col cols="8">
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
                                <b-col cols="4" >
                                    <strong>For Trade Value:</strong>  
                                </b-col>
                                <b-col cols="8">
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

                <!-- Keeping House -->

                <b-row id="add-keeping-house" :class="addWatch_Count == 4 ? '' : 'hidden'">
                    <!-- <b-col cols="8" v-if="!isEditMode" class="border-bottom mx-auto"></b-col> -->

                    <h6 class="lightgray mx-auto mt-2">This section is only visible to you</h6>                        
                    
                    <b-col class="mt-3" cols="12">
                        <b-row align-v="center">
                            <b-col cols="6">
                                <h5>Keeping House:</h5>
                            </b-col>
                            <b-col cols="5" class="border p-2">
                                <strong>Turnaround:</strong><span class="green ml-4"> ${{addWatch.lowestOfferAccepting - addWatch.acquiredFor}}</span> 
                            </b-col>
                        </b-row>
                        <ul>
                            <li>
                                <b-row>
                                    <b-col cols="4">
                                        <strong>Acuired For:</strong>
                                    </b-col>
                                    <b-col cols="8">
                                        <b-form-input v-model="addWatch.acquiredFor"
                                            type="text"
                                            placeholder="$300"
                                            description="Provide a price you acquired this watch"
                                            label="Watch Price Acquired For">
                                        </b-form-input>
                                    </b-col>
                                </b-row>
                            </li>
                            <li>
                                <b-row>
                                    <b-col cols="4">
                                        <strong>Lowest Offer Accepting:</strong>   
                                    </b-col>
                                    <b-col cols="8">
                                        <b-form-input v-model="addWatch.lowestOfferAccepting"
                                            type="text"
                                            placeholder="$300"
                                            description="Provide a price you acquired this watch"
                                            label="Watch Price Acquired For">
                                        </b-form-input>
                                    </b-col>
                                </b-row>
                            </li>
                            <li>
                                <b-row>
                                    <b-col cols="4">
                                        <strong>Date Acquired:</strong>
                                    </b-col>
                                    <b-col cols="8">
                                        <b-form-input v-model="addWatch.dateAcquired"
                                            type="text"
                                            placeholder="$300"
                                            description="Provide a price you acquired this watch"
                                            label="Watch Price Acquired For">
                                        </b-form-input>
                                    </b-col>
                                </b-row>
                            </li>
                        </ul>
                        <b-form-textarea id="ownerNotes"
                            placeholder="Description Notes"
                            :rows="3"
                            :max-rows="6"
                            :value="addWatch.ownerNotes">
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

    </b-container>
</template>

<script>
import axios from 'axios';

export default {
    name: 'addWatchModal',

    data () {
        return {
            addWatch: {},
            addWatchTitle: "Add your first watch!",
            addWatch_Count: 1,
        }
        
    },
    methods: {
        addWatchSpecs(specs) {
            this.isEditMode = true;            
            this.addWatch.specs = 
            localStorage.setItem('addWatch', specs);
        },


        cancelAddWatchForm() {
            this.isEditMode = false;
            this.addWatch = {};
            this.addWatch_Count = 1;
            this.$refs.addWatchModal.hide();
        },

        previewWatch(){  
            this.$emit('previewWatch', this.addWatch);
        }

    }
}
</script>

<style>
    #add-img-div {
        min-width: 100px;
        min-height: 100px;
    }

    ul {
        margin: 0;
        padding: 0;
    }

    li {
        text-decoration: none;
        list-style-type: none;
    }

    li .form-control {
        background-clip: none;
        border: none;
        border-bottom: 2px solid lightgray;
    }

    .form-control:focus {
        border-color: inherit;
        -webkit-box-shadow: none;
        box-shadow: none;
    }
</style>

