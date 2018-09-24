<template>
    <b-container id="collection-container" class="">


        <b-row v-if="Collection" align-h="center">
            <b-col>
                <b-row class="my-3 mx-auto center m-left-align" align-v="center" align-h="center">
                    <b-col cols="12" md="5" class="p-0 m-0">
                        <h3>{{User.firstName}}'s Collection</h3>
                    </b-col>
                    <b-col cols="12" md="7" class="p-0 m-0">
                        <b-row>
                            <b-col>
                                <b-col class="m-0 p-0 my-2 mb-md-3 ">
                                    <h5 class="m-h4">Favorite Piece: <strong>Rolex Submariner</strong> </h5> 
                                </b-col>
                                <b-col class="p-0">
                                    <h5 class="m-h4">Total Value: <strong class="green">{{getCollectionTotalValue}}</strong> </h5>
                                </b-col>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
                
                <div class="w-75 mx-auto pt-4 relative"> 
                    <div class="absolute r0 t0 mr-6 pointer gray bold" v-if="isManagingCollection" @click="isManagingCollection = false"><strong>Cancel</strong></div>
                    <div class="absolute r0 t0 ml-5 pointer green bold" v-if="isManagingCollection" @click="isManagingCollection = false"><strong>Update</strong></div>
                </div>

                <div class="w-75 border-bottom mx-auto mb-4 relative">
                </div>
                
                

                <!-- FILTER WATCH ARRAY / RESULTS -->
                
                <b-row  align-v="start" align-h="between" v-if="isManagingCollection" no-gutters>
                    <b-col cols="4" md="3"  class="pr-4 manage-btn-border" >
                        <b-row align-v="center" align-h="center" id="watch-controls">
                            <b-col lg="5" cols="12" >
                                <b-button id="manage" variant="primary" block>Manage</b-button>
                            </b-col>
                            <b-col lg="6" cols="12" class="mt-2 mt-lg-0">
                                <b-button id="manage" variant="success" @click="addWatchModal" size="sm" block>+ Watch</b-button>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col cols="8" md="9" class="px-3">
                        <b-row align-v="start" align-h="start">
                            <b-col cols="5" sm="3">
                                <b-dropdown text="filterBy" variant="info" size="" block>
                                    <b-dropdown-item-button>First item</b-dropdown-item-button>
                                    <b-dropdown-item-button>Second item</b-dropdown-item-button>
                                    <b-dropdown-divider></b-dropdown-divider>
                                    <b-dropdown-item-button>Separated Item</b-dropdown-item-button>
                                </b-dropdown>
                            </b-col>
                            
                            <b-col cols="12" sm="5" order="3" order-lg="2" >
                                <b-input-group prepend="&#9906;" class="mt-2 mt-sm-0">
                                    <b-form-input type="text" placeholder="Search" ></b-form-input>
                                </b-input-group>
                            </b-col>
                            <b-col cols="7"  sm="3" order-lg="3" class="mt-0 mt-sm-0">
                                <b-row align-v="start" align-h="start">
                                    <b-col >
                                        <b-form-input placeholder="8/pg" type="number" block></b-form-input>
                                    </b-col>
                                </b-row>      
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>

                <b-row v-else>
                    <b-col cols="9" md="5" class="mx-auto">
                        <b-button variant="info" class="my-0" size="sm" @click="isManagingCollection = true" block>Manage Collection</b-button>
                    </b-col>
                </b-row>

                <!-- LOOP THROUGH WATCHES -->

                <watch-collection @selectWatch="selectWatch" :Collection="Collection"></watch-collection>

            </b-col>
        </b-row>

        <!-- No watch collection / Start Collection -->

        <b-row v-else align-h="center">
            <b-col cols="11" md="8" class="ml-3 border my-5 center p-5" id="begin-collection">
                <h3 class="center">Welcome to the WATCH COLLECTION!</h3>  
                <h5 class="mt-5">Let's get you started by adding a few watches to your collection</h5>
                <b-row>
                    <b-col cols="6" class="mx-auto my-3">
                        <b-button variant="success" class="my-2" size="lg" v-b-modal.add-watch-modal block>Okay!</b-button>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>

        <!-- SEE MORE MODAL -->

        <b-modal 
            ref="seeMoreModal" 
            id="see-more-modal"
            :title="selectedWatch.name">
            <div slot="modal-header-close" class="w-100" @click="cancelAddWatchForm">
                X
            </div>
            <see-more-modal :selectedWatch="selectedWatch" :isEdit="isEdit"></see-more-modal>
            <div slot="modal-footer" class="w-100">
                <b-btn size="sm" class="float-right" variant="primary" @click="submitWatch" v-if="isEdit">
                    Submit
                </b-btn>
                <b-btn size="sm" class="float-right" variant="primary" v-b-modal.see-more-modal.close v-else>
                    Ok
                </b-btn>
            </div>
        </b-modal>
        
        <!-- ADD WATCH MODAL -->
        <b-modal 
            id="add-watch-modal"
            ref="addWatchModal">
            <div slot="modal-header-close" class="w-100" @click="cancelAddWatchForm">
                X
            </div>
            <add-watch-modal @click="previewWatch" :addWatchCount="addWatchCount" :addWatch="addWatch"></add-watch-modal>
            <div slot="modal-footer">
                <b-btn size="lg" class="float-right" :class="addWatchCount == 1 ? '' : 'hidden'" variant="primary" @click="addWatchCount++">
                    Add Specs
                </b-btn>
                <b-button size="lg" variant="info" @click="addWatchCount++" :class="addWatchCount == 2 ? 'float-right' : 'hidden'">
                    Continue Specs
                </b-button>
                <b-btn size="lg" class="float-right" :class="addWatchCount == 3 ? '' : 'hidden'" variant="primary" @click="addWatchCount++">
                    Add Owner Details
                </b-btn>
                <b-btn size="lg" class="float-right" :class="addWatchCount == 4 ? '' : 'hidden'" variant="primary" @click="previewWatch">
                    Preview
                </b-btn>
            </div>
        </b-modal>

        {{Collection}}
    
    </b-container>
