<template>
  <b-container fluid id="app" class="w-100 p-0">
    <!-- <app-loader v-if="isLoading" class="h-100 bg-white absolute z-4"></app-loader> -->
      <app-header id="header" v-if="!isLoading"></app-header>
      <div class="wrapper w-100 p-0">
        <transition name="slide-fade">
          <router-view id="body" :key="$route.fullPath"></router-view>
        </transition>
      </div>
      <app-footer v-if="!isLoading" id="footer" class="w-100 m-0 p-0"></app-footer>
      
  </b-container>
</template>

<script>

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Loader from './components/Loader.vue'

export default {

  components: {
    appHeader: Header,
    appFooter: Footer,
    appLoader: Loader
  },

  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>

<style scoped>

.wrapper {
  min-height: 100vh;
  height: auto;
}
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
