<template fluid>
    <b-row no-gutters>
        <b-col>
            <b-row class=" mb-2 mb-md-2 relative" no-gutters align-h="center"> 
                <b-col cols="12" md="10" class="border-bottom"></b-col>
                <b-col cols="12" md="10" class="px-2 px-md-0">
                    <b-row no-gutters align-h="between" align-v="center">
                        <b-col cols="6" class="left-align pointer gray bold h4 m-h2 my-1" v-if="isManagingCollection" >
                            <strong class="green" @click="toggleIsManagingCollection">&#x2713;</strong>
                            <strong class="ml-2" @click="resetCollectionFilter">Reset</strong>
                        </b-col>
                    </b-row>
                </b-col> 
            </b-row>


        <!-- FILTER & SORT WATCH ARRAY -->
            <b-row  class="px-0 px-md-2 px-lg-4" align-v="start" align-h="center" v-if="isManagingCollection" no-gutters>
                <b-col cols="4" md="5"  class="manage-btn-border px-2" >
                    <b-row align-v="start" align-h="center" id="watch-controls">
                        <b-col lg="6" cols="12" class="mx-auto center" >
                            <b-button id="manageButton" variant="primary" block size="">Manage</b-button>
                        </b-col>
                        <b-col lg="6" cols="12" class="mt-2 mt-lg-0">
                            <b-button id="addWatchButton" variant="success" @click="addNewWatch" size="" block>+ Watch</b-button>
                        </b-col>
                        <b-col cols="12" class="mt-2 mt-md-3 nowrap">
                             <b-form-checkbox
                                id="toggleFlags"
                                v-model="isShowEditFlags"
                                :value="true"
                                :unchecked-value="false"> 
                                <span v-if="!isShowEditFlags">Show Edit Flags</span>
                                <span v-else>Hide Edit Flags</span>
                            </b-form-checkbox>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col cols="8" md="7">
                    <b-row no-gutters>
                        <b-col cols="12" class="mx-auto selectWrapper">
                            <b-input-group prepend="&#9906;" class="px-1" size="">
                                <b-form-input id="searchInput" type="text" placeholder="Search" size="" @input="filterBySearchTerm" v-model="searchTermToFilterBy"></b-form-input>
                            </b-input-group>
                        </b-col>
                    </b-row>
                    <b-row align-v="start" align-h="start" no-gutters class="mt-2">
                        <b-col cols="5" class="mx-auto px-1">
                            <b-form-select class="m-h2" id="categoryOptions" :options="sortCategories" v-model="sortCategory" @change="selectSortCategory"></b-form-select>
                        </b-col>
                        <b-col cols="7" class="mx-auto px-1">
                            <b-form-select class="m-h3" id="categoryOptions" :options="categoryOptions" v-model="categoryOption" @change="selectCategoryOption" :disabled="!sortCategory"></b-form-select>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>

            
            <b-row align-v="center" align-h="start" class="mx-auto px-2 px-md-5" v-else>
                <b-col class="mx-auto" cols="12" md="7">
                    <b-button variant="info" class="my-0" size="sm" @click="toggleIsManagingCollection" block>Manage Collection</b-button>
                </b-col>
                <b-col cols="12" sm="5" md="4" class="mt-1 mt-md-0 left-align left nowrap">
                    <b-form-checkbox
                        id="toggleFlags"
                        v-model="isShowFlags"
                        :value="true"
                        :unchecked-value="false"> 
                        <span v-if="!isShowFlags">Show Flags</span>
                        <span v-else>Hide Flags</span>
                    </b-form-checkbox>
                </b-col>
            </b-row>
        </b-col>
        

    <!-- END MANAGE COLLECTION -->
    <!-- END MANAGE COLLECTION -->
    <!-- END MANAGE COLLECTION -->
    <!-- END MANAGE COLLECTION -->
    <!-- END MANAGE COLLECTION -->
    

        
    </b-row>
    <!-- MANAGE COLLECTION -->
    <!-- MANAGE COLLECTION -->
    <!-- MANAGE COLLECTION -->
    <!-- MANAGE COLLECTION -->
    <!-- MANAGE COLLECTION -->
    
