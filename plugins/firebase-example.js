import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/database'

const firebaseConfig = {
  apiKey: 'your-apiKey',
  authDomain: 'your-authDomain',
  databaseURL: 'your-databaseURL',
  projectId: 'your-projectId',
  storageBucket: 'your-storageBucket',
  messagingSenderId: 'your-messagingSenderId',
  appId: 'your-appId'
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const db = firebase.database()
const storage = firebase.storage()

export { firebase, storage, db }
