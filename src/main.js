import { createApp } from 'vue'
import { clerkPlugin } from '@clerk/vue'
import App from './App.vue'
import router from './router'

// Clerk publishable key does not need to be kept secret
const PUBLISHABLE_KEY = 'pk_test_dGVuZGVyLXdhc3AtODAuY2xlcmsuYWNjb3VudHMuZGV2JA'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)
app.use(clerkPlugin, { publishableKey: PUBLISHABLE_KEY })
app.use(vuetify)
app.use(router)

app.mount('#app')
