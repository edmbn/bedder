<template>
  <div class="header">
    <nuxt-link to="/dashboard" tag="div" active-class="active-route" class="header-link">
      <img src="@/assets/icons/desktop.svg" alt>
      <span>Tablero</span>
    </nuxt-link>
    <nuxt-link to="/library" tag="div" active-class="active-route" class="header-link">
      <img src="@/assets/icons/device.svg" alt>
      <span>Libreria</span>
    </nuxt-link>
    <nuxt-link to="/request" tag="div" active-class="active-route" class="header-link">
      <img src="@/assets/icons/wallet.svg" alt>
      <span>Solicitudes</span>
    </nuxt-link>
    <nuxt-link to="/assistance" tag="div" active-class="active-route" class="header-link">
      <img src="@/assets/icons/settings.svg" alt>
      <span>Asistencia</span>
    </nuxt-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeRoute: this.$route.name,
    }
  },
}
</script>
<style >
.header {
  height: 100px;
  width: 100%;
  background: var(--color-secondary);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

a {
  height: 100%;
  text-decoration: none;
}

.header-link {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  cursor: pointer;
}

.header-link img {
  width: 40px;
}

.header-link img path {
  fill: var(--color-light);
}

.header-link span {
  color: var(--color-light);
}

.active-route span {
  color: var(--color-primary);
}
</style>
