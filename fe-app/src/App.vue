<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()
console.log(route)
const currentRoute = computed(() => {
  return route.name
})

const continentName = computed(() => {
  return route.params.continent
})
console.log(currentRoute)

const capitalizeFirstLetter = (string) => {
  const stringWithoutDash = string?.replace('-', ' ')
  const array = stringWithoutDash?.split(' ')

  for (var i = 0; i < array?.length; i++) {
    array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1)
  }
  const finalString = array?.join(' ')
  return finalString
}
</script>

<template>
  <header>
    <div v-if="route.name.includes('continents')" class="wrapper p-8">
      <nav class="flex justify-start">
        <RouterLink
          active-class="border-b border-b-2 border-b-blue-400"
          class="mr-4 px-6 py-2 text-gray-600 font-light"
          to="/"
          >Continents
        </RouterLink>
        <p
          v-if="route.name !== 'continents'"
          class="px-6 py-2 text-gray-600 border-b border-b-2 border-b-blue-400 font-light"
        >
          {{ capitalizeFirstLetter(continentName) }}
        </p>
      </nav>
    </div>
  </header>

  <RouterView class="p-8" />
</template>

<style scoped></style>
