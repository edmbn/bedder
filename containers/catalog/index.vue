<template>
  <div class="catalog">
    <div class="list-container">
      <ul class="devices-list">
        <transition-group name="reset-position" mode="out-in">
          <li
            :key="device.id"
            v-for="device in devices"
            :class="{'move-selected' : selectedDevice ? device.id === selectedDevice.id : null}"
          >
            <device-box :device="device" @deviceSelected="showDetails($event)"></device-box>
          </li>
        </transition-group>
      </ul>
    </div>
    <div class="details-contaianer">
      <transition name="slide-fade" mode="out-in">
        <device-details v-if="selectedDevice" :key="selectedDevice.model" :device="selectedDevice"></device-details>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from './_store'
import DeviceBox from './_components/DeviceBox'
import DeviceDetails from './_components/DeviceDetails'

export default {
  name: 'CatalogModule',
  data() {
    return {
      selectedDevice: null,
    }
  },
  props: {
    devicesAvailability: String,
    owner: String,
  },
  components: {
    DeviceBox,
    DeviceDetails,
  },
  computed: {
    ...mapGetters({
      devicesAvailable: '$_catalog/devicesAvailable',
      devicesUnavailable: '$_catalog/devicesUnavailable',
      devicesRequested: '$_catalog/devicesRequested',
      devicesByOwner: '$_catalog/devicesByOwner',
    }),
    devices() {
      if (this.owner) {
        return this.devicesByOwner(this.owner)
      } else if (this.devicesAvailability === 'unavailable') {
        return this.devicesUnavailable
      } else if (this.devicesAvailability === 'requested') {
        return this.devicesRequested
      }
      return this.devicesAvailable
    },
  },
  methods: {
    showDetails(device) {
      this.selectedDevice = device
    },
  },
  watch: {
    devicesAvailability() {
      this.selectedDevice = null
    },
  },
  created() {
    const STORE_KEY = '$_catalog'
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY, store, { preserveState: false })
    }
  },
  mounted() {
    this.$store.dispatch('$_catalog/getDevices')
  },
}
</script>

<style>
.catalog {
  display: flex;
}

.list-container,
.details-contaianer {
  width: 50%;
  display: flex;
  justify-content: center;
  padding: 25px;
}

.devices-content,
.devices-details {
  width: 50%;
}

.devices-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
}

.devices-list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  position: relative;
}

.devices-list li {
  transition: transform 0.35s ease, opacity 0.2s;
  display: flex;
  justify-content: center;
}

.devices-list li:last-child div.device-box {
  margin-bottom: 0px;
}

.move-selected {
  transform: translateX(50px);
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.reset-position-enter,
.reset-position-leave-to {
  opacity: 0;
}
.reset-position-leave-active {
  transform: translateX(0);
  position: absolute;
  width: 100%;
}
</style>
