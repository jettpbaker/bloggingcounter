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
    <v-card-title class="font-weight-bold">{{ post.title }}</v-card-title>
    <v-card-subtitle class="font-weight-bold text-green-lighten-1">{{ post.authorFullName }}</v-card-subtitle>
    <v-card-text>{{ post.description }}</v-card-text>
    <v-card-subtitle opacity="1" class="font-weight-bold mb-4">{{ formatDate(post.updatedAt) }}</v-card-subtitle>
  </v-card>
</template>
