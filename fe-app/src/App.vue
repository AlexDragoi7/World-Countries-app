<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useAuthStore } from './stores/auth'
import router from './router'

const route = useRoute()
const authStore = useAuthStore()
const currentRoute = computed(() => {
  return route.name
})

const continentName = computed(() => {
  return route.params.name
})

const capitalizeFirstLetter = (string) => {
  const stringWithoutDash = string?.replace('-', ' ')
  const array = stringWithoutDash?.split(' ')

  for (var i = 0; i < array?.length; i++) {
    array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1)
  }
  const finalString = array?.join(' ')
  return finalString
}

function logout() {
  authStore.logout()
  router.push('/')
}
</script>

<template>
  <header>
    <div
      v-if="route?.name?.includes('continents') || route?.name?.includes('favorite')"
      class="wrapper p-8"
    >
      <nav class="nav">
        <div class="nav-left">
          <RouterLink
            active-class="border-b border-b-2 border-b-blue-400"
            class="mr-4 px-6 py-2 flex self-start"
            to="/continents"
          >
            <img class="w-8 mr-1 nav-item-icon" src="./assets/icons/globe.png" />
            <p class="text-gray-600 font-light self-center">Continents</p>
          </RouterLink>
          <div
            v-if="route.name !== 'continents' && route.name !== 'favorite-countries'"
            class="px-6 py-2 flex border-b-2 border-b-blue-400"
          >
            <img class="w-8 mr-2 nav-item-icon" src="./assets/icons/location-selected.png" />
            <p class="text-gray-600 self-center font-light">
              {{ capitalizeFirstLetter(continentName) }}
            </p>
          </div>
        </div>

        <a
          class="mr-4 px-6 py-2 text-gray-600 font-light flex self-end cursor-pointer hover:border-b-2 hover:border-b-blue-500"
          @click.prevent="logout"
          >Logout</a
        >
      </nav>
    </div>
  </header>

  <RouterView class="p-8" />
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
}

.nav-left {
  display: flex;
}

@media only screen and (max-width: 768px) {
  .nav {
    display: block;
  }

  .nav-left {
    display: block;
  }
  .nav-item-icon {
    display: none;
  }
}
</style>
