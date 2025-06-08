<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <v-card hover link>
    <RouterLink :to="`/post/${post.id}`" class="text-decoration-none">
      <v-card-title class="font-weight-bold text-white">{{ post.title }}</v-card-title>
      <v-card-subtitle class="font-weight-bold text-green-lighten-1">{{ post.authorFullName }}</v-card-subtitle>
      <v-card-text class="text-grey-lighten-1">{{ post.description }}</v-card-text>
      <v-card-subtitle opacity="1" class="font-weight-bold mb-4 text-white">{{
        formatDate(post.updatedAt)
      }}</v-card-subtitle>
    </RouterLink>
  </v-card>
</template>
