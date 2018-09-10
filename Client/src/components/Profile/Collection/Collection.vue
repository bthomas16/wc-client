<template>
    <b-container id="collection-container" class="">

        <!-- Has Watch collection / View Collection -->

        <b-row v-if="hasWatchesCollection">
            <b-col>
                <b-row class="my-3 mx-auto center" align-v="center" align-h="center">
                    <b-col cols="12" md="5" class="p-0 m-0">
                        <h3>Rick Santorum's Collection</h3>
                    </b-col>
                    <b-col cols="12" md="7" class="p-0 m-0">
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
                

                <div class="w-75 border-bottom mx-auto mb-4 "></div>

                <!-- FILTER WATCH ARRAY / RESULTS -->
                
                <b-row class="px-4">
                    <b-col cols="auto"  class="manage-btn-border pb-2">
                        <b-button variant="primary" @click="addWatch">Manage</b-button>
                    </b-col>
                    <b-col>
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
                            <b-col lg="4" md="4" sm="6" cols="6" order="2" order-lg="3" class="mt-3 mt-md-0">
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

                <watch-collection :collection="Collection" @selectWatch="selectWatch"></watch-collection>

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
                            <b-button variant="warning" class="my-3" size="sm" v-b-modal.add-watch-modal block>Do I have to?</b-button>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>

        <!-- SEE MORE MODAL -->

        <b-modal 
            ref="seeMoreModal" 
            id="see-more-modal"
            :title="selectedWatch.name">
            <see-more-modal :selectedWatchObj="getSelectedWatchObj"></see-more-modal>
        </b-modal>
        
        <!-- ADD WATCH MODAL -->
        
        <b-modal 
            id="add-watch-modal"
            ref="addWatchModal">
            <add-watch-modal @previewWatch="previewWatch"></add-watch-modal>
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
            filterBy: "Recently Added",
            showDismissibleAlert: false,
            isEditMode: false,
            selectedWatch: {},
            isSeeMore: false,
            isEdit: false
        }
    },

    props: ['userName'],

    methods: {
        selectWatch(watch) {
            console.log('selecting', watch)
            this.selectedWatch = watch;
            this.$refs.seeMoreModal.show();
        },

        addWatch() {
            this.$refs.addWatchModal.show();
        } ,
        
        previewWatch(addWatch) {
            this.selectedWatch = addWatch;
            this.isEdit = true;
            let seeMoreModalObj = 
            {
                selectedWatch: this.selectedWatch,
                isEdit: this.isEdit

            }
            this.$refs.addWatchModal.hide(); 
            this.$refs.seeMoreModal.show();
        }
    },

    computed: { 
        hasWatchesCollection() {
            let status = this.$store.getters.getCollection.length;
            if (status == 0) return false;
            return true;
        },

        getCollectionTotalValue() {
            return 'Make me a real function!';
        },

        Collection() {
            return this.$store.getters.getCollection
        },

        getSelectedWatchObj() {
            return {
                selectedWatch: this.selectedWatch,
                isEdit: false
            }
        }
    },


    

    created: function() {
        this.$store.dispatch('loadUserCollection');
    },

}
</script>

<style>

    

  #begin-collection {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }



  /* .watch .btn {
        font-size:24px;
    } */

    /* #searchRef {
        font-size: 1.2em;
    } */

</style>

