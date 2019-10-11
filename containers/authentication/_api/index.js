import { firebase, db } from '~/plugins/firebase'

const signUp = account =>
  firebase
    .auth()
    .createUserWithEmailAndPassword(account.email, account.password)

const signIn = account =>
  firebase.auth().signInWithEmailAndPassword(account.email, account.password)

const signOut = () => firebase.auth().signOut()

const getOrganization = organization =>
  firebase
    .firestore()
    .collection('organizations')
    .doc(organization.toUpperCase())
    .get()

const getEmail = (email, organization) =>
  db
    .collection('users')
    .where('email', '==', email)
    .where('organization', '==', organization.toUpperCase())
    .get()

const createOrganization = organization =>
  firebase
    .firestore()
    .collection('organizations')
    .doc(organization.name.toUpperCase())
    .set({ joined: organization.joinDate })

const createUser = user =>
  firebase
    .firestore()
    .collection('users')
    .doc(user.id)
    .set({
      email: user.email,
      role: user.role,
      organization: user.organization.name.toUpperCase(),
    })

export default {
  signUp,
  signIn,
  signOut,
  getOrganization,
  getEmail,
  createOrganization,
  createUser,
}
