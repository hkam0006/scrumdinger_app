import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { createContext, useContext, useState } from "react"
import { auth } from "../firebase"

const AuthContext = createContext(null)

export function useAuthContext(){
  return useContext(AuthContext)
}

export function AuthContextProvider({children}){
  const [authorisation, setAuthorisation] = useState(null)
  const [loading, setLoading] = useState(false)

  function signInUser(email, password){
    setLoading(true)
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setAuthorisation(userCredential)
          setLoading(false)
          resolve(userCredential)
        })
        .catch((err) => {
          setLoading(false)
          reject(err)
        })
    })
  }

  function signOutUser(){
    setLoading(true)
    return new Promise((resolve, reject) => {
      auth.signOut().then(() => {
        setAuthorisation(null)
        setLoading(false)
        resolve(true)
      }).catch((error) => {
        setLoading(false)
        reject(error)
      })
    })
  }

  function signUpUser(email, password){
    setLoading(true)
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setAuthorisation(userCredential)
          setLoading(false)
          resolve(userCredential)
        })
        .catch((error) => {
          setLoading(false)
          reject(error)
        })
    })
  }

  return <AuthContext.Provider value={
    {signInUser, signOutUser, signUpUser, authorisation, loading}
    }>
    {children}
  </AuthContext.Provider>
}