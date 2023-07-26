<script setup>
import { computed, onMounted, watchEffect } from 'vue'
import { useCountriesStore } from '../stores/countries'
import { useUsersStore } from '../stores/users'
import { useAuthStore } from '../stores/auth'

const props = defineProps({
  isOpen: Boolean,
  countryName: String,
  handleClose: Function
})

const store = useCountriesStore()
const authStore = useAuthStore()
const userStore = useUsersStore()

const authenticatedUser = computed(() => {
  return authStore.authUser
})

const country = computed(() => {
  return store.country
})

const countryHasBeenAddedToFavorites = computed(() => {
  return checkIfCountryIsAddedToFavorites()
})

function checkIfCountryIsAddedToFavorites() {
  let addedToFavorites = authenticatedUser.value.favoriteCountries.find(
    (item) => item.country_name === country.value.country_name
  )
  if (addedToFavorites) {
    return true
  } else {
    return false
  }
}

async function addCountryToFavorite(countryId) {
  await userStore.addCountriesToFavorites(countryId)
  props.handleClose()
  authStore.getAuthenticatedUser()
}

async function removeCountryFromFavorite(countryId) {
  await userStore.removeCountryFromFavorites(countryId)
  props.handleClose()
  authStore.getAuthenticatedUser()
}

onMounted(() => {
  authStore.getAuthenticatedUser()
})

watchEffect(() => {
  if (props.countryName) {
    store.fecthCountryByName(props.countryName)
  }
})
</script>

<template>
  <el-drawer
    class="country-side-drawer"
    v-model="props.isOpen"
    :with-header="true"
    :before-close="handleClose"
    :lock-scroll="false"
  >
    <div class="border border-gray-200 rounded-lg pb-4 h-auto divide-y divide-slate-200">
      <img class="rounded-t-lg" :src="country.flag" alt="Country flag" />
      <div class="country-info-header px-2">
        <div class="self-center">
          <p class="text-left text-2xl font-medium text-gray-600 mt-4">
            {{ country.country_name }}
          </p>
          <p class="capital-tag text-left text-lg font-light mt-2 mb-4">{{ country.capital }}</p>
        </div>
        <div class="self-center">
          <button
            v-if="!countryHasBeenAddedToFavorites"
            @click="addCountryToFavorite(country._id)"
            class="inline-flex items-center px-3 py-2 mt-4 text-sm font-medium text-center text-blue-500 bg-white rounded-lg border border-blue-500 hover:border-blue-700 hover:bg-blue-50 focus:ring-2 focus:outline-none focus:ring-blue-200"
          >
            <img class="w-8" src="../assets/icons/favorite.png" alt="Add to favorite icon" />
            Add to favorites
          </button>
          <button
            v-else
            @click="removeCountryFromFavorite(country._id)"
            class="inline-flex items-center px-3 py-2 mt-4 text-sm font-medium text-center text-blue-500 bg-white rounded-lg border border-blue-500 hover:border-blue-700 hover:bg-blue-50 focus:ring-2 focus:outline-none focus:ring-blue-200"
          >
            <img class="w-8" src="../assets/icons/favorite.png" alt="Add to favorite icon" />
            Remove from favorites
          </button>
        </div>
      </div>

      <div class="px-2 mt-4 mb-4">
        <p class="text-left text-md font-light text-gray-500 mt-2">
          <b>Language: </b>{{ country.language }}
        </p>
        <p class="text-left text-md font-light text-gray-500 mt-2">
          <b>Population: </b>{{ country.population }}
        </p>
        <p class="text-left text-md font-light text-gray-500 mt-2">
          <b>Religion: </b>{{ country.religion }}
        </p>
      </div>
      <div class="px-2 mt-2">
        <div class="flex mt-4">
          <img class="w-9 mr-3" src="../assets/icons/attraction.png" alt="Attraction" />
          <p class="text-left text-xl font-medium text-gray-500 mt-2">Major cities</p>
        </div>

        <div class="city-card" v-for="city in country.majorCities">
          <p class="text-left text-md font-light text-gray-500 mt-2">
            <b>Name: </b> {{ city.city_name }}
          </p>
          <p class="text-left text-md font-light text-gray-500 mt-2">
            <b>Location: </b> {{ city.location }}
          </p>
          <p class="text-left text-md font-light text-gray-500 mt-2">
            <b>Population: </b> {{ city.population }}
          </p>
          <p class="text-left text-md font-medium text-gray-500 mt-4">
            <b>Main attractions: </b>
          </p>
          <p
            class="text-left text-md font-light text-gray-500 mt-2"
            v-for="(attraction, index) in city.main_attractions"
          >
            <b>{{ `${index + 1}. ${attraction}` }} </b>
          </p>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<style>
.country-info-header {
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.capital-tag {
  background-color: cornflowerblue;
  color: white;
  padding: 3px 23px;
  width: fit-content;
  border-radius: 16px;
}
.city-card {
  background-color: rgb(100 148 237 / 18%);
  padding: 8px;
  border-radius: 8px;
  margin-top: 16px;
  margin-bottom: 16px;
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (max-width: 768px) {
  .country-side-drawer {
    width: 100% !important;
  }
  .country-info-header {
    display: block;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .country-side-drawer {
    width: 25% !important;
  }
}
</style>
