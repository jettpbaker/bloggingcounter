<script setup>
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <v-app-bar :elevation="2" app>
    <v-app-bar-title>
      <RouterLink to="/">bloggingcounter</RouterLink>
    </v-app-bar-title>

    <template v-slot:append>
      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </template>
  </v-app-bar>
</template>
