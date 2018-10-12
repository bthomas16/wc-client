<template>
    <b-container fluid>
        <b-row id="watchRow" align-h="between" class="mt-3 mt-md-4">

            <draggable :Collection="Collection" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="onEnd">
                <b-col cols="4" md="3" class="left" v-for="(watch) in Collection" :key="watch.id" :id="watch.id">
                    <b-row align-v="start" align-h="around" class="watch mb-3" no-gutters>
                        <b-col cols="12" class="watch-wrapper order-1 border box-shadow relative" >
                            <p id="editIcon" v-if="isManagingCollection" class="bg-blue absolute r0 t0 h6 pointer z4" @click="editWatch(watch)"></p>
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
                                        <h6 id="watchName" class="nowrap right-align right r0 mt-3 mr-0 mr-md-3 absolute col-11 overflow-hidden"><strong>{{watch.name}}</strong></h6>
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
    </b-container>
</template>

<script>
import axios from 'axios';
import draggable from 'vuedraggable'

export default {
    name: 'watchCollection',
    components: {
        draggable
    },

    data () {
        return {
            emptyHeart: "http://localhost:8081/api/static-assets/empty-heart.png",
            fullHeart: "http://localhost:8081/api/static-assets/full-heart.png",
            // DRAGABLE PROPERTIES

            editable: true,
            isDragging: false,
            delayedDragging: false
        }
    },
    props: {
        Collection: Array,
        isManagingCollection: Boolean
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

    #editIcon {
        border-radius: 50%;
        border: 1px solid white;
        background-image: url('http://localhost:8081/api/static-assets/editIcon1.png');
        background-position: center;
        background-size: 70%;
        background-repeat:no-repeat;
        width: 2.25em;
        height: 2.25em;
        margin-top: -.5em;
        margin-right: -.5em;
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
    }

    @media(max-width: 415px) {
        #searchRef, #seeMore {
            font-size: .65em;
        }
    }


</style>

