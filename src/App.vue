<script setup>
import { RouterView } from 'vue-router';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/vue';
</script>

<template>
	<header>
		<SignedOut>
			<SignInButton />
		</SignedOut>
		<SignedIn>
			<UserButton />
		</SignedIn>
	</header>

	<RouterView />
</template>
