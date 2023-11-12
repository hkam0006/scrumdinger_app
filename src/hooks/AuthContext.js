import { EmailAuthProvider, createUserWithEmailAndPassword, deleteUser, reauthenticateWithCredential, signInWithEmailAndPassword, updatePassword } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"
import { auth, app } from "../firebase"

const AuthContext = createContext(null)

export function useAuthContext(){
  return useContext(AuthContext)
}

export function AuthContextProvider({children}){
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    });
  }, [])

  function reauthenticateUser(password){
    return new Promise((resolve, reject) => {
      const credential = EmailAuthProvider.credential(
        currentUser.user.email,
        password
      )
      reauthenticateWithCredential(auth.currentUser, credential).then(() => {
        resolve("Correct Password")
      }).catch((err) => {
        reject(err)
      })
    })
  }

  function changePassword(newPassword){
    if (auth.currentUser === null) {
      return
    } else {
      return new Promise((resolve, reject) => {
        updatePassword(auth.currentUser, newPassword)
          .then(() => {
            resolve("Update Successful")
          })
          .catch((error) => {
            reject(error)
          })
      }) 
    }
  }

  function signInUser(email, password){
    setLoading(true)
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setCurrentUser(userCredential)
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
        setCurrentUser(null)
        setLoading(false)
        resolve(true)
      }).catch((error) => {
        setLoading(false)
        reject(error)
      })
    })
  }

  function deleteAccount(){
    if (auth.currentUser === null ) {
      return
    } else {
      const user = auth.currentUser
      return new Promise((resolve, reject) => {
        deleteUser(user).then(() => {
          console.log("User Deleted")
          resolve("User Deleted Successfully")
        }).catch((error) => {
          reject(error)
        })
      })
    }
  }

  function signUpUser(email, password){
    setLoading(true)
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setCurrentUser(userCredential)
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
    {
      signInUser, 
      signOutUser, 
      signUpUser, 
      currentUser, 
      loading, 
      deleteAccount, 
      changePassword,
      reauthenticateUser,
    }
    }>
    {children}
  </AuthContext.Provider>
}