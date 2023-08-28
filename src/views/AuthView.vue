<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-card class="ion-padding">
        <ion-input
            v-model="userCredentials.email"
            label="Email"
            label-placement="floating"
        />
        <ion-input
            v-model="userCredentials.password"
            label="Password"
            label-placement="floating"
        />
        <ion-input
            v-if="isRegistering"
            v-model="userCredentials.confirmPassword"
            label="Confirm Password"
            label-placement="floating"
        />
        <ion-button
            fill="clear"
            @click="isRegistering = !isRegistering"
        >
          Login / Register
        </ion-button>
        <ion-button
            class="ion-margin-bottom"
            expand="block"
            @click="authenticate"
        >
          Authenticate
        </ion-button>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { useAuthStore } from "@/store/auth.ts";
import { userStore } from "@/store/user.js";
import { useRouter } from "vue-router";
import { ref } from 'vue'

const userCredentials = ref({
  email: '',
  password: '',
  confirmPassword: ''
})

const isRegistering = ref(false)

const authStore = useAuthStore()
const store = userStore()

const router = useRouter()

console.log(123123)
console.log(887878768)
console.log(321123)

const authenticate = async () => {
  if (isRegistering.value) {
   await authStore.register(userCredentials.value)
    store.clearData()
    await router.push({name: 'Home'})
  } else {
    await authStore.login(userCredentials.value)
    await router.push({name: 'Home'})
  }
}



</script>