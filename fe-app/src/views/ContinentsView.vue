<script setup>
import ContinentCard from '../components/ContinentCardComponent.vue'
import { computed, onMounted } from 'vue'
import { useContinentStore } from '../stores/continents'
import router from '../router'

const store = useContinentStore()

const continents = computed(() => {
  return store.continents
})

onMounted(() => {
  store.fetchContinents()
})

console.log(continents)

const redirectToCountriesPage = (name, id) => {
  const countriesRoute = name.replace(' ', '-').toLowerCase()
  router.push(`/${countriesRoute}?id=${id}`)
}
</script>
<template>
  <div class="continents" v-for="continent in continents" :key="continent._id">
    <ContinentCard
      :name="continent.continent_name"
      :onclick="() => redirectToCountriesPage(continent.continent_name, continent._id)"
    />
  </div>
</template>
