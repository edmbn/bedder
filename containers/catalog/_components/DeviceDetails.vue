<template>
  <div
    class="w-3/4 h-fit border-solid border-2 border-tertiary rounded-lg overflow-hidden text-tertiary_tint shadow-lg leading-tight"
  >
    <header class="bg-primary flex justify-center p-2">
      <h2 class="text-center text-tertiary">Detalles del dispositivo</h2>
    </header>
    <div class="flex flex-col">
      <div v-if="device.model" class="pt-0 info-row">
        <b class="info-type">Modelo</b>
        <span class="info-data">{{device.model}}</span>
      </div>
      <div v-if="device.type" class="info-row">
        <b class="info-type">Tipo de dispositivo</b>
        <span class="info-data">{{device.type}}</span>
      </div>
      <div v-if="device.owner" class="info-row">
        <b class="info-type">Propietario actual</b>
        <span class="info-data">{{device.owner}}</span>
      </div>
      <div v-if="device.requester" class="info-row">
        <b class="info-type">Solicitante</b>
        <span class="info-data">{{device.requester}}</span>
      </div>
      <div v-if="device.deliveryDate" class="info-row">
        <b class="info-type">Fecha de entrega</b>
        <span class="info-data">{{device.deliveryDate}}</span>
      </div>
      <div v-if="device.petitionReason" class="info-row">
        <b class="info-type">Motivo de solicitud</b>
        <span class="info-data">{{device.petitionReason}}</span>
      </div>
      <div v-if="device.status === 'available'" class="p-3 flex justify-center items-center">
        <button
          class="w-1/2 bg-primary border-none rounded p-1 left-25 relative text-tertiary font-bold shadow-lg cursor-pointer outline-none"
        >Solicitar</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    device: Object,
  },
}
</script>

<style lang="postcss">
.device-details {
  max-width: 550px;
}

.info-row {
  @apply w-full flex flex-col text-left;
}

.info-type {
  @apply w-full pl-3 py-2;
}

.info-data {
  @apply w-full pl-5 py-2 bg-light;
}
</style>
