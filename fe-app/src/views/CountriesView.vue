<script setup>
import CountryCardComponent from '../components/CountryCardComponent.vue'
import { computed, onMounted, ref } from 'vue'
import { useCountriesStore } from '../stores/countries'

import { useRoute } from 'vue-router'
import CountrySideDrawerComponent from '../components/common/CountrySideDrawerComponent.vue'

const drawer = ref(false)
const selectedCountryName = ref('')

const store = useCountriesStore()
const route = useRoute()
const continentId = route.params.id

const countries = computed(() => {
  return store.countries
})

console.log(countries)

function openSideDrawer(name) {
  console.log(name)
  console.log('openSideDrawer')
  drawer.value = true
  selectedCountryName.value = name
}

function closeDrawer() {
  drawer.value = false
  selectedCountryName.value = ''
}

onMounted(() => {
  store.$reset()
  store.fetchCountriesByContinent(continentId)
})
</script>

<template>
  <div class="countries" v-if="countries && countries.length !== 0">
    <div class="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 gap-4">
      <div v-for="country in countries">
        <CountryCardComponent
          :key="country.id"
          :name="country.country_name"
          :region="country.region"
          :flag="country.flag"
          :open-side-drawer="openSideDrawer"
        />
      </div>
    </div>
  </div>
  <div v-else class="empty-state mx-4 grid justify-center">
    <img src="../assets/EmptyState.png" class="justify-self-center" />
    <p class="text-center font-medium text-gray-600">No countries found.</p>
    <p class="text-center font-light text-gray-500">There are no countries to display here yet.</p>
  </div>
  <CountrySideDrawerComponent
    :is-open="drawer"
    :country-name="selectedCountryName"
    :handle-close="closeDrawer"
  />
</template>
