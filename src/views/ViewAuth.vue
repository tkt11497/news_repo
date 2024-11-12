<template>
  <div class="auth">
    <div class="tabs is-centered">
      <ul>
        <li :class="{ 'is-active': !register }">
            <a @click.prevent="register = false">Login</a>
        </li>
        <li :class="{ 'is-active': register }">
            <a @click.prevent="register = true">Register</a>
        </li>
      </ul>
    </div>
    <div class="card auth-form">
      <div class="card-content">
        <div class="title has-text-centered">
            {{ register ? 'Register' : 'Login' }}
        </div>
        <form @submit.prevent="handleSubmit">
            <div class="field">
                <label class="label">Email</label>
            <div class="control">
                <input class="input" type="email" v-model="form.email" placeholder="e.g. alexsmith@gmail.com">
                </div>
            </div>
            <div class="field">
                <label class="label">Password</label>
            <div class="control">
                <input class="input" type="password" v-model="form.password" placeholder="Enter your password">
                </div>
            </div>
            <div class="field is-grouped">
                <p class="control">
                <button class="button is-primary">
                    {{ register ? 'Register' : 'Login' }}
                </button>
                </p>
            </div>
        </form>

      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
const register = ref(false)
const form = reactive({
    email: '',
    password: ''
})
const handleSubmit = () => {
    if(!form.email || !form.password) {
        alert('Please enter email and password')
        return
    }else {
        if(register.value) {
            console.log('register')
        }else {
            console.log('login')
        }
    }
}
</script>
<style scoped>
.auth-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
