<template>
  <div class="authentication">
    <component :is="authComponent"></component>
  </div>
</template>

<script>
import store from './_store'
export default {
  name: 'AuthenticationModule',
  data() {
    return {}
  },
  props: {
    type: String,
  },
  components: {
    SignUp: () => import('./_components/SignUp'),
    SignIn: () => import('./_components/SignIn'),
  },
  computed: {
    authComponent() {
      return this.type
    },
  },
  methods: {},
  created() {
    const STORE_KEY = '$_authentication'
    // eslint-disable-next-line no-underscore-dangle
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY, store, { preserveState: false })
    }
  },
  // async created() {
  //   const module = await import('./_store')
  //   const STORE_KEY = '$_authentication'
  //   // eslint-disable-next-line no-underscore-dangle
  //   if (!(STORE_KEY in this.$store._modules.root._children)) {
  //     this.$store.registerModule(STORE_KEY, module)
  //   }
  // },
}
</script>

<style >
</style>
