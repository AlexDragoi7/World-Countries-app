<script setup>
import CountryCardComponent from '../components/CountryCardComponent.vue'
import { computed, onMounted } from 'vue'
import { useCountriesStore } from '../stores/countries'

import { useRoute } from 'vue-router'

const store = useCountriesStore()
const route = useRoute()
const continentId = route.query.id

const countries = computed(() => {
  return store.countries
})

onMounted(() => {
  store.$reset()
  store.fetchCountriesByContinent(continentId)
})
</script>

<template>
  <div class="countries" v-if="countries && countries.length !== 0">
    <div
      class="grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-1 gap-2"
      v-for="country in countries"
      :key="country.id"
    >
      <CountryCardComponent :name="country.country_name" :region="country.region" />
    </div>
  </div>
  <div v-else class="empty-state mx-4 grid justify-center">
    <img src="../assets/EmptyState.png" class="justify-self-center" />
    <p class="text-center font-medium text-gray-600">No countries found.</p>
    <p class="text-center font-light text-gray-500">There are no countries to display here yet.</p>
  </div>
</template>
