<script>
export default {
  props: ['name', 'continent']
}
</script>

<template>
  <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
    <div class="md:flex">
      <div class="md:shrink-0">
        <img
          class="h-48 w-full object-fill md:h-full md:w-40"
          src="https://img.freepik.com/free-vector/illustration-romania-flag_53876-27113.jpg?w=2000&t=st=1688481185~exp=1688481785~hmac=aa72e28accf9f59d48ebc91d4c1eafa6a582571ec7ef8a4d6c7c2b7ab8a6ff98"
          alt="Modern building architecture"
        />
      </div>
      <div class="p-8">
        <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          {{ continent }}
        </div>
        <a
          href="#"
          class="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
          >{{ name }}</a
        >
      </div>
    </div>
  </div>
</template>
