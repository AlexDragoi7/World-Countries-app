<script>
export default {
  props: ['name', 'region', 'flag']
}
import { ref } from 'vue'
const drawer = ref(false)
</script>

<template>
  <div
    class="w-full lg:h-60 sm:h-72 mx-4 my-4 bg-white hover:bg-gray-100 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 rounded-xl shadow overflow-hidden"
    @click="drawer = true"
  >
    <div>
      <div class="md:shrink-0">
        <img class="h-48 w-full object-fill sm:h-32" :src="flag" alt="Country flag" />
      </div>
      <div class="p-8">
        <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          {{ region }}
        </div>
        <a
          href="#"
          class="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
          >{{ name }}</a
        >
      </div>
    </div>
    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
      <span>Hi there!</span>
    </el-drawer>
  </div>
</template>
