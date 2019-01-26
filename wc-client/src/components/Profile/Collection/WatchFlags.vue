<template>
    <b-container fluid>
        <b-row no-gutters>
            <b-col cols="12" class="p-0 m-0">
                <b-row no-gutters v-if="isShowFlags && !isManagingCollection">
                    <!-- Truncated Watch Name -->
                    <p class="d-block d-md-none w-100 h5 m-h7 p-0 m-0"><strong>{{truncatedWatchName(titleCase(watch.name), currentTruncatedLength)}}</strong></p>

                    <!-- FSOT STATUS -->
                    <b-col cols="6" class="bg-green" v-if="(watch.isForSale && !watch.isForTrade)">
                        <p id="forSaleIcon" class=" center pointer z4 flag m-0 white broder-right-white" >Sale</p>
                    </b-col>
                    <b-col cols="6" class="bg-navy" v-if="(!watch.isForSale && watch.isForTrade)">
                        <p id="forTradeIcon" class=" pointer z4 flag m-0 white broder-right-white center">Trade</p>
                    </b-col>
                    <b-col cols="6" v-if="(!watch.isForSale && !watch.isForTrade)" class="bg-light-yellow">
                        <p id="keeperIcon" class="pointer z4 flag m-0 white broder-right-white center">Keeper</p>
                    </b-col>
                    <b-col cols="6" v-if="(watch.isForSale && watch.isForTrade)" class="bg-light-blue">
                        <p id="fsotIcon" class=" pointer z4 flag m-0 white broder-right-white center fsot">FSOT</p>
                    </b-col>
                    <!-- MOVEMENT TYPE -->
                    <b-col cols="6" v-if="watch.movementType" class="bg-navy">
                        <p id="movementTypeIcon" class=" center pointer z4 white flag m-0" :class="GetAbbreviatedWatchType(watch.movementType).length > 5 ? 'fitText' : ''">{{GetAbbreviatedWatchType(watch.movementType)}}</p>
                    </b-col>
                </b-row>
                <b-row no-gutters v-if="isManagingCollection && isShowEditFlags && !IsViewingPreviousWatches">
                    <b-col cols="6" v-if="isManagingCollection"  class="p-1 m-0 nowrap bg-red">
                        <p id="removeIcon" class="center h8 m-0 pointer z4 white bold" @click="removeWatchModal(watch)">X</p>
                    </b-col>
                    <b-col cols="6" v-if="env == 'development'" class="bg-light-blue p-1 m-0 nowrap">
                        <p id="editIconD" class="h6 center p-2 pointer z4 white" @click="editWatch(watch)"></p>
                    </b-col>
                    <b-col cols="6" v-else  class="bg-light-blue p-1 m-0 nowrap">
                        <p id="editIconP" class="h6 center p-2 pointer z4 white" @click="editWatch(watch)"></p>
                    </b-col>
                </b-row>
                <b-row no-gutters v-if="isManagingCollection && isShowEditFlags && IsViewingPreviousWatches">
                    <b-col cols="12" v-if="isManagingCollection"  class="p-0 m-0 nowrap bg-light-blue">
                        <p class="h6 center p-1 pointer z4 white" @click="removedWatchModal(watch)"><strong class="h5 mb-0">Details</strong></p>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>

</template>

<script>
export default {
  name: 'watchFlags',
  props: ['watch', 'isShowFlags', 'isShowEditFlags', 'isManagingCollection'],
  data () {
    return {
      env: process.env.NODE_ENV
    }
  },
  methods: {
    removeWatchModal (watch) {
      this.$emit('removeWatchModal', watch)
    },

    removedWatchModal (watch) {
      this.$emit('removedWatchModal', watch)
    },

    editWatch (watch) {
      this.$emit('editWatch', watch)
    },

    truncatedWatchName (name, lengthToTruncate) {
      if (name.length > lengthToTruncate) {
        return name.substring(0, lengthToTruncate) + '...'
      } else { return name }
    },

    titleCase (str) {
      var splitStr = str.toLowerCase().split(' ')
      for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
      }
      return splitStr.join(' ')
    },

    GetAbbreviatedWatchType (fullName) {
      let val;
      switch (fullName) {
        case 'automatic':
          val = 'Auto'
          break
        case 'solar':
          val = 'Solar'
          break
        case 'quartz':
          val = 'Quartz'
          break
        case 'manual':
          val = 'Manual'
          break
      }
      return val;
    }
  },

  computed: {
    currentTruncatedLength () {
      let val;
      let currentButtonState = this.$store.state.CurrentCardSize
      switch (currentButtonState) {
        case 'sm':
          val = 8
          break
        case 'md':
          val = 12
          break
        case 'lg':
          val = 18
          break
        default:
          val = 8
      }
        return val      
    },

    currentCardSize() {
        return this.$store.state.CurrentCardSize
    },

    IsViewingPreviousWatches () {
      return this.$store.state.isViewingPreviousWatches
    }
  }
}
</script>
<style scoped>
    .detailsIcon{
        border-radius: 5%;
        background-position: center;
        background-repeat:no-repeat;
        width: 2em;
        height: 2em;
        margin-top: -1.1em;
    }

    #editIcon, #removeIcon {
        height: 1.5em;
    }

    #editIconD {
        background-image: url('http://localhost:8081/api/static-assets/editIcon1.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: 1.25em;
     }

     #editIconP {
        background-image: url('/api/static-assets/editIcon1.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: 1.25em;
     }

     .flag {
        padding: .35em 0 !important;
        font-size: .75em;
    }

    .p-half {
        padding: .5rem;
    }

    .padlock {
        width: .75rem;
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
        background-size: 1.25rem;
        }

        .flag {
            font-size: .6rem;
            padding: .3em !important;

        }
    }

    @media(max-width: 374px) {
        #searchRef, #seeMore {
            font-size: .65rem;
        }

        .flag {
            font-size: 7.5px;
            padding: .25em;
        }
    }
</style>
