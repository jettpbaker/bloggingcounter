<script setup>
import PostCard from '@/components/PostCard/PostCard.vue'
import usePosts from '@/composables/usePosts'

const { isPending, isError, data, error } = usePosts()
</script>

<template>
  <div>
    <h1 class="mb-4">Posts</h1>

    <div v-if="isPending">
      <v-progress-circular indeterminate :size="90" />
    </div>
    <div v-else-if="isError">Error: {{ error.message }}</div>

    <div v-else>
      <PostCard v-for="post in data" :key="post.id" :post="post" class="mb-7" />
    </div>
  </div>
</template>
