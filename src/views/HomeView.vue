<script setup>
import { useUser } from '@clerk/vue';

const { isSignedIn, user, isLoaded } = useUser();

// Function to create a dummy post
const addDummyPost = async () => {
	try {
		console.log('Creating dummy post...');
		const response = await fetch('/api/posts/seed');
		const json = await response.json();
		console.log('Dummy post created:', json);
	} catch (error) {
		console.error('Error creating dummy post:', error);
	}
};

// Function to query all posts
const queryAllPosts = async () => {
	try {
		console.log('Querying all posts...');
		const response = await fetch('/api/posts');
		const json = await response.json();
		console.log('All posts:', json);
	} catch (error) {
		console.error('Error querying posts:', error);
	}
};
</script>

<template>
	<main>
		<div v-if="!isLoaded">Loading...</div>

		<div v-else-if="isSignedIn">
			<h1>Hello {{ user?.fullName }}</h1>

			<div style="margin-top: 20px">
				<h2>Blog Management</h2>
				<button
					@click="addDummyPost"
					style="
						margin-right: 10px;
						padding: 10px 20px;
						background-color: #4caf50;
						color: white;
						border: none;
						border-radius: 4px;
						cursor: pointer;
					"
				>
					Add Dummy Post
				</button>
				<button
					@click="queryAllPosts"
					style="padding: 10px 20px; background-color: #2196f3; color: white; border: none; border-radius: 4px; cursor: pointer"
				>
					Query All Posts
				</button>
			</div>

			<p style="margin-top: 15px; color: #666; font-size: 14px">Check the browser console (F12) to see the API responses</p>
		</div>

		<div v-else>
			<h1>Please sign in</h1>
		</div>
	</main>
</template>
