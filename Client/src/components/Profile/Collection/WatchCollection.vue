<template>
    <b-container fluid>
        <b-row id="watchRow" align-h="between" class="mt-3 mt-md-4 px-0 pl-lg-4 pr-lg-5" no-gutters >

            <draggable v-model="Collection" @start="drag=true" @end="drag=false" @change="orderChanged">
                <b-col cols="4" md="3" class="left p-half" v-for="(watch) in Collection" :key="watch.id" :id="watch.id">
                    <b-row align-v="start" align-h="around" class="watch mb-1" no-gutters>
                        <b-col cols="12" class="p-0 m-0">
                            <b-row no-gutters>
                                <p class="m-h4 p-0 m-0 d-md-none"><strong>{{truncatedWatchName(titleCase(watch.name), 13)}}</strong></p>
                            </b-row>
                            <b-row no-gutters v-if="isShowFlags && !isManagingCollection">
                                <!-- FSOT STATUS -->
                                <b-col cols="6" class="bg-red" v-if="(watch.isForSale && !watch.isForTrade)">
                                    <p id="forSaleIcon" class="detailIcon center pointer z4 flag m-0 white broder-right-white" >Sale</p>
                                </b-col>
                                <b-col cols="6" class="bg-blue" v-if="(!watch.isForSale && watch.isForTrade)">
                                    <p id="forTradeIcon" class="detailIcon pointer z4 flag m-0 white broder-right-white center">Trade</p>
                                </b-col>
                                <b-col cols="6" v-if="(!watch.isForSale && !watch.isForTrade)" class="bg-blue">
                                    <p id="keeperIcon" class="detailIcon pointer z4 flag m-0 white broder-right-white center">Keeper</p>
                                </b-col>
                                <b-col cols="6" v-if="(watch.isForSale && watch.isForTrade)" class="bg-blue">
                                    <p id="fsotIcon" class="detailIcon pointer z4 flag m-0 white broder-right-white center fsot">FSOT</p>
                                </b-col>
                                <!-- MOVEMENT TYPE -->
                                <b-col cols="6" v-if="watch.movementType" class="bg-red">
                                    <p id="movementTypeIcon" class="detailIcon center pointer z4 white flag m-0" :class="GetAbbreviatedWatchType(watch.movementType).length > 5 ? 'fitText' : ''">{{GetAbbreviatedWatchType(watch.movementType)}}</p>
                                </b-col>
                            </b-row>
                            <b-row no-gutters v-if="isManagingCollection && isShowEditFlags">
                                <b-col cols="6" md="4" v-if="isManagingCollection"  class="p-0 m-0 nowrap bg-red">
                                    <p id="removeIcon" class="h6 center p-1 pointer z4 white" @click="removeWatchModal(watch)"><strong class="h6 mb-0">X</strong></p>
                                </b-col>
                                <b-col cols="6" md="4" v-if="isManagingCollection"  class="p-0 m-0 nowrap bg-blue">
                                    <p id="editIcon" class="h6 center p-1 pointer z4 white" @click="editWatch(watch)"></p>
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col cols="12" class="watch-wrapper order-1 border box-shadow" >
                            
                            <b-row aling-h="center" align-v="center" no-gutters>
                                <b-col cols="12" xl="6" class="mx-auto">
                                    <b-img
                                    @click="selectWatch(watch)"
                                    src="https://n3.sdlcdn.com/imgs/e/v/o/SDL044502225_1-6ee47.jpg" 
                                    fluid class="pointer">
                                    </b-img>
                                </b-col>
                                <b-col cols="12" xl="6" class="d-none d-md-block mx-auto mt-md-2 mt-xl-0">
                                    <b-row no-gutters align-h="end">
                                        <b-col class="right-align right pr-md-3 h5 mt-lg-2">
                                            {{truncatedWatchName(titleCase(watch.name), 13)}}
                                        </b-col>
                                    </b-row>
                                    <b-row align-h="center" no-gutters>
                                        <!-- <h6 id="watchName" class="border"><strong></strong></h6> -->
                                        <b-col cols="10" class="mt-0 mt-md-3">
                                            <b-button id="seeMore" variant="outline-info" size="sm" block @click="selectWatch(watch)" class="z4 py-1 center">See More</b-button>
                                        </b-col>
                                        <b-col cols="10"> 
                                            <b-button id="searchRef" variant="primary" class="mt-2 py-1" size="sm" block>Search Model</b-button>   
                                        </b-col>
                                        <b-col cols="10" class="p-0 my-1" >
                                            <b-img :src="isFavoriteWatch(watch.id) ? fullHeart : emptyHeart" width="30px;" class="heartIcon pointer right" @click="favoriteToggle(watch.id)"></b-img> 
                                        </b-col>
                                    </b-row>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </b-col>
            </draggable>  
        </b-row>

        <b-modal id="remove-watch-modal"
            ref="removeWatchModal"
            size="lg"
            v-if="watchToRemove">
            <b-row slot="modal-title" no-gutters>Removing &nbsp; <strong>{{ titleCase(watchToRemove.name)}}</strong></b-row>
            <div slot="modal-header-close" class="w-100 m-h2 mt-2 mt-md-1" @click="resetReasonsWatchMoved">X</div>
            <remove-watch-modal :watchToRemove="watchToRemove" :reasonsWatchMoved="reasonsWatchMoved"></remove-watch-modal>
            <b-row slot="modal-footer" class="p-2" no-gutters>
                <button class="btn btn-warning white mx-2" variant="warning" :disabled="reasonsWatchMoved.typeMoved == null" @click="submitRemoveWatchForm">Remove Watch from Collection</button>
            </b-row>
        </b-modal>
    </b-container>
</template>

