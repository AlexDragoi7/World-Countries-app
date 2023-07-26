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

const redirectToCountriesPage = (name, id) => {
  const countriesRoute = name.replace(' ', '-').toLowerCase()
  router.push(`/continents/${id}/${countriesRoute}`)
}
</script>
<template>
  <div class="continents" v-for="continent in continents" :key="continent._id">
    <ContinentCard
      :name="continent.continent_name"
      :onclick="() => redirectToCountriesPage(continent.continent_name, continent._id)"
    />
  </div>
  <div
    v-if="continents && continents.length === 0"
    class="continents empty-state mx-4 grid justify-center"
  >
    <img src="../assets/EmptyState.png" class="justify-self-center" />
    <p class="text-center font-medium text-gray-600">No continents found.</p>
    <p class="text-center font-light text-gray-500">There are no continents to display here yet.</p>
  </div>
</template>
