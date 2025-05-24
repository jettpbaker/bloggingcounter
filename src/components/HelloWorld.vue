<script setup>
import { onMounted, ref } from 'vue'

const data = ref(null)
const loading = ref(true)
const error = ref(null)
const user = ref(null)
const authLoading = ref(false)

onMounted(async () => {
  try {
    const response = await fetch('/api/ping')
    data.value = await response.json()
  } catch (err) {
    error.value = err
    console.error(error.value)
  } finally {
    loading.value = false
  }

  // Check auth status on component mount
  await checkAuthStatus()
})

const login = () => {
  // Redirect to the authorize endpoint which will initiate the OAuth flow
  window.location.href = '/auth/authorize'
}

async function checkAuthStatus() {
  authLoading.value = true
  try {
    const res = await fetch('/auth', {
      credentials: 'include', // Include cookies
      headers: {
        Accept: 'application/json',
      },
    })

    if (res.status === 200) {
      const userData = await res.json()
      user.value = userData
      console.log('Logged in as', userData)
    } else if (res.status === 401) {
      // Not authenticated
      user.value = null
      console.log('Not logged in - authentication required')
    } else if (res.status === 302) {
      // Redirect response means not authenticated (fallback)
      user.value = null
      console.log('Not logged in - redirect response received')
    } else {
      // Other status codes
      user.value = null
      console.log('Auth check failed with status:', res.status)
    }
  } catch (err) {
    console.error('Auth check error:', err)
    user.value = null
  } finally {
    authLoading.value = false
  }
}

const logout = async () => {
  try {
    // Clear cookies by setting them to expire
    document.cookie = 'access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    document.cookie = 'refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'

    user.value = null
    console.log('Logged out')
  } catch (err) {
    console.error('Logout error:', err)
  }
}
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

  <div>
    <h2>Authentication</h2>

    <div v-if="authLoading">
      <p>Checking authentication status...</p>
    </div>

    <div v-else-if="user">
      <p>✅ Logged in!</p>
      <div><strong>User ID:</strong> {{ user.properties?.id }}</div>
      <div style="margin-top: 1rem">
        <button
          @click="logout"
          style="
            background: #dc3545;
            color: white;
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          "
        >
          Logout
        </button>
        <button
          @click="checkAuthStatus"
          style="
            margin-left: 0.5rem;
            padding: 0.5rem 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            cursor: pointer;
          "
        >
          Refresh Auth Status
        </button>
      </div>
    </div>

    <div v-else>
      <p>❌ Not logged in</p>
      <div style="margin-top: 1rem">
        <button
          @click="login"
          style="
            background: #007bff;
            color: white;
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          "
        >
          Login with Google
        </button>
        <button
          @click="checkAuthStatus"
          style="
            margin-left: 0.5rem;
            padding: 0.5rem 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            cursor: pointer;
          "
        >
          Check Auth Status
        </button>
      </div>
    </div>
  </div>
</template>
