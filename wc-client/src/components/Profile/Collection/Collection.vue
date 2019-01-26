<template>
    <b-container v-if="!isCollectionLoaded" class="z-4">
        <b-row align-h="center" align-v="center">
            <b-col class="mx-auto mt-5 center">LOADING...</b-col>
        </b-row>
    </b-container>
    <b-container fluid v-else >
         <b-row v-if="Collection.length == 0 && !isManagingCollection" align-h="center" no-gutters>
            <b-col cols="10" md="8" class="border my-5 center p-2 p-md-5" id="begin-collection">
                <p class="h2 center">Welcome to your <span class="nowrap">Watch Collection!</span></p>
                <p class="h4 m-h2 mt-4 mt-md-5">Get started by adding a watch!</p>
                <b-row>
                    <b-col cols="6" class="mx-auto my-3">
                        <b-button variant="success" class="my-2" size="lg" @click="addWatchModal" block>Add Watch</b-button>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <b-row v-else align-h="center" no-gutters>
            <b-col>
                <b-row class="my-3 mx-auto pl-2 pl-md-0 center m-left-align" align-v="center" align-h="center">
                    <b-col cols="12" md="5" lg="6" class="p-0 m-0 h3">
                        <strong>{{User.firstName}}'s Collection</strong>
                    </b-col>
                    <b-col cols="12" md="7" lg="6" class="p-0 m-0 center m-left-align mt-2 mt-md-0">
                        <p cols="12" class="mb-1 mb-md-0 m-h2 h4 left-align m-left-align w-75 mw-100" @click="OpenWotdSeeMore(WOTD.id)">Watch of The Day: <span class="bold pointer">{{titleCase(WOTD.name)}}</span> <strong></strong> </p>
                        <p class="my-0 m-h2 mt-0 h4 left-align m-left-align w-75 mw-100">Total Value: <strong class="green">${{getCollectionTotalValue}}</strong> </p>
                    </b-col>
                </b-row>

                <manage-collection
                    v-on:addNewWatch="addWatchModal"
                    v-on:selectRandomWatch="SelectRandomWatch">
                </manage-collection>


                
                <draggable-watch-collection
                    v-if="isDragToOrganize"
                    @selectWatch="selectWatch"
                    @editWatchModal="editWatchModal"
                    @orderChanged="orderChanged"
                    :Collection="Collection">
                </draggable-watch-collection>
                <non-draggable-watch-collection
                    v-else-if="!isDragToOrganize"
                    @selectWatch="selectWatch"
                    @editWatchModal="editWatchModal"
                    @orderChanged="orderChanged"
                    :Collection="Collection">
                </non-draggable-watch-collection>
                <b-col v-else class="center w-100 mt-4">
                    No watches found
                </b-col>
            </b-col>
        </b-row>

        <!-- No watch collection / Start Collection -->

        <!-- SEE MORE MODAL -->
        <b-modal
            ref="seeMoreModal"
            id="see-more-modal">
            <div slot="modal-title" class="h-100 breakWord h4" v-if="selectedWatch.name">{{ titleCase(selectedWatch.name) }}</div>
            <div slot="modal-header-close" class="w-100 m-h2 mt-2 mt-md-1" @click="resetWatchFormAndModals">
                X
            </div>
            <see-more-modal
                :selectedWatch="selectedWatch"
                :isAddingWatch="isAddingWatch">
            </see-more-modal>
            <div slot="modal-footer" class="w-100 mt-0 p-0">
                <b-btn  size="sm" class="center white bg-light-yellow" variant="default" @click="backToEditStart" v-if="isAddingWatch || isEditingExistingWatch">
                    Back
                </b-btn>
                <b-btn size="sm" class="float-right bg-light-blue white" variant="default" @click="submitWatch" v-if="isAddingWatch || isEditingExistingWatch">
                    Submit
                </b-btn>
                <b-btn size="sm" class="float-right bg-light-blue white" variant="default" v-else @click="resetWatchFormAndModals">
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
            <div slot="modal-title" v-if="isEditingExistingWatch" class="h4">Editing {{titleCase(addWatch.name)}}</div>
            <div slot="modal-header-close" class="w-100 m-h2 mt-2 mt-md-1" @click="resetWatchFormAndModals">
                X
            </div>
            <add-watch-modal
                :previewWatch="previewWatch"
                :addWatch="addWatch"
                :addWatchCount="addWatchCount">
            </add-watch-modal>
            <b-row slot="modal-footer" no-gutters class="w-100" align-h="end" align-v="center">
                <b-col cols="12">
                    <!-- Potential Progress Bar -->
                    <p v-if="!addWatch.name && addWatchCount == 2" class="red p-0 m-0 h5 m-h4">Please add a name for this watch</p>
                </b-col>
                <b-col cols="12">
                    <b-row v-if="addWatchCount == 1 " no-gutters align-h="end">
                        <b-btn size="sm" class="right bg-light-blue white" variant="default" @click="addWatchCount++" :disabled="!addWatch.src.images.length">
                            Add Details
                        </b-btn>
                    </b-row>
                    <b-row align-h="between" no-gutters>
                        <b-btn  size="sm" class="center white bg-light-yellow white" :class="addWatchCount == 1 ? 'hidden' : ''" variant="default" @click="addWatchCount--">
                            Previous
                        </b-btn>
                        <b-button size="sm" class="bg-light-blue white" variant="default" @click="addWatchCount++" :class="addWatchCount == 2 ? '' : 'hidden'" :disabled="!addWatch.name">
                            Continue
                        </b-button>
                        <b-btn size="sm" class="bg-light-blue white" :class="addWatchCount == 3 ? '' : 'hidden'" variant="default" @click="addWatchCount++">
                            Owner Details
                        </b-btn>
                        <b-btn size="sm" class="bg-light-blue white" :class="addWatchCount == 4 ? '' : 'hidden'" variant="default" @click="previewWatch">
                            Preview
                        </b-btn>
                    </b-row>
                </b-col>
            </b-row>
        </b-modal>

    </b-container>
