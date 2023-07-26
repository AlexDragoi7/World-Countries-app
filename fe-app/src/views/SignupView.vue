<script setup>
import BackToLogincomponent from '../components/common/BackToLogincomponent.vue'
import { computed, ref, watchEffect } from 'vue'
import { useUsersStore } from '../stores/users'

import { useToast } from 'vue-toast-notification'

const firstName = ref('')
const lastName = ref('')
const phoneNumber = ref('')
const email = ref('')
const password = ref('')

const store = useUsersStore()

const user = computed(() => {
  return store.user
})

const toast = useToast()

async function signup() {
  await store.signup({
    first_name: firstName.value,
    last_name: lastName.value,
    email: email.value,
    password: password.value,
    phone_number: phoneNumber.value
  })
}

watchEffect(() => {
  if (user.value?.email) {
    alert('user created')
    toast.success('User successfully created', { position: 'top-right' })
  }
})
</script>
<template>
  <section class="signup flex justify-center bg-gray-50 dark:bg-gray-900">
    <div class="flex items-center px-6 py-6 lg:py-0">
      <div
        class="xl:w-96 bg-white rounded-lg shadow dark:border md:mt-0 md:w-64 xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Create your account
          </h1>
          <form class="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                for="firstName"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >First name</label
              >
              <input
                v-model="firstName"
                type="text"
                name="firstName"
                id="firstName"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                required
              />
            </div>
            <div>
              <label
                for="lastName"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Last name</label
              >
              <input
                v-model="lastName"
                type="text"
                name="lastName"
                id="lastName"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Doe"
                required
              />
            </div>
            <div>
              <label
                for="phone"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Phone number</label
              >
              <input
                v-model="phoneNumber"
                type="tel"
                id="phone"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="1234-567-890"
                pattern="[0-9]{4}-[0-9]{3}-[0-9]{3}"
                required
              />
            </div>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your email</label
              >
              <input
                v-model="email"
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</label
              >
              <input
                v-model="password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <button
              @click.prevent="signup"
              class="w-full text-white bg-blue-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Create account
            </button>
            <BackToLogincomponent />
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<style>
.signup {
  background-image: url(https://images.unsplash.com/photo-1496950866446-3253e1470e8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80);
  background-size: cover;
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);
}
</style>
