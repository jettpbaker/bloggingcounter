<script setup>
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
    <v-card-title>{{ post.title }}</v-card-title>
    <v-card-subtitle>{{ formatDate(post.updatedAt) }}</v-card-subtitle>
    <v-card-text>{{ post.description }}</v-card-text>
  </v-card>
</template>