</template>

<script>
import axios from 'axios'
import SeeMoreModal from './Modals/SeeMoreModal.vue'
import AddWatchModal from './Modals/AddWatchModal.vue'
import DraggableWatchCollection from './DraggableWatchCollection.vue'
import NonDraggableWatchCollection from './NonDraggableWatchCollection.vue'
import ManageCollection from './ManageCollection.vue'
import { setTimeout } from 'timers'

export default {
  components: {
    seeMoreModal: SeeMoreModal,
    addWatchModal: AddWatchModal,
    draggableWatchCollection: DraggableWatchCollection,
    nonDraggableWatchCollection: NonDraggableWatchCollection,
    manageCollection: ManageCollection
  },
  data () {
    return {
      isChangedOrder: false,
      addWatchCount: 1,

      showDismissibleAlert: false,
      isAddingWatch: false,
      isEditingExistingWatch: false,
      selectedWatch: {},
      isSeeMore: false,
      addWatch: {
        src: { images: [] }
      },
      addWatchImages: [],
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
    selectWatch (watch) {
      this.selectedWatch = watch
      this.$refs.seeMoreModal.show()
    },

    editWatchModal (watch) {
      this.addWatch = watch
      this.isAddingWatch = false
      this.isEditingExistingWatch = true
      this.addWatch.name = this.titleCase(watch.name)
      this.addWatch.brand = this.titleCase(watch.brand)
      this.$refs.addWatchModal.show()
    },

    OpenWotdSeeMore (watchId) {
      let watch = this.Collection.find(x => x.id === watchId)
      this.selectWatch(watch)
    },

    SelectRandomWatch () {
      let max = this.Collection.length
      let min = 0
      let index = Math.floor(Math.random() * (max - min) + min)
      let randomWatch = this.Collection[index]
      console.log('we out here', randomWatch)
      this.selectWatch(randomWatch)
    },

    openWatchModal () {
      this.$rers.addWatchModal.show()
    },

    addWatchModal () {
      this.createAddWatch()
      this.isAddingWatch = true
      this.isEditingExistingWatch = false
      this.$refs.addWatchModal.show()
    },

    resetWatchFormAndModals () {
      this.isAddingWatch = false
      this.isEditingExistingWatch = false
      this.$refs.addWatchModal.hide()
      this.$refs.seeMoreModal.hide()
      this.addWatch = this.addWatch
      this.addWatchCount = 1
    },

    previewWatch () {
      if (this.addWatch.brand) { this.addWatch.brand = this.addWatch.brand.toLowerCase() }
      this.addWatch.name = this.addWatch.name.toLowerCase()
      console.log(this.addWatch)
      this.selectedWatch = this.addWatch

      this.$refs.addWatchModal.hide()
      this.$refs.seeMoreModal.show()
    },

    submitWatch () {
      this.isAddingWatch = false
      this.isEditingExistingWatch = false
      this.$refs.seeMoreModal.hide()
      if (!this.addWatch.id) {
        // watch doesnt exist yet, create new watch
        this.$store.dispatch('submitNewWatch', this.addWatch)
      } else {
          // editing existing watch
        this.$store.dispatch('submitEditWatch', this.addWatch)
      }
      this.createAddWatch() // reset add watch to defaults
      this.addWatchCount = 1 // resets watch count

      // TODO: NOT THIS
    //   setTimeout(() => {
    //     this.$store.dispatch('getNumberFSOT')
    //     this.$store.dispatch('loadUserCollection')
    //   }, 500)
    },

    backToEditStart () {
      this.addWatchCount = 1
      this.$refs.addWatchModal.show()
      this.$refs.seeMoreModal.hide()
    },

    createAddWatch () {
      this.addWatch = {
        src: { images: [] },
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

    orderChanged () {
      this.isChangedOrder = true
    },

    titleCase (str) {
      var splitStr = str.toLowerCase().split(' ')
      for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
      }
      return splitStr.join(' ')
    },

    titleCase (str) {
      var splitStr = str.toLowerCase().split(' ')
      for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
      }
      return splitStr.join(' ')
    }
  },

  computed:
    {
      isLoading () {
        return this.$store.state.isLoading
      },

      getCollectionTotalValue () {
        let val = 0
        this.Collection.forEach(x => {
          if (x.forSalePrice) {
            val += x.forSalePrice
          } else if (x.marketValue) {
            val += x.marketValue
          } else if (x.marketValue) {
            val += x.forTradeValue
          }
        })
        if (val > 0) {
          return val
        } else {
          return 'N/A'
        }
      },

      User () {
        return this.$store.state.User
      },

      isDragToOrganize () {
          return this.$store.state.isDragToOrganize
      },

      Collection () {
        if (this.isManagingCollection) {
          return this.$store.state.FilteredCollection
        } else return this.$store.state.Collection
      },

      isManagingCollection () {
        return this.$store.state.isManagingCollection
      },

      isUserLoaded () {
        return this.$store.state.isUserLoaded
      },

      isCollectionLoaded () {
        return this.$store.state.isCollectionLoaded
      },

      isFilteringCollection () {
        return this.$store.state.isFilteringCollection
      },

      WOTD () {
          let Collection = this.$store.state.Collection;
          if (Collection) {
            let i = this.$store.state.cookieValueWOTD
            let c = this.$store.state.Collection[i];
            return { name: c.name, id: c.id }
          } else {
              return 'Add a Watch to your Collection!'
          }
      }
    },

  created: function () {
    this.$store.dispatch('loadUserCollection')
    this.$store.dispatch('getFavorites')
  }
}
</script>

<style scoped>
.breakWord {
    word-wrap: break-word;
    width: 100%;
}
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

@media(min-width: 991px) {
    .pr-3half {
        padding-right: .75em;
    }
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
