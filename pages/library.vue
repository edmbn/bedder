<template>
  <div class="library">
    <h1 class="text-tertiary text-center py-10">Dispositivos de Costaisa</h1>
    <div class="flex justify-center items-center pb-10">
      <ul
        class="border-solid border-2 border-primary rounded-lg w-1/3 flex p-0 text-center cursor-pointer list-reset text-tertiary overflow-hidden"
      >
        <li
          @click="filterAvailability('available')"
          class="filter-item"
          :class="devicesAvailability === 'available' ? 'active' : ''"
        >Disponibles</li>
        <li
          @click="filterAvailability('unavailable')"
          class="filter-item border-solid border-r-2 border-l-2 border-primary"
          :class="devicesAvailability === 'unavailable' ? 'active' : ''"
        >Ocupados</li>
        <li
          @click="filterAvailability('requested')"
          class="filter-item"
          :class="devicesAvailability === 'requested' ? 'active' : ''"
        >Solicitados</li>
      </ul>
    </div>
    <catalog-container :devicesAvailability="devicesAvailability"></catalog-container>
  </div>
</template>
<script>
import CatalogContainer from '@/containers/catalog'

export default {
  data() {
    return {
      devicesAvailability: 'available',
    }
  },
  components: {
    CatalogContainer,
  },
  methods: {
    filterAvailability(availability) {
      this.devicesAvailability = availability
    },
  },
}
</script>

<style lang="postcss">
.filter-item {
  @apply relative w-1/3 bg-white p-3;
}

.active {
  @apply bg-primary text-light;
}
</style>
