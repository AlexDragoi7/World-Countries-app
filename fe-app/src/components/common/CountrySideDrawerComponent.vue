<script setup>
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { useCountriesStore } from '../../stores/countries'

const props = defineProps({
  isOpen: Boolean,
  countryName: String,
  handleClose: Function
})

const store = useCountriesStore()
const country = computed(() => {
  return store.country
})

watchEffect(() => {
  if (props.countryName) {
    store.fecthCountryByName(props.countryName)
  }
})
</script>

<template>
  <el-drawer
    v-model="props.isOpen"
    title="I am the title"
    :with-header="false"
    :before-close="handleClose"
  >
    <p class="text-left text-lg font-medium text-gray-600">{{ country.country_name }}</p>
  </el-drawer>
</template>
