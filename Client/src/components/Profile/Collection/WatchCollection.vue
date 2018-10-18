<template>
    <b-container fluid>
        <b-row id="watchRow" align-h="between" class="mt-3 mt-md-4" no-gutters  >

            <draggable :Collection="Collection" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="onEnd">
                <b-col cols="4" md="3" class="left" v-for="(watch) in Collection" :key="watch.id" :id="watch.id">
                    <b-row align-v="start" align-h="around" class="watch mb-3" :class="isManagingCollection ? 'mb-4' : ''" no-gutters>
                        <b-col cols="12" class="p-0 m-0">
                            <b-row no-gutters v-if="isShowFlags && !isManagingCollection">
                                <!-- FSOT STATUS -->
                                <b-col cols="5" md="3" class="p-0 m-0" v-if="(watch.isForSale && !watch.isForTrade)">
                                    <p id="forSaleIcon" class="bg-red detailIcon h6 center pointer z4 mb-0 p-1 white broder-right-white" ><strong class="h5 m-h3">FS</strong></p>
                                </b-col>
                                <b-col cols="5" md="3" class="p-0 m-0" v-if="(!watch.isForSale && watch.isForTrade)">
                                    <p id="forTradeIcon" class="bg-blue detailIcon h6 pointer z4 mb-0 p-1 white broder-right-white center"><strong class="h5 m-h3">FT</strong></p>
                                </b-col>
                                <b-col cols="5" md="3" v-if="(!watch.isForSale && !watch.isForTrade)">
                                    <p id="keeperIcon" class="bg-blue detailIcon h6 pointer z4 mb-0 p-1 white broder-right-white center" ><strong class="h5 m-h3">K</strong></p>
                                </b-col>
                                <b-col cols="5" md="3" v-if="(watch.isForSale && watch.isForTrade)">
                                    <p id="fsotIcon" class="bg-blue detailIcon h6 pointer z4 mb-0 p-1 white broder-right-white center"><strong class="h5 m-h3">S/T</strong></p>
                                </b-col>
                                <!-- MOVEMENT TYPE -->
                                <b-col cols="7" md="3" class="p-0 m-0" v-if="watch.movementType">
                                    <p id="movementTypeIcon" class="bg-red detailIcon h6 center pointer z4 white mb-0 p-1"><strong class="h5 m-h3">Solr</strong></p>
                                </b-col>
                            </b-row>
                            <b-row no-gutters v-if="isManagingCollection">
                                <b-col cols="6" md="4" v-if="isManagingCollection"  class="p-0 m-0 nowrap">
                                    <p id="removeIcon" class="bg-red h6 center p-1 pointer z4 white" @click="removeWatchModal(watch)"><strong class="h6 mb-0">X</strong></p>
                                </b-col>
                                <b-col cols="6" md="4" v-if="isManagingCollection"  class="p-0 m-0 nowrap">
                                    <p id="editIcon" class="bg-blue h6 center p-1 pointer z4 white" @click="editWatch(watch)"></p>
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
                                <b-col cols="12" xl="6" class="d-none d-md-block mx-auto">
                                    <b-row align-h="center" no-gutters>
                                        <h6 id="watchName" class=" right-align right r0 mt-3 mr-0 mr-md-3 absolute col-11 overflow-hidden"><strong>{{watch.name}}</strong></h6>
                                        <b-col cols="10" class="mt-0 mt-md-5">
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
            size="lg">
            <b-row slot="modal-title" no-gutters>Removing &nbsp; <strong>{{ watchToRemove.name}}</strong></b-row>
            <remove-watch-modal :removeWatchCount="removeWatchCount" :watchIdToRemove="watchIdToRemove" :reasonsWatchMoved="reasonsWatchMoved"></remove-watch-modal>
            <b-row slot="modal-footer" class="p-2" no-gutters>
                <button class="btn btn-warning mx-2 white" @click="removeWatchCount--" v-if="reasonsWatchMoved.typeMoved == 1">Previous</button>
                <button class="btn btn-warning white mx-2" variant="warning" @click="removeWatchCount--" :disabled="reasonsWatchMoved.typeMoved == null">Remove Watch from Collection</button>
            </b-row>
        </b-modal>
    </b-container>
</template>

<script>
import axios from 'axios';
import draggable from 'vuedraggable';
import RemoveWatchModal from './Modals/RemoveWatchModal.vue';

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

            watchToRemove: 'Sample',
            watchIdToRemove: 0,
            removeWatchCount: 1,
            reasonsWatchMoved: {
                watchReceivedBy: null,
                typeMoved: null,
                value: null,
                trades: [{
                    name: '',
                    value: ''
                }],
            },
            
        }
    },
    props: {
        Collection: Array,
        isManagingCollection: Boolean,
        isShowFlags: Boolean
    },
    methods: {
        selectWatch(watch) {
            this.$emit('selectWatch', watch)
        },

        sup(){
            console.log('choong')
        },

        submitWatch() {
            console.log('will be submitting this watch', this.addWatch)
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
            this.watchIdToRemove = watch.id;
            this.$refs.removeWatchModal.show();
        },

        // DRAGABLE METHODS 

        onEnd(event) {
            console.log(event)
            let watchToUpdate = {
                    id: event.item.id,
                    newIndex: event.newIndex,
                    oldInex: event.oldIndex
                }
            // setTimeout(() =>{
                console.log(this.Collection)
                this.$store.dispatch('updateWatchOrder', watchToUpdate);
            // }, 1200)
        },

        onMove({ relatedContext, draggedContext }) {
            console.log(relatedElement, draggedElement)
            const relatedElement = relatedContext.element;
            const draggedElement = draggedContext.element;
            return (
                (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
            );
        },

        handleChange() {
            console.log('hi');
        },

        inputChanged(value) {
            console.log(value);
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
        }
    },

    computed: {
        dragOptions() 
        {
            return {
                animation: 0,
                group: "description",
                disabled: !this.editable,
                ghostClass: "ghost"
            };
        },

        Favorites() {
            return this.$store.getters.getFavorites;
        }

        
    },

    watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
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
               
        /* margin-right: 0em;
        width: 1.75em;
        height: 1.75em; */
    }

    /* #deleteIcon {
        margin-right: 2.5em;
    } */

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
    @media(min-width: 765px) and (max-width: 815px) {
        #searchRef, #seeMore {
            font-size: .6em;
        }

        #watchName {
            font-size: .65em;
        } 

        .heartIcon {
            width: 20px;
        }

        /* #editIcon {
        background-size: 35%;  
            
        } */
    }

    @media(max-width: 600px) {
        #editIcon {
        background-size: 1.25em;              
        }
    }

    @media(max-width: 415px) {
        #searchRef, #seeMore {
            font-size: .65em;
        }
    }


</style>

