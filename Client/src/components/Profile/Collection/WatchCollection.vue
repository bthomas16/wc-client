<template>
    <b-container fluid >
        <b-row id="watchRow" align-h="between" class="mt-4">


            <!-- <div class="col-md-3">
                <draggable class="list-group" element="ul" v-model="list" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
                    <transition-group type="transition" :name="'flip-list'">
                    <li class="list-group-item" v-for="element in list" :key="element.order">
                        <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
                        {{element.name}}
                        <span class="badge">{{element.order}}</span>
                    </li>
                    </transition-group>
                </draggable>
            </div> -->

            <draggable :Collection="Collection" :options="{group:'watch'}" @start="onDragStart" @end="onDragEnd" @change="changed">
                <b-col cols="3" md="3" class="dropZone border left" v-for="watch in Collection" :key="watch.id">
                    <b-row align-v="start" align-h="around" class="watch mb-3">
                        <b-col cols="11" class="watch-wrapper order-1 p-2 border box-shadow" >
                            <b-row aling-h="center" align-v="center" no-gutters>
                                <b-col cols="12" lg="6" class="mx-auto">
                                    <b-img
                                    src="https://n3.sdlcdn.com/imgs/e/v/o/SDL044502225_1-6ee47.jpg" 
                                    fluid>
                                    </b-img>
                                </b-col>
                                <b-col lg="6" class="d-none d-lg-block">
                                    <b-row align-h="end" no-gutters>
                                        <h6 class="nowrap"><strong>{{watch.name}}</strong></h6>
                                        <b-col cols="10" class="mt-5 px-1">
                                            <b-button variant="outline-info" size="sm" block @click="selectWatch(watch)" class="z4">See More</b-button>
                                        </b-col>
                                        <b-col cols="10" class="px-1 h6"> 
                                            <b-button id="searchRef" variant="primary" class="mt-2" size="sm" block>Search Ref #</b-button>   
                                        </b-col>
                                        <b-col cols="10" class="p-0" >
                                            <b-img :src="emptyHeart" width="40px;" class="pointer right" ></b-img> 
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
    components: {
        draggable
    },
    name: 'watchCollection',

    data () {
        return {
            isEditMode: false,
            emptyHeart: "http://localhost:8081/api/static-assets/empty-heart.png",
            fullHeart: "http://localhost:8081/api/static-assets/full-heart.png",
            options: 
            {
                dropzoneSelector: '.dropZone',
                draggableSelector: '.watch',
                excludeOlderBrowsers: true,
                multipleDropzonesItemsDraggingEnabled: false,
                showDropzoneAreas: false,
                onDrop: function(event) {},
                onDragstart: function(event) {
                    let watchId = event.items[0].id;
                    console.log(event.items[0])

                },
                onDragend: function(event) {
                    console.log(event)
                }
            },
            dropZoneStyles: '',
            containerId: 1
        }
        
    },
    methods: {
        selectWatch(watch) {
            this.$emit('selectWatch', watch)
        },

        submitWatch() {
            console.log('will be submitting this watch', this.addWatch)
            this.isEdit = false;
            this.$store.dispatch('submitWatch', this.addWatch).then(() => {
                this.addWatch = {}
                this.$store.dispatch('loadUserCollection');
            })
        },

        changed(e) {
            console.log('hidhf', e)
        },

        onDragStart(e) {
            console.log('dragging', e)
            document.getElementsByClassName('watch')
        },

        onDragEnd(e) {
                    console.log('dragging', e)
                    document.getElementsByClassName('watch')
                },

        containerAdd() {
            if (this.container < 4)
                return this.container + 1;
        }
    },

    computed: {
        Collection() {
            return this.$store.state.Collection
        }
    }
}
</script>

<style>
    #searchRef {
        font-size: .75em;
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
        #searchRef {
            font-size: .5em;
        }
    }

    @media(max-width: 415px) {
        #searchRef {
            font-size: .65em;
        }
    }


</style>

