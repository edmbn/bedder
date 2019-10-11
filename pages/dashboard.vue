<template>
  <div class="dashboard">
    <h1 class="text-tertiary text-center py-10">Mis dispositivos</h1>

    <catalog-container :devicesAvailability="'unavailable'" :owner="'Javier Fernández'"></catalog-container>
  </div>
</template>

<script>
import CatalogContainer from '@/containers/catalog'

export default {
  data() {
    return {}
  },
  components: {
    CatalogContainer,
  },
  methods: {},
}
</script>

<style>
</style>
