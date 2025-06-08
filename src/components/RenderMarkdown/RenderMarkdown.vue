<script setup>
import { VueMarkdownIt } from '@f3ve/vue-markdown-it'

const props = defineProps({
  markdown: {
    type: String,
    required: true,
  },
})

// Configure markdown-it options for proper rendering
const markdownOptions = {
  html: true, // Enable HTML tags in source
  breaks: true, // Convert '\n' in paragraphs into <br>
  linkify: true, // Autoconvert URL-like text to links
  typographer: true, // Enable some language-neutral replacement + quotes beautification
}
</script>

<template>
  <VueMarkdownIt :source="markdown" :options="markdownOptions" class="text-left" />
</template>
