<script setup>
import formatDate from '@/lib/formatDate'

defineProps({
  post: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <v-col>
    <h1>{{ post.title }}</h1>
    <v-col class="d-flex justify-space-between pa-0">
      <p>{{ post.authorFullName }}</p>
      <p>{{ formatDate(post.updatedAt) }}</p>
    </v-col>
  </v-col>
</template>
