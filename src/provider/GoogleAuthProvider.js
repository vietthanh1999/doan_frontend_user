import React from 'react'
import { useGoogleLogin } from 'react-google-login'

const GoogleAuthContext = React.createContext()

export const GoogleAuthProvider = ({ children }) => {
  const googleAuth = useGoogleLogin({
    clientId: process.env.GOOGLE_CLIENT_ID,
  })

  return (
    <GoogleAuthContext.Provider value={googleAuth}>
      {children}
    </GoogleAuthContext.Provider>
  )
}

export const useGoogleAuth = () => React.useContext(GoogleAuthContext)
