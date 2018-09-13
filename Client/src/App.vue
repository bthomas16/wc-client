<template>
  <b-container fluid >
    <app-header> </app-header>
    <router-view></router-view>
  </b-container> 
</template>

<script>
import Header from './components/Header.vue'

  export default {
    components: {
      appHeader: Header
    }
  }

</script>

<style>
body .overflow-hidden {
    overflow-y: hidden;
}

</style>
