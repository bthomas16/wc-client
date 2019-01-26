<template>
    <b-container fluid>
        <b-row no-gutters>
            <b-col cols="12" class="p-0 m-0">
                <b-row no-gutters >

                    <!-- FSOT STATUS -->
                    <b-col cols="6" class="my-1">
                        <router-link :to="'/watch?' + QueryStringWatchId"><b-img src="/img/icons/share.png" fluid></b-img></router-link>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>

</template>

<script>
export default {
    name: "shareFlag",
    props: ['watchId'],
    data() {
        return {

        }
    },

    methods: {
        GenerateWatchShareQueryString(id) {
    }
  },

  computed: {
        QueryStringWatchId() {
            return "watchId=" + this.watchId 
        }
    }
}
</script>
<style scoped>
img {
    height: 1rem;
}

@media (max-width: 875px) {
    img {
        height: .75rem;
    }
}

</style>