</template>

<script>
import axios from 'axios';
import SeeMore from './SeeMore.vue';
import AddWatch from './AddWatch.vue';
import WatchCollection from './WatchCollection.vue';

export default {
    components: {
        seeMoreModal: SeeMore,
        addWatchModal: AddWatch,
        watchCollection: WatchCollection
    },
    data () {
        return {
            filterBy: "Recently Added",
            showDismissibleAlert: false,
            isEdit: false,
            selectedWatch: {},
            isSeeMore: false,
            isManagingCollection: false,
            addWatchCount: 1,
            addWatch: {},
            isFeaturedWatch: false
        }
    },


    methods: {
        selectWatch(watch) {
            console.log('selecting', watch)
            this.selectedWatch = watch;
            this.$refs.seeMoreModal.show();
        },

        addWatchModal() {
            this.$refs.addWatchModal.show();
        },

        cancelAddWatchForm() {
            this.$refs.addWatchModal.hide();
            this.$refs.seeMoreModal.hide();
            this.addWatch = {};
            this.addWatchCount = 1;
        },
        
        previewWatch() {
            this.selectedWatch = this.addWatch;
            this.isEdit = true;
            this.$refs.addWatchModal.hide(); 
            this.$refs.seeMoreModal.show();
        },

        submitWatch() {
            this.isEdit = false;
            this.$refs.seeMoreModal.hide();
            this.$store.dispatch('submitWatch', this.addWatch).then(() => {
                this.addWatch = {}
                this.addWatchCount = 1;
            })
        }

        // hasWatchesCollection() {
        //     let status = this.$store.state.Collection;
        //     console.log(this.$store.state.Collection)
        //     if(status){
        //         if (status == 0) return false;
        //         return true;
        //     } else return false
        // },
    },

    computed: {  
        getCollectionTotalValue() 
        {
            // if (this.Collection.length)
            // {
            //     let tv = 0;
            //     this.Collection.forEach(w => tv += w.value);
            //     console.log(tv);
            //     return tv
            // }
            // else return 'N/A'
            return 'N/A'
        },

        User() {
            return this.$store.getters.getUser;
        },

        Collection() 
        {
            let watchCollection = this.$store.getters.getCollection;
            console.log(watchCollection)
            if(!watchCollection || watchCollection.length < 1) return false;                  
            return watchCollection.sort((a, b) => {
                return a.order - b.order;
            })
        }
    },

    created: function() 
    {
        this.$store.dispatch('loadUserCollection');
    }
}
</script>

<style>
    .dropdown {
        font-size: .5em; 
    }
    #begin-collection {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .modal-dialog {
        max-width: 48.5%;
        display: flex;
        justify-content: center;
        margin-left: auto;
        margin-right: auto;
    }

    .manage-btn-border {
        border-right: 1px solid lightgray;
    }

    #manage {
        padding:.4em;
        font-size:1em;
    }

@media(max-width: 750px) {
    .modal-dialog {
        max-width: 95%;
    }

    #watch-controls {
        font-size: 1em;
    }

    #dropdown {
        font-size: .8em;
        padding:0;
    }
}

@media(max-width: 420px) {
    #manage {
        padding:.3em;
    }

    #watch-controls {
        font-size: .85em;
    }
}

.mr-6 {
    margin-right: 6.5em;
}


</style>

