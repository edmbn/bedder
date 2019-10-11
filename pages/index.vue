<template>
  <div
    class="min-h-screen border-solid border-tertiary border-30 flex justify-center items-center flex-col bg-primary"
  >
    <img src="../assets/icons/dm_title.png" class="mb-20 sm:max-w-md max-w-80" alt>
    <div class="flex flex-col">
      <nuxt-link
        class="bg-tertiary text-white px-4 py-3 max-w-md rounded outline-none cursor-pointer shadow-lg mb-5"
        to="/signup"
        tag="button"
      >crear nueva cuenta</nuxt-link>
      <nuxt-link to="/signin" class="text-tertiary">¿Ya tienes una cuenta? Entrar</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style >
</style>
