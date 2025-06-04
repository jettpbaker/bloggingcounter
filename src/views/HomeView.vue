<script setup>
import { ref } from 'vue'
import { useUser } from '@clerk/vue'
const { isSignedIn, user, isLoaded } = useUser()

const data = ref(null)

// Function to create a dummy post
// const addDummyPost = async () => {
// 	try {
// 		console.log('Creating dummy post...');
// 		const response = await fetch('/api/posts/seed');
// 		const json = await response.json();
// 		console.log('Dummy post created:', json);
// 	} catch (error) {
// 		console.error('Error creating dummy post:', error);
// 	}
// };

// // Function to query all posts
// const queryAllPosts = async () => {
// 	try {
// 		console.log('Querying all posts...');
// 		const response = await fetch('/api/posts');
// 		const json = await response.json();
// 		console.log('All posts:', json);
// 	} catch (error) {
// 		console.error('Error querying posts:', error);
// 	}
// };

const apiTest = async () => {
	const response = await fetch('/api/pong')
	const json = await response.json()
	data.value = json.message
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
				<p v-if="data">{{ data }}</p>
			</div>

			<p>Check the browser console (F12) to see the API responses</p>
		</div>

		<div v-else>
			<h1>Please sign in</h1>
		</div>
	</main>
</template>
