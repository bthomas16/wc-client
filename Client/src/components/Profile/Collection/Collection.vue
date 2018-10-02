<template>
    <b-container id="collection-container" class="">
        <b-row v-if="Collection" align-h="center">
            <b-col>
                <b-row class="my-3 mx-auto center m-left-align" align-v="center" align-h="center">
                    <b-col cols="12" md="5" class="p-0 m-0">
                        <h3>{{User.firstName}}'s Collection</h3>
                    </b-col>
                    <b-col cols="12" md="6" class="p-0 m-0 right-align m-left-align mt-2 mt-md-0">
                        <p cols="12" class="mb-1 mb-md-0 m-h4 right w-100">Favorite Piece: <strong>Rolex Submariner</strong> </p> 
                        <p class="my-0 m-h4 mt-0 right w-100">Total Value: <strong class="green">{{getCollectionTotalValue}}</strong> </p>
                    </b-col>
                </b-row>
                
                <b-row class="w-100 mb-2 mb-md-2 relative" no-gutters align-h="center"> 
                    <b-col cols="12" md="10" class="border-bottom"></b-col>
                    <b-col cols="12" md="10">
                        <b-row no-gutters>
                            <b-col cols="auto" class="l-0 t-0 pointer gray bold h5 my-1" v-if="isManagingCollection" @click="isManagingCollection = false"><strong class="red">X</strong></b-col>
                            <b-col class="ml-3 l-0 t-0 pointer green bold h5 my-1" v-if="isManagingCollection" @click="isManagingCollection = false"><strong class="green">&#x2713;</strong></b-col>
                        </b-row>
                    </b-col>
                    
                </b-row>

                <!-- FILTER WATCH ARRAY / RESULTS -->
                
                <b-row  align-v="start" align-h="center" v-if="isManagingCollection">
                    <b-col cols="4" md="4"  class="pr-4 manage-btn-border" >
                        <b-row align-v="start" align-h="center" id="watch-controls">
                            <b-col lg="6" cols="12" class="mx-auto center" >
                                <b-button id="manage" variant="primary" block size="sm">Manage</b-button>
                            </b-col>
                            <b-col lg="6" cols="12" class="mt-2 mt-lg-0">
                                <b-button id="addWatch" variant="success" @click="addWatchModal" size="sm" block>+ Watch</b-button>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col cols="8">
                        <b-form-row align-v="start" align-h="start" >
                            <b-col cols="4" lg="2" >
                                <b-button variant="info" size="sm" block>
                                    Sort
                                </b-button>  
                            </b-col>
                            
                            <b-col cols="7"  lg="3" class="mt-0 mt-sm-0">
                                <b-button variant="primary  " size="sm" block>
                                    Watch Style
                                </b-button>      
                            </b-col>
                            <b-col cols="12"  lg="3" class="mt-2 mt-md-0 d-none d-lg-block">
                                <b-button variant="white" size="sm" block>
                                    Watch Status
                                </b-button>      
                            </b-col>
                            <b-col cols="11" lg="4" order="3">
                                <b-input-group prepend="&#9906;" class="mt-2 mt-lg-0" size="sm">
                                    <b-form-input type="text" placeholder="Search" size="sm"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-form-row>
                        <!-- <b-row no-gutters align-h="start">
                            
                        </b-row> -->
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
            Sort: "Recently Added",
            showDismissibleAlert: false,
            isEdit: false,
            selectedWatch: {},
            isSeeMore: false,
            isManagingCollection: false,
            addWatchCount: 1,
            addWatch: {},
            isFeaturedWatch: false,
            hasCollection: false
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
            console.log('poop')
            let watchCollection = this.$store.getters.getCollection;
            console.log(watchCollection)
            if(!watchCollection || watchCollection.length < 1) {
                return false;          
            }
            else {               
            return watchCollection.sort((a, b) => {
                // if(b.order == a.order) b.order += 1;
                return a.order - b.order;
            })
            }       
        }
    },

    created: function() 
    {
        this.$store.dispatch('loadUserCollection');
        this.$store.dispatch('getFavorites');
    }
}
</script>

<style scoped>
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

    .btn {
        text-align: center;
        font-size: .85em;
    }


@media(min-width: 580px) {
    .btn  {
        padding: .6em 2em;
    }

    .form-control {
        padding: 1.405em .5em !important; 
    }

    .input-group-prepend .input-group-text {
        padding: 1.405em !important;
    }
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

.mr-6 {
    margin-right: 6.5em;
}


</style>

