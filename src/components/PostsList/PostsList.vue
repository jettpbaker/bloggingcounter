<script setup>
import { useQuery } from '@tanstack/vue-query'
import PostCard from '@/components/PostCard/PostCard.vue'

const { isPending, isError, data, error } = useQuery({
  queryKey: ['posts'],
  queryFn: async () => {
    const response = await fetch('/api/posts')
    const data = await response.json()
    console.log(data)
    return data
  },
})
</script>

<template>
  <div>
    <h2>Home</h2>

    <div v-if="isPending">Loading Posts...</div>
    <div v-else-if="isError">Error: {{ error.message }}</div>

    <ul v-else>
      <li v-for="post in data" :key="post.id">
        <PostCard :post="post" />
      </li>
    </ul>
  </div>
</template>
