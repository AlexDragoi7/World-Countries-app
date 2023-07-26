<script>
export default {
  props: ['name']
}
</script>
<template>
  <div
    class="w-auto flex justify-center items-center h-48 p-4 my-4 mx-8 rounded-xl shadow overflow-hidden hover:border hover:cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 hover:bg-blue-600"
  >
    <p class="font-semibold text-center text-xl text-white uppercase">
      {{ name }}
    </p>
  </div>
</template>
