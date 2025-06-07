<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <RouterLink to="/" class="text-decoration-none">
    <div class="d-flex align-center">
      <v-icon icon="mdi-crosshairs" color="green" class="mr-1" />
      <div class="text-white text-h5 font-weight-bold">blogging<span class="text-green-lighten-1">counter</span></div>
    </div>
  </RouterLink>
</template>

<style scoped></style>
