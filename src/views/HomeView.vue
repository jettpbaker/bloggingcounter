<script setup>
import { useUser } from '@clerk/vue';

const { isSignedIn, user, isLoaded } = useUser();
</script>

<template>
	<main>
		<div v-if="!isLoaded">Loading...</div>

		<div v-else-if="isSignedIn">
			<h1>Hello {{ user?.fullName }}</h1>
		</div>

		<div v-else>
			<h1>Please sign in</h1>
		</div>
	</main>
</template>
