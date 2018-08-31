<template>
    <b-container id="collection-container bg-lightgray" fluid>
        <b-row class="border-bottom mb-3 py-2" align-v="center">
            <b-col sm="7" xs="12" class="ml-2">
                <h3>{{collection.name}}</h3>
            </b-col>
            <b-col class="ml-2">
                <b-row>
                    <b-col>
                        <b-col class="m-0 p-0 my-2 mb-md-3 ">
                             <h5>Favorite Piece: <strong>{{getFavoritePiece}}</strong> </h5> 
                        </b-col>
                        <b-col class="p-0">
                            <h5>  Total Value <strong class="green">{{collection.totalValue}}</strong> </h5>
                        </b-col>
                    </b-col>
                </b-row>
            </b-col>
            
        </b-row>
        <b-row>
            
            <b-col cols="auto"  class="manage-btn-border pb-2 ml-2">
                <b-button variant="primary">Manage</b-button>
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

       <b-row align-h="center" class="px-3 pl-4">
           <b-col md="5" cols="12"
           class="watch border p-0 m-2 ml-3"
            v-for="(watch) in collection.pieces" 
            :collection="collection" 
            :key="watch.id"
            >
                <b-row align-v="start" align-h="center" class="p-3">
                    <b-col sm="12" xs="4" class="order-1">
                        <b-row align-v="start" aling-h="start" class="pr-2 pr-sm-0">
                            <b-col cols="7" class="mx-auto p-0">
                                <b-img :src="watch.src" fluid></b-img>
                            </b-col>
                            <b-col cols="5">
                                <b-row align-h="end" class="pr-2">
                                    <h6><strong>{{watch.name}}</strong></h6>
                                    <b-col cols="12" class="mt-5 px-1">
                                        <b-button variant="outline-info" size="" block v-b-modal.seeMoreModal @click="selectWatch(watch)">See More</b-button>
                                    </b-col>
                                    <b-col cols="12" class="px-1"> 
                                        <b-button variant="primary" class="mt-2" size="sm" block>Search Ref #</b-button>   
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
            filterBy: "Recently Added",
            emptyHeart: "https://png.icons8.com/metro/1600/like.png",
            fullHeart: "https://png.icons8.com/metro/1600/like.png",
            selectedWatch: {}

        }
    },
    props: {
        collection: 
        {
            name: String,
            favoritePiece: Number,
            totalValue: String,
            pieces:
            {
                src: {
                    type: String,
                    required: true
                },
                brand: {
                    type: String,
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
                id: {
                    type: Number,
                    required: true
                },
                value: {
                    type: Number,
                    required: false
                },
                isFullKit: {
                    type: Boolean,
                    required: false
                },
                size: {
                    type: Number,
                    required: false
                },
                crystal: {
                    type: String,
                    required: false
                },
                movement: {
                    type: String,
                    required: false
                },
                band: {
                    type: String,
                    required: false
                },
                accuracy: {
                    type: Number,
                    required: false
                },
                lowestOfferAccepting: {
                    type: Number,
                    required: false
                },
                desceriptionNotes: {
                    type: String,
                    required: false
                },
                ownerNotes: {
                    type: String,
                    required: false
                },
                dateAcquired: {
                    type: String,
                    required: false
                },
                acquiredFor: {
                    type: String,
                    required: false
                },
                condition: {
                    type: Number,
                    required: false
                }
            } 
        }
    },
    computed: {
        getFavoritePiece(){
           return this.collection.pieces[this.collection.favoritePiece].name
        }, 

        getIsFullKit(id){
            if(this.collection.pieces[id].isFullKit) this.isFullKitText = 'Yes'
            else this.isFullKitText = 'No'
        }
    },
    methods: {
        selectWatch(watch) {
            this.selectedWatch = watch;
        }
    }
}
</script>

<style>
    .pr0 {
        padding-right: 0 !important;
    }

    

    .manage-btn-border {
        border-right: 1px solid lightgray;
    }
</style>

