import firebase from "firebase/app"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCf-Xvf901nqHr4BbzrV34AEOduQQ6hToc",
  authDomain: "auth-test-000.firebaseapp.com",
  projectId: "auth-test-000",
  storageBucket: "auth-test-000.appspot.com",
  messagingSenderId: "15476515110",
  appId: "1:15476515110:web:95ce3ef1ed20f0aceae1e7",
}
const app = firebase.initializeApp(firebaseConfig)

// const app = firebase.initializeApp({
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMIAN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
// })

export const googleProvider = new firebase.auth.GoogleAuthProvider()
export const facebookProvider = new firebase.auth.FacebookAuthProvider()
export const auth = app.auth()
export default app
