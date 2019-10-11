<template>
  <div
    class="min-h-screen border-solid border-tertiary border-30 flex justify-center items-center flex-col bg-primary"
  >
    <Authentication type="signIn" class="w-96 max-w-80 md:max-w-sm"></Authentication>
  </div>
</template>

<script>
import Authentication from '../containers/authentication'

export default {
  data() {
    return {}
  },
  components: {
    Authentication,
  },
  methods: {},
}
</script>

<style>
</style>
