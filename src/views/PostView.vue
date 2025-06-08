<script setup>
import { useRoute } from 'vue-router'

import usePost from '@/composables/usePost'
import PostHeader from '@/components/PostHeader/PostHeader.vue'
import RenderMarkdown from '@/components/RenderMarkdown/RenderMarkdown.vue'

const markdown = `# This is a Markdown Post

This is a paragraph

## This is a subheading

This is a list:

- Item 1
- Item 2
- Item 3
`

import { VueMarkdownIt } from '@f3ve/vue-markdown-it'

const route = useRoute()
const postId = Number(route.params.id)

const { isPending, isError, data, error } = usePost(postId)

// Configure markdown-it options for proper rendering
const markdownOptions = {
  html: true, // Enable HTML tags in source
  breaks: true, // Convert '\n' in paragraphs into <br>
  linkify: true, // Autoconvert URL-like text to links
  typographer: true, // Enable some language-neutral replacement + quotes beautification
}
</script>

<template>
  <v-container align="center" class="w-50">
    <PostHeader :post="data" />

    <v-divider></v-divider>

    <!-- <v-col> -->
    <!-- <RenderMarkdown :markdown="data.content" /> -->
    <!-- </v-col> -->
  </v-container>

  <VueMarkdownIt :source="markdown" :options="markdownOptions" />
</template>
