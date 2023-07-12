<script setup>
import CountryCardComponent from '../components/CountryCardComponent.vue'
</script>

<template>
  <div class="countries">
    <div class="grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-1 gap-3">
      <CountryCardComponent />
      <CountryCardComponent />
      <CountryCardComponent />
      <CountryCardComponent />
    </div>
  </div>
</template>
