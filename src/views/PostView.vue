<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const postId = route.params.id
</script>

<template>
  <v-container>
    <h1>Post View</h1>
    <p>{{ postId }}</p>
  </v-container>
</template>
