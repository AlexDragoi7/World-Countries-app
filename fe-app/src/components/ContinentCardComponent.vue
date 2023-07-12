<script>
export default {
  props: ['name']
}
</script>
<template>
  <div
    class="w-auto flex justify-center items-center h-48 p-4 mx-auto my-4 bg-white rounded-xl shadow overflow-hidden hover:border hover:border-blue-600 hover:cursor-pointer bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500"
  >
    <p class="font-medium text-center text-xl text-white uppercase">
      {{ name }}
    </p>
  </div>
</template>
