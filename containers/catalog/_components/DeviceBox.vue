<template>
  <div
    class="list-none w-3/4 h-24 max-w-2xl shadow-lg mb-2 bg-primary cursor-pointer flex justify-between rounded-lg"
    @click="select()"
  >
    <div class="w-1/4 flex justify-center items-center">
      <img
        :src="require(`@/assets/icons/devices/${device.thumbnail}`)"
        alt
        class="w-3/4 max-w-65 rounded-lg"
      >
    </div>
    <div class="h-full w-full flex flex-col justify-around text-left text-tertiary_tint p-2">
      <div>
        <b>Modelo:&nbsp;</b>
        <span>{{device.model}}</span>
      </div>
      <div>
        <b>Dispositivo:&nbsp;</b>
        <span>{{device.type}}</span>
      </div>
      <span v-if="device.deliveryDate" class="bg-warning w-fit py-1 px-3">{{device.deliveryDate}}</span>
    </div>
    <img class="w-6" src="@/assets/icons/arrow-forward.svg" alt>
  </div>
</template>
<script>
export default {
  props: {
    device: Object,
  },
  methods: {
    select() {
      this.$emit('deviceSelected', this.device)
    },
  },
}
</script>

<style >
</style>
