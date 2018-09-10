<template>
  <b-container fluid :class="modalStatus ? 'overflow-hidden' : ''">
    <app-header> </app-header>
    <router-view></router-view>
  </b-container> 
</template>

<script>
import Header from './components/Header.vue'

  export default {
    components: {
      appHeader: Header
    },
    data: function() {
      return {
          modalStatus: this.$store.getters.getModalStatus
        
      }
    }
  }

</script>

<style>
body .overflow-hidden {
    overflow-y: hidden;
}

</style>
