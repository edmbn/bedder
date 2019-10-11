<template>
  <div class="flex flex-col justify-center items-center">
    <h1 class="text-secondary mb-5 text-center">Acceder a tu cuenta</h1>
    <form
      ref="formSignIn"
      @submit.prevent="signin"
      class="bg-white w-full flex flex-col border-solid border-2 border-tertiary rounded-lg shadow-lg"
    >
      <div
        :class="['input-box',{'invalid': $v.account.organization.$dirty && $v.account.organization.$error}]"
        :style="{'border': $v.account.organization.valid ? '' : 'none'}"
      >
        <input
          id="organizationInput"
          ref="organizationInput"
          type="text"
          class="auth-input"
          placeholder="Nombre de tu organización"
          v-model.trim="account.organization"
          @input="resetForm('organization')"
          @focus="focusedInput = 'organization'"
          @blur="focusedInput = ''"
        >
        <label
          class="error-label"
          for="organizationInput"
          v-if="$v.account.organization.$error && focusedInput !== 'organization'"
        >La organización no existe</label>
        <button
          id="verifyButton"
          v-if="!$v.account.organization.valid || !$v.account.organization.$dirty"
          class="cursor-pointer absolute bg-tertiary w-6 h-6"
          :disabled="!account.organization"
          @click.prevent="validateInput('organization')"
        ></button>
      </div>
      <transition-group name="fade">
        <div
          key="email"
          v-if="$v.account.organization.valid"
          :class="['input-box', {'invalid': $v.account.email.$error}]"
          :style="{'border': $v.account.email.valid ? '' : 'none'}"
        >
          <input
            id="emailInput"
            type="email"
            class="auth-input"
            placeholder="Email"
            v-model="account.email"
            @input="resetForm('email')"
            @focus="focusedInput = 'email'"
            @blur="focusedInput = ''"
          >
          <label
            class="error-label"
            v-if="!$v.account.email.email && $v.account.email.$dirty & focusedInput !== 'email'"
            for="emailInput"
          >Por favor introduce un email válido</label>
          <label
            class="error-label"
            for="emailInput"
            v-if="!$v.account.email.valid && $v.account.email.email && $v.account.email.$dirty && focusedInput !== 'email'"
          >El email introducido no existe</label>
          <button
            id="verifyButton"
            v-if="!$v.account.email.valid || !$v.account.organization.$dirty"
            class="cursor-pointer absolute bg-tertiary w-6 h-6"
            :disabled="!account.email"
            @click.prevent="validateInput('email')"
          ></button>
        </div>
        <div
          key="password"
          v-if="$v.account.email.valid && !$v.account.email.$error"
          class="input-box"
        >
          <input
            id="passwordInput"
            type="password"
            class="auth-input"
            placeholder="Contraseña"
            v-model="account.password"
          >
        </div>
        <button
          key="submit"
          v-if="account.password"
          type="submit"
          :disabled="!account.password"
          class="border-grey w-full outline-none h-8 bg-tertiary rounded-b text-white"
        >Entrar</button>
      </transition-group>
    </form>
  </div>
</template>

<script>
import api from '../_api'
import { mapGetters } from 'vuex'
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      account: {
        organization: '',
        email: '',
        password: '',
      },
      isValidOrganization: false,
      isValidEmail: false,
      focusedInput: 'organization',
      verified: [],
    }
  },
  validations() {
    return {
      account: {
        organization: {
          required,
          valid: value => {
            return this.isValidOrganization
          },
        },
        email: {
          required,
          email,
          valid: value => {
            return this.isValidEmail
          },
        },
        password: {
          required,
          minLength: minLength(6),
        },
        confirmPassword: {
          required,
          sameAs: sameAs('password'),
        },
      },
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: '$_authentication/isAuthenticated',
    }),
  },
  watch: {
    isAuthenticated(newVal, oldVal) {
      newVal === true
        ? this.$router.replace({ name: 'dashboard' })
        : this.$router.replace({ name: 'home' })
    },
  },
  methods: {
    signin() {
      const account = {
        email: this.account.email,
        password: this.account.password,
      }
      this.$store.dispatch('$_authentication/signIn', account, {
        preserveState: false,
      })
    },
    validateInput(input) {
      switch (input) {
        case 'organization':
          this.validateOrganization()
          break
        case 'email':
          this.validateEmail()
          break
          // this.$v.account.email.$touch()
          break
        default:
          console.log('Default')
      }
    },
    validateOrganization() {
      api
        .getOrganization(this.account.organization)
        .then(doc => {
          if (doc.exists) {
            this.isValidOrganization = true
          } else {
            this.isValidOrganization = false
          }
          this.$v.account.organization.$touch()
        })
        .catch(function(error) {
          console.log('Error getting document: ', error)
        })
    },
    validateEmail() {
      api
        .getEmail(this.account.email, this.account.organization)
        .then(querySnapshot => {
          if (querySnapshot.docs.length) {
            this.isValidEmail = true
          } else {
            this.isValidEmail = false
          }
          this.$v.account.email.$touch()
        })
        .catch(function(error) {
          console.log('Error getting email: ', error)
        })
    },
    resetForm(input) {
      switch (input) {
        case 'organization':
          this.$v.account.organization.$reset()
          this.isValidOrganization = false
          this.isValidEmail = false
          this.account.email = ''
          this.$v.account.email.$reset()
          this.account.password = ''
          this.$v.account.password.$reset()
          break
        case 'email':
          this.$v.account.email.$reset()
          this.isValidEmail = false
          this.account.password = ''
          this.$v.account.password.$reset()
          break
        default:
          console.log('Default')
      }
    },
  },
}
</script>

<style lang="postcss">
#organizationBox:first-child.invalid {
  @apply rounded;
}

#verifyButton {
  mask: url('../../../assets/icons/arrow-dropright.svg') center / contain
    no-repeat;
  right: 10px;
}

.auth-input {
  @apply w-full border-0 border-grey outline-none mr-10 ml-5 h-8 bg-transparent;
}

.input-box {
  @apply relative flex items-center border-b;
}

.error-label {
  @apply cursor-auto absolute text-white float-right;
  right: 2.5rem;
}

input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px white inset;
  /* -webkit-transition-delay: 99999s; */
  -webkit-text-fill-color: black;
}

.invalid input:-webkit-autofill,
.invalid {
  -webkit-box-shadow: 0 0 0px 1000px #ffa2a2 inset;
  -webkit-text-fill-color: white;
}

.invalid input:-webkit-autofill,
.invalid input::placeholder {
  @apply text-white;
  color: white !important;
  -webkit-text-fill-color: white;
}

.fade-enter-active {
  max-height: 200px;
  transition: max-height 0.5s linear, opacity 0.6s;
}
.fade-leave-active {
  max-height: 200px;
  transition: max-height 0.3s linear, opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  max-height: 0px;
}
</style>
