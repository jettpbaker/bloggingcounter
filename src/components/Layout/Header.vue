<script setup>
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/vue'
import Logo from '../Logo/Logo.vue'
</script>

<template>
  <v-app-bar app>
    <v-app-bar-title>
      <Logo />
    </v-app-bar-title>

    <template v-slot:append>
      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
      <v-spacer class="mr-4" />
    </template>
  </v-app-bar>
</template>