<script>
import axios from 'axios';
import draggable from 'vuedraggable';
import RemoveWatchModal from './Modals/RemoveWatchModal.vue';
import { setTimeout } from 'timers';

export default {
    name: 'watchCollection',
    components: {
        draggable,
        removeWatchModal: RemoveWatchModal
    },

    data () {
        return {
            emptyHeart: "http://localhost:8081/api/static-assets/empty-heart.png",
            fullHeart: "http://localhost:8081/api/static-assets/full-heart.png",
            showFlags: true,
            // DRAGABLE PROPERTIES
            editable: true,
            isDragging: false,
            delayedDragging: false,

            watchToRemove: null,
            reasonsWatchMoved: {
                receivedBy: null,
                typeMoved: null,
                value: null,
                trades: []
            }
        }
    },
    methods: {
        orderChanged() {
            this.$emit('orderChanged')
        },

        resetReasonsWatchMoved() {
            this.reasonsWatchMoved = {
                receivedBy: null,
                typeMoved: null,
                value: null,
                trades: [] 
            }
        },

        selectWatch(watch) {
            this.$emit('selectWatch', watch)
        },

        submitWatch() {
            this.isEdit = false;
            this.$store.dispatch('submitWatch', this.addWatch).then(() => {
                this.addWatch = {}
                this.$store.dispatch('loadUserCollection');
            })
        },

        editWatch(watch) {
            this.$emit('editWatchModal', watch);
        },

        removeWatchModal(watch) {
            this.watchToRemove = watch;
            this.$refs.removeWatchModal.show();
        },

        submitRemoveWatchForm() {
            let watchDetails = { watchToRemove: this.watchToRemove, reasonsWatchMoved: this.reasonsWatchMoved }
            this.$store.dispatch('createRemoveWatch', watchDetails);
            this.$store.dispatch('removeExistingWatch', this.watchToRemove);   
            this.$store.dispatch('loadUserCollection');         
            this.resetReasonsWatchMoved();
            this.$refs.removeWatchModal.hide();
        },

        favoriteToggle(watchId) {
            this.$store.dispatch('toggleWatchFavorite', watchId);
        },

        isFavoriteWatch(watchId) {
            if(this.Favorites) {
             let found = this.Favorites.find((w) => {
                    return w.watch_id == watchId
                })
                if(found) return true
                else return false
            }
        },

        GetAbbreviatedWatchType(fullName) {
            switch(fullName) {
                case "automatic":
                    return "Auto";
                    break;
                case "solar":
                    return "Solar";
                    break;
                case "quartz":
                    return "Quartz";
                    break;  
                case "manual":
                    return "Manual";
                    break; 
            }
        },

        truncatedWatchName(name, lengthToTruncate) {
            if(name.length > lengthToTruncate) {
                return name.substring(0, lengthToTruncate) + '...';
            }
            else 
                return name;
        },

         titleCase(str) {
            var splitStr = str.toLowerCase().split(' ');
            for (var i = 0; i < splitStr.length; i++) {
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
            }
            return splitStr.join(' '); 
        }
    },

    computed: {
        Favorites() {
            return this.$store.state.Favorites;
        },

        Collection: {
            set(newCollectionOrder) {
                window.clearTimeout();
                setTimeout(() => {
                    this.$store.dispatch('updateCollectionOrder', newCollectionOrder);
                }, 500)
            },
            get() {
                return this.$store.state.Collection;
            }
        },

        isManagingCollection() {
            return this.$store.state.isManagingCollection;
        },

        isShowFlags() {
            return this.$store.state.isShowFlags;
        },

        isShowEditFlags() {
            return this.$store.state.isShowEditFlags;
        }
    }
}
</script>

<style scoped>


    #watchName {
        font-size: .80em;
    }

    #seeMore {
        font-size: .70em;
    }

    #searchRef {
        font-size: .60em;
    }

    .btn {
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }

    .right {
        float: right;
    }

    .left {
        float: left;
    }

    .detailsIcon{
        border-radius: 5%;
        background-position: center;
        background-repeat:no-repeat;
        width: 2em;
        height: 2em;
        margin-top: -1.1em;
    }

    #editIcon, #removeIcon {
        height: 1.75em;
    }

    #editIcon {
        background-image: url('http://localhost:8081/api/static-assets/editIcon1.png');  
        background-position: center;   
        background-repeat: no-repeat;  
        background-size: 1.5em;           
     }

    .dropZone[aria-dropeffect="move"]  {
        border-color:#68b;
    }

     .dropZone[aria-dropeffect="move"] .watch-wrapper {
        background-color: #C0D8E0;
    }

    .dropZone[aria-dropeffect="move"]:focus,
    .dropZone[aria-dropeffect="move"].dragover
    {
    outline:none;
    box-shadow:0 0 0 1px #fff, 0 0 0 3px #68b;
    }


    .watch[aria-grabbed="true"] .watch-wrapper
    {
    background:lightgreen;
    color:#fff;
    }
        
    .flag {
        padding: .35em 0 !important;
        font-size: .75em;
    }

    .p-half {
        padding: .5rem;
    }



    @media(min-width: 768px) and (max-width: 1000px) {
        #searchRef, #seeMore {
            font-size: .6em;
        }

        #watchName {
            font-size: .65em;
        } 

        .heartIcon {
            width: 20px;
        }
    }

    @media(max-width: 600px) {
        #editIcon {
        background-size: 1.25em;              
        }

        .flag {
            font-size: .85rem;
            padding: .1em !important;
            
        }
    }

    @media(max-width: 415px) {
        #searchRef, #seeMore {
            font-size: .65rem;
        }

        .flag {
            font-size: 10.5px;
            padding: .2em !important;
        }
    }


</style>

