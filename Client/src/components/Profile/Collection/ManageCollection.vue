<template fluid>
    <b-row no-gutters>
        <b-row class="w-100 mb-2 mb-md-2 relative" no-gutters align-h="center"> 
            <b-col cols="12" md="10" class="border-bottom"></b-col>
            <b-col cols="12" md="10" class="px-2 px-md-0">
                <b-row no-gutters align-h="between" align-v="center">
                    <b-col cols="6" class="left-align pointer gray bold h4 m-h2 my-1" v-if="isManagingCollection" >
                        <strong class="green" @click="toggleIsManagingCollection">&#x2713;</strong>
                        <strong class="ml-2">Reset</strong>
                    </b-col>
                </b-row>
            </b-col> 
        </b-row>

        <!-- FILTER & SORT WATCH ARRAY -->
        <b-row  class="px-0 px-md-2 px-lg-4" align-v="start" align-h="center" v-if="isManagingCollection" no-gutters>
            <b-col cols="4" md="4"  class="manage-btn-border px-2" >
                <b-row align-v="start" align-h="center" id="watch-controls">
                    <b-col lg="6" cols="12" class="mx-auto center" >
                        <b-button id="manageButton" variant="primary" block size="sm">Manage</b-button>
                    </b-col>
                    <b-col lg="6" cols="12" class="mt-2 mt-lg-0">
                        <b-button id="addWatchButton" variant="success" @click="addWatchModal" size="sm" block>+ Watch</b-button>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="8 px-2">
                <b-row align-v="start" align-h="start" no-gutters>
                    <b-col cols="6" md="4">
                        <b-form-select id="categoryOptions" :options="sortCategories" v-model="sortCategory" @change="selectSortCategory"></b-form-select>
                    </b-col>
                    <b-col cols="6" md="4">
                        <b-form-select id="categoryOptions" :options="categoryOptions" v-model="categoryOptions" @change="selectCategoryOption" :disabled="!sortCategory"></b-form-select>
                    </b-col>
                    <!-- <b-col cols="2" class="mx-auto selectWrapper d-none d-lg-block">
                        <b-form-select id="conditionSelect" class="btn m-0 p-0 pl-1" :options="conditionOptions" v-model.number="conditionToFilterBy" @change="filterByCondition"/>
                    </b-col>
                    <b-col cols="6" md="3" class="pr-1 p-lg-0 mx-auto mt-0 selectWrapper" order-sm="2">
                        <b-form-select id="styleSelect" class="btn m-0 p-0 pl-1" :options="styleOptions" v-model="styleToFilterBy" @change="filterByStyle"/>  
                    </b-col>
                    <b-col cols="6"  md="2" class="pl-1 p-lg-0 mx-auto mt-0 selectWrapper" order-sm="1">
                        <b-form-select id="statusSelect" class="btn m-0 p-0 pl-1" :options="statusOptions" v-model="statusToFilterBy" @change="filterByStatus"/>     
                    </b-col>
                    <b-col cols="12" md="3" order="3" class="mx-auto selectWrapper pr-3half" order-sm="3">
                        <b-input-group prepend="&#9906;" class="mt-2 mt-lg-0" size="sm">
                            <b-form-input id="searchInput" type="text" placeholder="Search" size="sm" @input="filterBySearchTerm" v-model="searchTermToFilterBy"></b-form-input>
                        </b-input-group>
                    </b-col> -->
                </b-row>
            </b-col>
        </b-row>

    <!-- END MANAGE COLLECTION -->
    <!-- END MANAGE COLLECTION -->
    <!-- END MANAGE COLLECTION -->
    <!-- END MANAGE COLLECTION -->
    <!-- END MANAGE COLLECTION -->
    

        <b-row align-v="center" align-h="start" class="mx-auto w-100 px-2 px-md-5" v-else>
            <b-col class="mx-auto" cols="12" md="7">
                <b-button variant="info" class="my-0" size="sm" @click="toggleIsManagingCollection" block>Manage Collection</b-button>
            </b-col>
            <b-col cols="12" sm="5" md="4" class="mt-1 mt-md-0 left-align left nowrap">
                <b-form-checkbox
                    id="toggleFlags"
                    v-model="isShowFlags"
                    :value="true"
                    :unchecked-value="false"> 
                    <span v-if="!isShowFlags">Show Flags on Watches</span>
                    <span v-else>Hide Flags on Watches</span>
                </b-form-checkbox>
            </b-col>
        </b-row>
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
            conditionToFilterBy: null,
            styleToFilterBy: null,
            statusToFilterBy: null,
            searchTermToFilterBy: null,

            sortCategory: null,
            sortCategories: [
                { value: null, text: 'Sort By'},
                { value: 'condition', text: 'Condition'},
                { value: 'status', text: 'Status'},
                { value: 'style', text: 'Style'},
                { value: 'condition', text: 'Condition'},
            ],

            categoryOptions: [],
            categoryOption: null
        }
    },
    methods:{
        toggleIsManagingCollection() {
            this.$store.dispatch('toggleIsManagingCollection');
        },

        selectSortCategory(eventValue) {
            this.sortCategory = eventValue;
            switch(eventValue) {
                case 'condition':
                    this.categoryOptions = [
                        { value: 8, text: '8-10'},
                        { value: 5, text: '5-8'},
                        { value: 1, text: '0-5'},
                    ];
                    break;
                case 'status':
                    this.categoryOptions = [
                        { value: 'keeper', text: 'Keeper'},
                        { value: 'sale', text: 'For Sale'},
                        { value: 'trade', text: 'For Trade'},
                        { value: 'fsot', text: 'Sale / Trade'},
                        { value: 'favorites', text: 'Favorites'}
                    ];
                    break;
                case 'style':
                    this.categoryOptions = [
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
                default:
                    this.categoryOptions = [{value: null, text: 'Select', disabled: true}];
            }
        },

        selectCategoryOption(eventValue) {
            this.categoryOption = eventValue;
            this.filterCollection(this.sortCategory, this.categoryOption)
        },

        filterCollection(sortyCategory, categoryOption) {
            this.$store.dispatch('filterCollection', sortCategory, categoryOption);
        },

        filterBySearchTerm(eventValue) {
            this.$store.dispatch('getFilteredBySearchTerm', eventValue)
        },

        addWatchModal() {
            this.$emit('createAddWatch')
            this.isAddingWatch = true;
            this.isEditingExistingWatch = false;
            this.$refs.addWatchModal.show();
        },

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
        }
    }
    
}
</script>
<style scoped>

</style>

