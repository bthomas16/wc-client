<template>
  <b-navbar toggleable="md" type="dark" variant="info" class="p0">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>


  <b-navbar-brand class="ml2"><router-link :to="getAuth ? '/profile' : '/'">WC</router-link></b-navbar-brand>
  <p>{{getAuth}}</p>

  <b-collapse is-nav id="nav_collapse">  

    <b-navbar-nav class="mt1 white">
      <b-nav-item>My Profile</b-nav-item>
      <b-nav-item>Buy | Sell | Trade</b-nav-item>
      <b-nav-item>Discover</b-nav-item>
      <b-nav-item>Watch News</b-nav-item> 
      <b-nav-item @click="logout" class="d-absolute r0 d-xs-none mr2" v-if="getAuth">Logout</b-nav-item>    
    </b-navbar-nav>
  </b-collapse>

  
</b-navbar>

</template>

<script>
export default {
  data: function() {
    return {
      user: this.$store.state.user,
      jwt: localStorage.getItem('watchJwt'),
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push({path: '/'})
      })
    }
  },
  computed: {
    getAuth: function() {
      return this.$store.getters.getUserAuthStatus();
    }
  }
  
  
}
</script>

<style>

.absolute {
  position: absolute;
}
.r0 {
  right: 0;
}
.container-fluid {
  padding: 0;
}
.navbar-brand {
  font-size: 1.75em;
}

.navbar-nav {
  margin-left:4em;
}

.navbar-dark .navbar-nav .nav-link {
  color:white;
  
}

</style>

