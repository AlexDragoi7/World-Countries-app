<script setup>
import { onMounted, computed } from 'vue'
import { useAuthStore } from '../stores/auth'

const props = defineProps({
  name: String,
  region: String,
  flag: String,
  openSideDrawer: Function
})

const authStore = useAuthStore()

const authenticatedUser = computed(() => {
  return authStore.authUser
})

onMounted(() => {
  authStore.getAuthenticatedUser()
})

const countryHasBeenAddedToFavorites = computed(() => {
  return checkIfCountryIsAddedToFavorites()
})

function checkIfCountryIsAddedToFavorites() {
  let addedToFavorites = authenticatedUser.value?.favoriteCountries?.find(
    (item) => item.country_name === props.name
  )

  if (addedToFavorites) {
    return true
  } else {
    return false
  }
}
</script>

<template>
  <div
    class="mx-4 my-4 bg-white hover:bg-gray-100 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 rounded-xl shadow overflow-hidden"
    @click="openSideDrawer(name)"
  >
    <div>
      <div class="md:shrink-0 h-60">
        <img class="w-full h-full object-fill" :src="flag" alt="Country flag" />
      </div>
      <div class="flex justify-between p-8">
        <div>
          <div class="uppercase tracking-wide text-sm text-blue-500 font-semibold">
            {{ region }}
          </div>
          <a
            href="#"
            class="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
            >{{ name }}</a
          >
        </div>
        <div>
          <img
            class="w-8"
            v-if="countryHasBeenAddedToFavorites"
            src="../assets/icons/favorite-selected.png"
            alt="Country added to Favorites"
          />
        </div>
      </div>
    </div>
  </div>
</template>
