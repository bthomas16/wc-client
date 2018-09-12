<template>
  <b-navbar toggleable="lg" type="dark" class="bg-blue">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>


  <b-navbar-brand ><router-link class="brown" :to="getAuth ? '/profile' : '/'">Watch Collection</router-link></b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">  

    <b-navbar-nav class="mt1 white ml-0 ml-md-5">
        <b-nav-item >My Profile</b-nav-item>
        <b-nav-item class="ml-0 ml-lg-4">Buy | Sell | Trade</b-nav-item>
        <b-nav-item>Discover</b-nav-item>
        <b-nav-item>Watch News</b-nav-item> 
        <b-nav-item @click="logout" class="relative mobile-only" v-if="getAuth">Logout</b-nav-item>     
        <b-nav-item class="absolute r0 mr-4 rp-2 w-25 d-md-none">
          <b-row>
            <b-col md="4" sm="8" id="ads">
                <b-img src="http://www.bistiproofpage.com/wp-content/uploads/2018/04/cute-profile-pics-for-whatsapp-images.png" fluid></b-img>
                <b-img src="http://www.bistiproofpage.com/wp-content/uploads/2018/04/cute-profile-pics-for-whatsapp-images.png" fluid class="mt-1"></b-img>
            </b-col>
          </b-row>
        </b-nav-item>
    </b-navbar-nav>

    <b-nav-item @click="logout" class="d-absolute r0 mr-md-4 d-xs-none desktop-only white" v-if="getAuth" right>Logout</b-nav-item>      

  </b-collapse>

  
</b-navbar>

</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push({path: '/'})
      })
    }
  },
  computed: {
    getAuth: function() {
      return this.$store.getters.getUserAuthStatus;
    }
  }
  
  
}
</script>

<style>

li a {
  color: white;
}

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

#ads .img-fluid {
    max-width: 75%;
  }

@media(max-width: 575px) {
  .navbar-collapse {
    background-color: rgba(2,36,95,.1);
    padding: 1em;
  }

 #ads .img-fluid {
    max-width: 60%;
  }

}

@media(max-width: 500px) {
  .navbar-collapse {
    background-color: rgba(2,36,95,.1);
    padding: 1em;
  }

 #ads .img-fluid {
    max-width: 75%;
  }

}

@media(max-width: 350px) {
  #ads .img-fluid {
    max-width: 100%;
  }

}

</style>

