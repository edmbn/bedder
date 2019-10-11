<template>
  <div class="flex flex-col justify-center items-center">
    <h1 class="text-secondary mb-5 text-center">Crear una cuenta</h1>
    <form
      id="authForm"
      ref="formSignUp"
      @submit.prevent="signup"
      class="bg-white w-full flex flex-col border-solid border-2 border-tertiary rounded-lg shadow-lg"
    >
      <div
        id="organizationBox"
        class="input-box"
        :class="{'invalid': $v.account.organization.$dirty && $v.account.organization.$error}"
        :style="{'border': organizationValidated ? '' : 'none'}"
      >
        <input
          id="organizationInput"
          type="text"
          placeholder="Nombre de la organización"
          v-model.trim="account.organization"
          class="auth-input"
          @input="resetOrganization"
          @focus="focusedInput = 'organization'"
          @blur="focusedInput = ''"
        >
        <label
          class="error-label"
          for="organizationInput"
          v-if="$v.account.organization.$error && focusedInput !== 'organization'"
        >El nombre de organización no está disponible</label>
        <button
          id="verifyButton"
          class="cursor-pointer absolute bg-tertiary w-6 h-6"
          v-if="!$v.account.organization.valid || !$v.account.organization.$dirty"
          @click.prevent="validateOrganization"
        ></button>
      </div>
      <transition-group tag="div" name="fade" class="flex flex-col">
        <div
          key="emailInput"
          class="input-box"
          :class="{'invalid': $v.account.email.$dirty && $v.account.email.$error}"
          v-if="organizationValidated"
        >
          <input
            id="emailInput"
            type="email"
            placeholder="Email"
            v-model="account.email"
            class="auth-input"
            @blur="$v.account.email.$touch(); focusedInput = ''"
            @focus="focusedInput = 'email'"
          >
          <label
            v-if="!$v.account.email.email && focusedInput !== 'email' && $v.account.email.$dirty"
            for="emailInput"
            class="error-label"
          >Por favor introduce un email válido</label>
          <label
            v-if="!$v.account.email.required && focusedInput !== 'email' && $v.account.email.$dirty"
            for="emailInput"
            class="error-label"
          >El campo de email es obligatorio</label>
        </div>
        <div
          key="passwordInput"
          v-if="organizationValidated"
          class="input-box"
          :class="{'invalid': $v.account.password.$dirty && $v.account.password.$error}"
        >
          <input
            id="passwordInput"
            type="password"
            placeholder="Contraseña"
            v-model="account.password"
            class="auth-input"
            @blur="$v.account.password.$touch(); focusedInput = ''"
            @focus="focusedInput = 'password'"
          >
          <label
            v-if="!$v.account.password.minLength && focusedInput !== 'password' && $v.account.password.$dirty"
            for="passwordInput"
            class="error-label"
          >La contraseña debe tener un minimo de 6 carácteres</label>
          <label
            v-if="!$v.account.password.required && focusedInput !== 'password' && $v.account.password.$dirty"
            for="passwordInput"
            class="error-label"
          >El campo de contraseña es obligatorio</label>
        </div>
        <div
          key="confirmPasswordInput"
          style="border-bottom: 0"
          class="input-box rounded-b"
          :class="{'invalid': $v.account.confirmPassword.$dirty && $v.account.confirmPassword.$error}"
          v-if="organizationValidated"
        >
          <input
            id="confirmPasswordInput"
            type="password"
            placeholder="Repetir la contaseña"
            v-model="account.confirmPassword"
            class="auth-input"
            @input="$v.account.confirmPassword.$touch()"
            @focus="focusedInput = 'confirmPassword'"
          >
          <label
            v-if="$v.account.confirmPassword.$error && $v.account.confirmPassword.$dirty "
            for="confirmPasswordInput"
            class="error-label"
          >Las contraseñas introducidas són diferentes</label>
        </div>
      </transition-group>
      <transition name="fade">
        <button
          type="submit"
          v-if="!$v.$invalid"
          class="border-grey outline-none h-8 bg-tertiary rounded-b text-white"
        >Crear cuenta</button>
      </transition>
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
        confirmPassword: '',
      },
      isValidOrganization: false,
      focusedInput: '',
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
    organizationValidated() {
      return (
        !this.$v.account.organization.$error &&
        this.$v.account.organization.$dirty &&
        this.$v.account.organization.required
      )
    },
  },
  watch: {
    isAuthenticated(newVal, oldVal) {
      newVal === true
        ? this.$router.replace({ name: 'dashboard' })
        : this.$router.replace({ name: 'home' })
    },
  },
  methods: {
    signup() {
      // Dispatch action to create new organization account
      const organization = {
        name: this.account.organization,
        joinDate: new Date(),
      }
      const account = { ...this.account, organization }
      this.$store.dispatch('$_authentication/signUpOrganization', account)
    },
    validateOrganization() {
      api
        .getOrganization(this.account.organization)
        .then(doc => {
          if (doc.exists) {
            this.isValidOrganization = false
          } else {
            this.isValidOrganization = true
          }
          this.$v.account.organization.$touch()
        })
        .catch(function(error) {
          console.log('Error getting document: ', error)
        })
    },
    resetOrganization() {
      if (this.$v.account.organization.$dirty) {
        this.$v.account.organization.$reset()
        this.isValidOrganization = false
        this.account.email = ''
        this.$v.account.email.$reset()
        this.account.password = ''
        this.$v.account.password.$reset()
        this.account.confirmPassword = ''
        this.$v.account.confirmPassword.$reset()
      }
    },
  },
}
</script>

<style lang="postcss">
#organizationBox:first-child.invalid {
  @apply rounded;
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

#verifyButton {
  mask: url('../../../assets/icons/arrow-dropright.svg') center / contain
    no-repeat;
  right: 10px;
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
