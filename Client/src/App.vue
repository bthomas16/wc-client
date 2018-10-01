<template>
  <b-container fluid>
    <b-row no-gutters class="z-4">
      <b-col v-if="isLoading" id="loadingSpinner" class="bg-white black absolute w-100 h-100">
      <h1>... LOADING ...</h1>
      </b-col>
    </b-row>
    <app-header></app-header>
    <transition name="slide">
      <router-view :key="$route.fullPath"></router-view>
    </transition>
      
  </b-container> 
</template>

<script>
import Header from './components/Header.vue'

  export default {
    data () {
        return {
            isLoading: this.$store.state.isLoading
        }
    },
    components: {
      appHeader: Header
    },
  }

</script>

<style>
</style>