</template>
<script>
export default {
    name: 'manageCollection',
    props: [],

    data () {
        return {
            conditionToFilterBy: '',
            styleToFilterBy: '',
            statusToFilterBy: '',
            searchTermToFilterBy: '',

            sortCategory: null,
            sortCategories: [
                { value: null, text: 'Sort By', disabled: true},
                { value: 'condition', text: 'Condition'},
                { value: 'status', text: 'Status'},
                { value: 'style', text: 'Style'},
                { value: 'favorites', text: 'Favorites'},
            ],

            categoryOptions: [{ value: null, text: 'Select Options', disabled: true}],
            categoryOption: null
        }
    },
    methods:{
        toggleIsShowEditFlags(value) {
            this.$emit('toggleIsShowEditFlags');
        },

        toggleIsManagingCollection() {
            this.$store.dispatch('toggleIsManagingCollection');
        },

        selectSortCategory(eventValue) {
            this.sortCategory = eventValue;
            this.categoryOption = null;
            switch(eventValue) {
                case 'condition':
                    this.categoryOptions = [
                        { value: null, text: 'Select a Condition', disabled: true},
                        { value: 8, text: '8-10'},
                        { value: 5, text: '5-7'},
                        { value: 1, text: '0-4'},
                    ];
                    break;
                case 'status':
                    this.categoryOptions = [
                        { value: null, text: 'Select a Status', disabled: true},                        
                        { value: 'keeper', text: 'Keeper'},
                        { value: 'sale', text: 'For Sale'},
                        { value: 'trade', text: 'For Trade'},
                        { value: 'fsot', text: 'Sale / Trade'},
                        { value: 'favorites', text: 'Favorites'}
                    ];
                    break;
                case 'style':
                    this.categoryOptions = [
                        { value: null, text: 'Select a Style', disabled: true},                        
                        { value: 'diver', text: 'Diver'},
                        { value: 'dress', text: 'Dress'},
                        { value: 'chronograph', text: 'Chronograph'},
                        { value: 'tourbillon', text: 'Tourbillon'},
                        { value: 'black tie', text: 'Black Tie'},
                        { value: 'sport', text: 'Sport'},
                        { value: 'smart', text: 'Smart'},
                        { value: 'apple', text: 'Apple'},
                        { value: 'casual', text: 'Casual'},
                        { value: 'orienteering', text: 'Orienteering'},
                    ];
                    break;
                case 'favorites':
                    this.selectCategoryOption('all');
                    this.categoryOptions = [
                        { value: 'all', text: 'All Favorites'},                       
                        // { value: 'inCollection', text: 'Favorites in Collection'},                       
                        { value: 'notInCollection', text: 'Favorites not in Collection'},                       
                        { value: 'pastFavorites', text: 'Previous Favorites'},                       
                    ];
                    break;
                default:
                    this.sortCategory = null;
                    this.categoryOption = null;
                    this.categoryOptions = [{value: null, text: 'Select Options', disabled: true}];
            }
        },

        selectCategoryOption(eventValue) {
            this.categoryOption = eventValue;
            console.log('about to filter')
            this.filterCollection(this.sortCategory, eventValue)
        },

        filterCollection(sortCategory, categoryOption) {
            let filterObj = {
                category: sortCategory,
                option: categoryOption
            }
            console.log('okie dokie', filterObj)
            this.$store.dispatch('getFilteredCollection', filterObj);
        },

        filterBySearchTerm(eventValue) {
            console.log(eventValue)
            this.$store.dispatch('getFilteredCollectionBySearchTerm', eventValue.toLowerCase())
        },

        addNewWatch() {
            this.$emit('addNewWatch');
            this.isAddingWatch = true;
            this.isEditingExistingWatch = false;
        },

        resetCollectionFilter(){
            this.selectSortCategory();
            this.$store.dispatch('loadUserCollection');
        }

    },

    computed: {
        isManagingCollection: {
            get() {
                return this.$store.state.isManagingCollection;
            },
            set(value) {
                this.$store.dispatch('toggleIsManagingCollection');
            }
        },

        isShowFlags: {
            get() {
                return this.$store.state.isShowFlags;
            },
            set(value) {
                this.$store.dispatch('toggleIsShowFlags');
            }
        },

        isShowEditFlags: {
            get() {
                return this.$store.state.isShowEditFlags;
            },
            set(value) {
                this.$store.dispatch('toggleIsShowEditFlags');
            }
        }
    }
    
}
</script>
<style scoped>

</style>

