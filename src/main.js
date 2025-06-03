import { createApp } from 'vue';
import { clerkPlugin } from '@clerk/vue';
import App from './App.vue';
import router from './router';

// Clerk publishable key does not need to be kept secret
const PUBLISHABLE_KEY = 'pk_test_dGVuZGVyLXdhc3AtODAuY2xlcmsuYWNjb3VudHMuZGV2JA';

const app = createApp(App);
app.use(clerkPlugin, { publishableKey: PUBLISHABLE_KEY });

app.use(router);

app.mount('#app');
