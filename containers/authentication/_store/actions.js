import { firebase } from '~/plugins/firebase'
import api from '../_api'

const signUpOrganization = async (context, account) => {
  try {
    const signUpResponse = await api.signUp(account)
    const newDatabaseUser = {
      id: signUpResponse.user.uid,
      email: account.email,
      role: 'manager',
      organization: account.organization,
    }
    const organization = api.createOrganization(account.organization)
    const newUser = api.createUser(newDatabaseUser)
    context.commit('SET_USER', signUpResponse.user)
    context.commit('SET_IS_AUTHENTICATED', true)
    await organization
    await newUser
  } catch (error) {
    console.log('Error signup user: ', error)
    if (error.code !== 'auth/email-already-in-use') {
      const res = await firebase.auth().currentUser.delete()
    }
    context.commit('SET_USER', null)
    context.commit('SET_IS_AUTHENTICATED', false)
  }
}

const signUpEmployee = context => {
  api.signUp
    .then(response => {
      console.log(response)
      //   commit('SET_USER', user);
      //   commit('SET_IS_AUTHENTICATED', true);
    })
    .catch(error => {
      console.error(error)
      //   commit('SET_USER', null);
      //   commit('SET_IS_AUTHENTICATED', false);
    })
}
const signIn = async (context, account) => {
  try {
    const signInResponse = await api.signIn(account)
    context.commit('SET_USER', signInResponse.user)
    context.commit('SET_IS_AUTHENTICATED', true)
  } catch (error) {
    console.error(error)
    context.commit('SET_USER', null)
    context.commit('SET_IS_AUTHENTICATED', false)
  }
}
const signOut = context => {
  api.signUp
    .then(response => {
      console.log(response)
      //   commit('SET_USER', user);
      //   commit('SET_IS_AUTHENTICATED', true);
      //   router.push('/');
    })
    .catch(error => {
      console.error(error)
      //   commit('SET_USER', null);
      //   commit('SET_IS_AUTHENTICATED', false);
    })
}

export default {
  signUpOrganization,
  signUpEmployee,
  signIn,
  signOut,
}
