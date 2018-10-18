<template>
    <b-container id="collection-container" class="">
        <b-row v-if="Collection" align-h="center">
            <b-col>
                <b-row class="my-3 mx-auto center m-left-align" align-v="center" align-h="center">
                    <b-col cols="12" md="5" class="p-0 m-0 h3">
                        <strong>{{User.firstName}}'s Collection</strong>
                    </b-col>
                    <b-col cols="12" md="6" class="p-0 m-0 center m-left-align mt-2 mt-md-0">
                        <p cols="12" class="mb-1 mb-md-0 m-h2 right-align m-left-align w-75 mw-100">Watch of The Day: <strong>{{getWatchOfTheDay}}</strong> </p> 
                        <p class="my-0 m-h2 mt-0 right-align m-left-align w-75 mw-100">Total Value: <strong class="green">{{getCollectionTotalValue}}</strong> </p>
                    </b-col>
                </b-row>
                
                <b-row class="w-100 mb-2 mb-md-2 relative" no-gutters align-h="center"> 
                    <b-col cols="12" md="10" class="border-bottom"></b-col>
                    <b-col cols="12" md="10">
                        <b-row no-gutters align-h="between" align-v="center">
                            <b-col cols="6" class="left-align pointer gray bold h4 m-h2 my-1" v-if="isManagingCollection" >
                                <strong class="red" @click="notManagingorEditing">X</strong>
                                <strong @click="updatedFilteredCollection" class="ml-2">Reset</strong>
                            </b-col>
                        </b-row>
                    </b-col> 
                </b-row>

                <!-- FILTER WATCH ARRAY / RESULTS -->
                <b-row  align-v="start" align-h="center" v-if="isManagingCollection">
                    <b-col cols="4" md="4"  class="manage-btn-border" >
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
                            <b-col cols="6" lg="3" class="selectWrapper">
                                <b-form-select id="sortedArr" class="btn m-0 p-0 pl-1" :options="sortOptions" v-model.number="sortFilter" @change="getSortedArr"/>
                            </b-col>
                            <b-col cols="6" lg="3" class="mt-0 mt-sm-0 selectWrapper">
                                <b-form-select class="btn m-0 p-0 pl-1" :options="styleOptions" v-model="styleFilter" @change="getStyleArr"/>  
                            </b-col>
                            <b-col cols="12"  lg="2" class="mt-2 mt-md-0 d-none d-lg-block selectWrapper">
                                <b-form-select class="btn m-0 p-0 pl-1" :options="statusOptions" v-model="statusFilter" @change="getStatusArr"/>     
                            </b-col>
                            <b-col cols="12" lg="4" order="3" class="selectWrapper">
                                <b-input-group prepend="&#9906;" class="mt-2 mt-lg-0" size="sm">
                                    <b-form-input id="searchInput" type="text" placeholder="Searches" size="sm" @input="getSearchArr" v-model="searchFilter"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-form-row>
                    </b-col>
                </b-row>

                <b-row align-v="center" align-h="center" v-else>
                    <b-col cols="9" md="7" offset-md="1">
                        <b-button variant="info" class="my-0" size="sm" @click="isManagingCollection = true" block>Manage Collection</b-button>
                    </b-col>
                    <b-row no-gutters class="mt-1 mt-md-0 nowrap">
                        <b-col cols="3" md="5">
                        <b-form-checkbox
                            id="toggleFlags"
                            label="hi"
                            v-model="isShowFlags"
                            :value="true"
                            :unchecked-value="false"
                            @change="isShowFlags = !isShowFlags">Show Flags on Watches</b-form-checkbox>
                    </b-col>
                    </b-row>
                </b-row>
                <watch-collection 
                    @selectWatch="selectWatch" 
                    @editWatchModal="editWatchModal" 
                    :Collection="filteredCollection" 
                    :isManagingCollection="isManagingCollection"
                    :isShowFlags="isShowFlags">
                </watch-collection>
            </b-col>
        </b-row>

        <!-- No watch collection / Start Collection -->
        <b-row v-else align-h="center">
            <b-col cols="11" md="8" class="border my-5 center p-2 p-md-5" id="begin-collection">
                <p class="h3 m-h1 center">Welcome to your <span class="nowrap">WATCH COLLECTION!</span></p>  
                <p class="h5 m-h2 mt-4 mt-md-5">Get started by adding a watch</p>
                <b-row>
                    <b-col cols="6" class="mx-auto my-3">
                        <b-button variant="success" class="my-2" size="lg" @click="addWatchModal" block>Okay!</b-button>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>

        <!-- SEE MORE MODAL -->
        <b-modal 
            ref="seeMoreModal" 
            id="see-more-modal"
            :title="selectedWatch.name">
            <div slot="modal-title">{{ selectedWatch.name }}</div>            
            <div slot="modal-header-close" class="w-100 m-h2 mt-2 mt-md-1" @click="resetWatchFormAndModals">
                X
            </div>
            <see-more-modal 
                :selectedWatch="selectedWatch" 
                :isAddingWatch="isAddingWatch">
            </see-more-modal>
            <div slot="modal-footer" class="w-100 mt-0 p-0">
                <b-btn  size="sm" class="center white" variant="warning" @click="backToEditStart" v-if="isAddingWatch || isEditingExistingWatch">
                    Back
                </b-btn>
                <b-btn size="sm" class="float-right" variant="info" @click="submitWatch" v-if="isAddingWatch || isEditingExistingWatch">
                    Submit
                </b-btn>
                <b-btn size="sm" class="float-right" variant="info" v-else @click="resetWatchFormAndModals">
                    Ok
                </b-btn>
            </div>
        </b-modal>
        
        <!-- ADD WATCH MODAL -->
        <b-modal 
            id="add-watch-modal"
            ref="addWatchModal"
            size="lg">
            <div slot="modal-title" v-if="isAddingWatch">Adding Watch</div>
            <div slot="modal-title" v-if="isEditingExistingWatch">Editing {{addWatch.name}}</div>
            <div slot="modal-header-close" class="w-100 m-h2 mt-2 mt-md-1" @click="resetWatchFormAndModals">
                X
            </div>
            <add-watch-modal 
                :previewWatch="previewWatch" 
                :addWatch="addWatch" 
                :addWatchCount="addWatchCount">
            </add-watch-modal>
            <b-row slot="modal-footer" no-gutters class="w-100" align-h="end" align-v="center">
                <b-col cols="5">
                    <!-- Potential Progress Bar -->
                    <p v-if="!addWatch.name && addWatchCount == 2" class="red p-0 m-0 h5 m-h4">Please add a name for this watch</p>
                </b-col>
                <b-col cols="7" class="right-align">
                    <b-btn  size="sm" class="center white" :class="addWatchCount == 1 ? 'hidden' : ''" variant="warning" @click="addWatchCount--">
                       Previous
                    </b-btn>
                    <b-btn size="sm" :class="addWatchCount == 1 ? '' : 'hidden'" variant="info" @click="addWatchCount++">
                        Details
                    </b-btn>
                    <b-button size="sm" variant="info" @click="addWatchCount++" :class="addWatchCount == 2 ? '' : 'hidden'" :disabled="!addWatch.name">
                        Continue
                    </b-button>
                    <b-btn size="sm" :class="addWatchCount == 3 ? '' : 'hidden'" variant="info" @click="addWatchCount++">
                        Owner Details
                    </b-btn>
                    <b-btn size="sm" :class="addWatchCount == 4 ? '' : 'hidden'" variant="info" @click="previewWatch">
                        Preview
                    </b-btn>
                </b-col>   
            </b-row>
        </b-modal>
    
    </b-container>
