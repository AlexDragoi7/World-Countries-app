<script setup>
import CountryCardComponent from '../components/CountryCardComponent.vue'

const country1 = {
  continent: 'Europe',
  name: 'Romania'
}
</script>

<template>
  <div class="countries">
    <div class="grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-1 gap-3">
      <CountryCardComponent :name="country1.name" :continent="country1.continent" />
      <CountryCardComponent :name="country1.name" :continent="country1.continent" />
      <CountryCardComponent :name="country1.name" :continent="country1.continent" />
      <CountryCardComponent :name="country1.name" :continent="country1.continent" />
    </div>
  </div>
</template>
