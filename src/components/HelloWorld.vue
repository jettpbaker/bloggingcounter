<script setup>
import { onMounted, ref } from 'vue'

const data = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await fetch('/api/ping')
    data.value = await response.json()
  } catch (err) {
    error.value = err
    console.error(error.value)
  } finally {
    loading.value = false
  }
})

const login = () => {
  window.location.href = '/auth'
}

async function checkAuthStatus() {
  const res = await fetch('/auth', { redirect: 'manual' })
  if (res.status === 200) {
    const user = await res.json()
    console.log('Logged in as', user)
  } else {
    // not logged in
    window.location.href = '/auth'
  }
}
</script>

<template>
  <h1>Pinging the server...</h1>
  <p v-if="data">
    {{ data.message }}
  </p>
  <p v-else-if="error">
    {{ error.message }}
  </p>
  <p v-else>Loading...</p>
  <div>
    <h2>Auth</h2>
    <button @click="login">Login</button>
    <button @click="checkAuthStatus">Check Auth Status</button>
  </div>
</template>