</template>

<script>
import axios from 'axios';
import SeeMoreModal from './Modals/SeeMoreModal.vue';
import AddWatchModal from './Modals/AddWatchModal.vue';
import WatchCollection from './WatchCollection.vue';

export default {
    components: {
        seeMoreModal: SeeMoreModal,
        addWatchModal: AddWatchModal,
        watchCollection: WatchCollection
    },
    data () {
        return {
            addWatchCount: 1,
            sortFilter: null,
            sortOptions: [
                { value: null, text: 'Condition', disabled: true},
                { value: 8, text: '8-10'},
                { value: 5, text: '5-8'},
                { value: 1, text: '0-5'},
                // { value: 'recentAcquisition', text: 'Acquired Recently'},
            ],

            styleFilter: null,
            styleOptions: [
                { value: null, text: 'Select a Style', disabled: true},
                { value: 'Diver', text: 'Diver'},
                { value: 'Dress', text: 'Dress'},
                { value: 'Chronograph', text: 'Chronograph'},
                { value: 'Tourbillon', text: 'Tourbillon'},
                { value: 'Black Tie', text: 'Black Tie'},
                { value: 'Sport', text: 'Sport'},
                { value: 'Smart', text: 'Smart'},
                { value: 'Apple', text: 'Apple'},
                { value: 'Casual', text: 'Casual'},
                { value: 'Orienteering', text: 'Orienteering'},
            ],

            statusFilter: null,
            statusOptions: [
                { value: null, text: 'Status', disabled: true},
                { value: 'keeper', text: 'Keeper'},
                { value: 'sale', text: 'For Sale'},
                { value: 'trade', text: 'For Trade'},
                { value: 'fsot', text: 'Sale / Trade'},
                { value: 'favorites', text: 'Favorites'}
            ],

            searchFilter: null,
            sortArr: [],
            styleArr: [],
            statusArr: [],
            searchArr: [],

            concatFilteredFinal: [],

            isShowFlags: true,
            showDismissibleAlert: false,
            isAddingWatch: false,
            isEditingExistingWatch: false,
            selectedWatch: {},
            isSeeMore: false,
            isManagingCollection: false,
            addWatch: {},
            isFeaturedWatch: false,
            hasCollection: false,
            searchTerms: [
                'brand',
                'name',
                'model',
                'ref'
            ]
        }
    },

    methods: {
        selectWatch(watch) {
            console.log('selecting', watch)
            this.selectedWatch = watch;
            this.$refs.seeMoreModal.show();
        },

        editWatchModal(watch) {
            this.addWatch = watch;
            this.isAddingWatch = false;
            this.isEditingExistingWatch = true;
            this.$refs.addWatchModal.show();            
        },

        addWatchModal() {
            this.createAddWatch();
            console.log(this.addWatch)
            this.isAddingWatch = true;
            this.isEditingExistingWatch = false;
            this.$refs.addWatchModal.show();
        },

        resetWatchFormAndModals() {
            this.isAddingWatch = false;
            this.isEditingExistingWatch = false;
            this.$refs.addWatchModal.hide();
            this.$refs.seeMoreModal.hide();
            this.addWatch = this.addWatch;
            this.addWatchCount = 1;
        },
        
        previewWatch() {
            this.selectedWatch = this.addWatch;
           
            this.$refs.addWatchModal.hide(); 
            this.$refs.seeMoreModal.show();
        },

        submitWatch() {
            this.isAddingWatch = false;
            this.isEditingExistingWatch = false;
            
            this.$refs.seeMoreModal.hide();
            console.log('okay here we go', this.addWatch)
            if(!this.addWatch.id) {
                console.log('new', this.addWatch.id)
                this.$store.dispatch('submitNewWatch', this.addWatch).then(() => {
                    this.createAddWatch(); //reset add watch to defaults
                    this.addWatchCount = 1; //resets watch count
                });
            } 
            else {
                console.log('edit', this.addWatch.id)
                
                this.$store.dispatch('submitEditWatch', this.addWatch).then(() => {
                    this.createAddWatch(); //reset add watch to defaults
                    this.addWatchCount = 1; //resets watch count
                });
            }
        },

        backToEditStart() {
            this.addWatchCount = 1;
            this.$refs.addWatchModal.show(); 
            this.$refs.seeMoreModal.hide();
        },

        notManagingorEditing() {
            this.isManagingCollection = false;
            this.isEditingExistingWatch = false;
            this.isAddingWatch = false;
            this.resetFilteredCollection();
        },

        createAddWatch() {
            this.addWatch = {
                src: '',
                brand: '',
                name: '',
                isForSale: false,
                isForTrade: false,
                isFullKit: false,
                watchStyle: null,
                watchStyle: null,
                accuracy: null,
                movement: null,
                movementType: null,
                sizeLugToLug: null,
                sizeWidth: null,
                sizeHeight: null,
                crystal: null,
                band: '',
                model: '',
                ref: '',
                forSalePrice: null,
                forTradeValue: null,
                acquiredFor: null,
                dateAcquired: ''
            }
        },

        getSortedStyle() {
            let styleValue = this.styleFilter;
            console.log(styleValue);
        },

        signalChange: function(e) {
            this.$emit('change', e)
            console.log(e)
        },

        getSortedArr(eventValue) {
            this.searchFilter = null;
            this.searchArr = this.Collection;            
            this.$emit('change', eventValue);
            let filterValue = eventValue;
            this.sortArr = this.Collection.filter(watch => {
                switch(filterValue) {
                    case 8: 
                        return watch.condition >= 8;
                        break;
                    case 5: 
                        return (watch.condition >= 5 && watch.condition < 8);
                            return watch;
                        break;
                    case 1: 
                        return (watch.condition >= 1 && watch.condition < 5);
                            return watch;
                    default:
                        return [];
                }
            })
            this.updatedFilteredCollection('sort', this.sortArr);
        },   

        getStyleArr(eventValue) {
            this.searchFilter = null;  
            this.searchArr = this.Collection;          
            this.$emit('change', eventValue);
            let filterValue = eventValue;
            this.styleArr = this.Collection.filter(watch => watch.watchStyle == filterValue);
            this.updatedFilteredCollection('style', this.styleArr);
        }, 

        getStatusArr(eventValue) {
            this.searchFilter = null;
            this.searchArr = this.Collection;            
            this.$emit('change', eventValue);
            let filterValue = eventValue;
            this.statusArr = this.Collection.filter(watch => {
                switch(filterValue) {
                    case 'keeper': 
                        return (!watch.isForSale && !watch.isForTrade) == true;
                        break;
                    case 'sale': 
                        return watch.isForSale == true;
                        break;
                    case 'trade': 
                        return watch.isForTrade == true;
                        break;
                    case 'fsot': 
                        return (watch.isForSale && watch.isForTrade) == true;
                        break;
                    case 'favorites': 
                        let faves = this.$store.getters.getFavorites;
                        let w = faves.find(f => f.watch_id == watch.id );
                        return watch = w;
                        break;
                    default: 
                        return [];         
                };
            });
            this.updatedFilteredCollection('status', this.statusArr);
        }, 

        getSearchArr(eventValue) {
            this.$emit('change', eventValue);
            if(eventValue) {
                let filterValue = eventValue;
                this.searchArr = this.Collection.filter(watch => {
                    if(watch.brand.toLowerCase().match(filterValue.toLowerCase()))
                        return watch
                    else if(watch.name.toLowerCase().match(filterValue.toLowerCase()))
                        return watch
                    else if(watch.model.toLowerCase().match(filterValue.toLowerCase()))
                        return watch
                    if(watch.ref.toLowerCase().match(filterValue.toLowerCase()))
                        return watch
                })
                this.updatedFilteredCollection('search', this.searchArr);
            }   
        },

        updatedFilteredCollection(valToReset, newCollection) {
            this.resetFilteredCollection(valToReset, newCollection);
        },

        resetFilteredCollection(val, newCollection) {
            switch(val) {
                case 'sort':
                    this.styleFilter = null;
                    this.statusFilter = null;
                    this.searchFilter = null;
                    this.filteredCollection = newCollection;
                    break;
                case 'style':
                    this.sortFilter = null;
                    this.statusFilter = null;
                    this.searchFilter = null;
                    this.filteredCollection = newCollection;  
                    break;
                case 'status': 
                    this.sortFilter = null;
                    this.styleFilter = null;
                    this.searchFilter = null;
                    this.filteredCollection = newCollection;
                    break;
                case 'search': 
                    this.sortFilter = null;
                    this.styleFilter = null;
                    this.statusFilter = null;   
                    this.filteredCollection = newCollection;                                     
                    break;
                default: 
                    this.sortFilter = null;
                    this.styleFilter = null;
                    this.statusFilter = null;
                    this.searchFilter = null;
                    this.filteredCollection = this.Collection;                        
            }
        }
    },

    computed: {  
        getSortFilter() {
           return this.sortFilter;
        },

        getCollectionTotalValue() 
        {
            return 'N/A'
        },
        
        User() {
            return this.$store.getters.getUser;
        },

        getWatchOfTheDay() {
            let watchCollection = this.$store.getters.getCollection;
            let randomId = Math.floor(Math.random() * Math.floor(watchCollection.length))   
            return watchCollection[randomId].name;        
        },

        Collection() 
        {
            let watchCollection = this.$store.getters.getCollection;
            if(!watchCollection.length) {
                return false;          
            }
            else {               
                let filtered = watchCollection.sort((a, b) => {
                    return a.order - b.order;
                });
                this.filteredCollection = filtered;
                return this.filteredCollection;
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

    #add-watch-modal .modal-dialog {
        width: 80% !important;
    }


    .modal-body {
        padding: .5rem;
    }

    #add-img-div {
        min-width: 100px;
        min-height: 100px;
    }

   


    .form-control:focus {
        border-color: inherit;
        -webkit-box-shadow: none;
        box-shadow: none;
    }


@media(min-width: 580px) {
    .btn  {
        padding: .6em 2em;
    }

    #searchInput {
        padding: 1.285em .5em !important; 
    }

    .input-group-prepend .input-group-text {
        padding: 1.285em !important;
    }
}

@media(max-width: 579px) {
    .custom-select {
            height: calc(1.69rem + 2px);
        }

        .caret {
    display: none;
}
}


@media(max-width: 750px) {
    .modal-dialog {
        max-width: 5%;
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

