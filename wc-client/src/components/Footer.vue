<template>
    <b-container fluid>
        <b-row class="bg-darkgray p-2" no-gutters>
            <b-col cols="6">
                <ul class="white">
                    <li><router-link to="/discover">Discover Watches</router-link></li>
                    <li><router-link to="/contact">Contact Us</router-link></li>
                    <!-- <li>About Us</li> -->
                </ul>
            </b-col>
        </b-row>
        <b-row no-gutters>
            <b-col cols="12" class="bg-darkgray p-0 white center">
                <!-- <p class="h7 my-0">ⒸAll Rights Reserved</p> -->
                <p class="h6 my-0 mb-1">Watch SOC @{{DateYear}}  </p>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
  name: 'Footer',

  methods: {
    logout () {
      this.$store.dispatch('logout').then(() => {
        location.reload()
      })
    }
  },

  computed: {
    DateYear () {
      return (new Date()).getFullYear()
    }
  }
}
</script>

<style scoped>
    a {
        color: white;
    }
    
    ul {
        padding: 0;
        margin: 0;
    }

    li {
        padding: 0;
        margin: 0;
        list-style-type: none;
        color: white !important;
    }

</style>
