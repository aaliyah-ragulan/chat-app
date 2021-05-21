import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import React, { useState, useEffect } from 'react'

firebase.initializeApp({
  apiKey: 'AIzaSyC40JGNqi_JtZ8vWEUDCGFm_TELTRR9KsQ',
  authDomain: 'react-firechat-94a86.firebaseapp.com',
  projectId: 'react-firechat-94a86',
  storageBucket: 'react-firechat-94a86.appspot.com',
  messagingSenderId: '396312030091',
  appId: '1:396312030091:web:4a07aeb9933373a3841d8e',
})

function App() {
  const signInWithGoogle = async () => {
    //calling google authorization
    const provider = new firebase.auth.GoogleAuthProvider()

    firebase.auth().useDeviceLanguage()
    //handling the google sign in
    try {
      await firebase.auth().signInWithPopup(provider)
    } catch (error) {
      console.log(error.message)
    }
  }
  //handling the google sign out
  const signOut = async () => {
    try {
      await firebase.auth().signOut()
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      <Button onClick={signInWithGoogle}>Sign in with Google</Button>
    </div>
  )
}

export default App
