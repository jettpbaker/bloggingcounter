<script setup>
import { useUser } from '@clerk/vue'
import { useQuery } from '@tanstack/vue-query'

const { isSignedIn, user, isLoaded } = useUser()

const { isPending, isError, data, error } = useQuery({
  queryKey: ['posts'],
  queryFn: async () => {
    const response = await fetch('/api/posts')
    const data = await response.json()
    return data
  },
})
</script>

<template>
  <main>
    <div v-if="!isLoaded">Loading User...</div>

    <div v-else-if="isSignedIn">
      <h1>Hello {{ user?.fullName }}</h1>

      <div style="margin-top: 20px">
        <h2>Home</h2>

        <div v-if="isPending">Loading Posts...</div>
        <div v-else-if="isError">Error: {{ error.message }}</div>

        <ul v-else>
          <li v-for="post in data" :key="post.id">
            <h3>{{ post.title }}</h3>
            <p>{{ post.content }}</p>
          </li>
        </ul>
      </div>
    </div>

    <div v-else>
      <h1>Please sign in</h1>
    </div>
  </main>
</template>
