<template>
    <b-container fluid>
        <b-row no-gutters>
            <b-col cols="11" class="mx-auto">
                <b-alert show v-bind:variant="responseStyle" v-if="showAlert" class="p-1 my-md-0">{{responseMessage}}</b-alert>
                <b-form @submit.prevent="onSubmit">
                        <b-form-group
                        label="Email:"
                        label-for="email"
                        class="mt-md-2"
                        description="We still aren't sharing your email with anyone!">
                            <b-form-input id="email"
                                        type="email"
                                        v-model="form.email"
                                        required
                                        autocomplete="off"
                                        placeholder="Enter email">
                            </b-form-input>
                        </b-form-group>
                        <b-form-group id="exampleInputGroup2"
                                        label="Password:"
                                        label-for="password"
                                        class="mt-md-3">
                            <b-form-input id="password"
                                        type="password"
                                        v-model="form.password"
                                        required
                                        autocomplete="off"
                                        placeholder="Password">
                            </b-form-input>
                        </b-form-group>
                        <b-row align-v="center">
                            <b-col cols="4">
                                <b-button type="submit" variant="default" class="bg-navy white" :disabled="!form.email || !form.password">Submit</b-button>
                            </b-col>
                            <b-col cols="8" class="right-align">
                                <p class="h8 m-1">Not a user? <span class="link nowrap" @click="toggleAuthChild">Register Here</span></p>
                            </b-col>
                        </b-row>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      form:
            {
              email: '',
              password: ''
            },
      showAlert: false,
      responseMessage: 'Login Here!',
      responseStyle: 'light'
    }
  },
  methods: {
    onSubmit () {
      this.showAlert = false
      console.log('submitting', this.form)
      this.$store.dispatch('login', this.form).then((res) => {
        if (res.isSuccess) {
          this.$router.push({ path: '/profile' })
          this.showAlert = false
        } else {
          this.showAlert = true
          this.responseStyle = 'danger'
          this.$emit('ToggleShowingAlert', true)          
          this.responseMessage = res.message
        }
      })
    },

    toggleAuthChild () {
      this.$emit('toggleAuthView')
    }
  }
}
</script>

<style scoped>
input {
        border: none;
        border-bottom: 1px solid gray;
        outline: none;
        border-radius: 0;
    }

</style>
