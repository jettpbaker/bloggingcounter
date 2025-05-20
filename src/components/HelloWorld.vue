<script setup>
import { onMounted, ref } from 'vue'

const data = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await fetch('/api/ping')
    data.value = await response.json()
    console.log(data)
  } catch (err) {
    error.value = err
    console.error(error.value)
  } finally {
    loading.value = false
  }
})
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
</template>
