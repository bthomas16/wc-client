<template>
    <b-container>
        <span v-if="showLogin">
            <app-login @toggleAuthView="toggleAuthParent"></app-login>
        </span>
        <span v-else>
            <app-register @toggleAuthView="toggleAuthParent"></app-register>
        </span>
    </b-container>
</template>

<script>
import Register from './Register.vue';
import Login from './Login.vue';

export default {
    components: {
      appRegister: Register,
      appLogin: Login,
    },
    data () {
        return {
        showLogin: false
        }
    },
    methods: {
        toggleAuthParent: function() {
            return this.showLogin = !this.showLogin
        }
    }
}
</script>

<!-- b-form-1.vue -->

