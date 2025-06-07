<script setup>
import { ref } from 'vue'
import { useUser } from '@clerk/vue'

const { isSignedIn, user, isLoaded } = useUser()

const data = ref(null)

const apiTest = async () => {
  const routes = [
    { method: 'GET', url: '/api/posts' },
    { method: 'GET', url: '/api/posts/1' },
    { method: 'POST', url: '/api/posts' },
    { method: 'DELETE', url: '/api/posts/1' },
    { method: 'PUT', url: '/api/posts/1' },
    { method: 'PATCH', url: '/api/posts/1' },
    { method: 'POST', url: '/api/posts/description' },
  ]
  const results = await Promise.all(
    routes.map(async ({ method, url }) => {
      const res = await fetch(url, { method })
      const body = await res.json()
      return { method, url, status: res.status, body }
    })
  )
  console.log('API Test Results:', results)
}

const deletePost = async () => {
  const response = await fetch('/api/posts/1', {
    method: 'DELETE',
  })
  const json = await response.json()
  console.log(json)
}

const DBTest = async () => {
  const response = await fetch('/api/posts')
  const json = await response.json()
  console.log(json)
}
</script>

<template>
  <main>
    <div v-if="!isLoaded">Loading...</div>

    <div v-else-if="isSignedIn">
      <h1>Hello {{ user?.fullName }}</h1>

      <div style="margin-top: 20px">
        <h2>Blog Management</h2>
        <!-- <button @click="addDummyPost">Add Dummy Post</button>
				<button @click="queryAllPosts">Query All Posts</button> -->
        <button @click="apiTest">API Test</button>
        <button @click="deletePost">Delete Post</button>
        <button @click="DBTest">DB Test</button>
      </div>

      <p>Check the browser console (F12) to see the API responses</p>
    </div>

    <div v-else>
      <h1>Please sign in</h1>
      <button @click="deletePost">Delete Post</button>
    </div>
  </main>
</template>
