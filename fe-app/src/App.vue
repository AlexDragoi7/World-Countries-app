<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper p-8">
      <nav class="flex justify-start">
        <RouterLink
          active-class="border-b border-b-2 border-b-blue-400"
          class="mr-4 px-6 py-2 text-gray-600"
          to="/"
          >Continents
        </RouterLink>
        <RouterLink
          active-class="border-b border-b-2 border-b-blue-400"
          class="px-6 py-2 text-gray-600"
          to="/countries"
          >Countries</RouterLink
        >
      </nav>
    </div>
  </header>

  <RouterView class="p-8" />
</template>

<style scoped></style>
