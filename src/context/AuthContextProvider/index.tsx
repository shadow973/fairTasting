import React, { ReactNode, useEffect, useMemo, useState, useContext, useCallback, useRef } from 'react'
import DeviceInfo from 'react-native-device-info'
import { User, UserCredentials, PasswordVerification } from '@fair/constants/User'
import SecureStore from '@fair/components/common/SecureStore';
import { useApi, refreshToken } from '@fair/hooks/useApi';
import JWT from 'expo-jwt'
import jwt_decode from "jwt-decode";
import { Buffer } from 'buffer';
import FTENV from '@fair/ftenv';
import i18n from 'i18n-js';
import * as Analytics from 'expo-firebase-analytics';

export interface AuthContextProps {
  loading: boolean
  user?: User
  isTokenValid: boolean,
  pwdResetError: boolean,
  userError: boolean,
  startVerification: boolean,
  errorType: string,
  validateToken: (token: string) => Promise<boolean>
  login: (credentials: UserCredentials) => Promise<User>
  passwordReset: (credentials: UserCredentials) => void
  verifyReset: (credentials: PasswordVerification) => void
  logout: () => Promise<boolean>
  verifySignup: (credentials: any) => void
  signup: (credentials: any) => void
  handleAppleSignIn: (appleResponse: any) => void
  handleGoogleSignIn: (gResponse: any) => void
  handleFacebookSignIn: (facebookToken: any) => void
  completeProfile: (profileCompletion: any) => void
  setpwdResetError: (state: boolean) => void
}

export const AuthContext = React.createContext<AuthContextProps | undefined>(undefined)

export function useAuthContext(): AuthContextProps {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('No valid authentication context. Did you forget to add AuthContextProvider?')
  }
  return context
}

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true)
  const [pwdResetError, setpwdResetError] = useState(false)
  const [startVerification, setStartVerification] = useState(false)
  const [userError, setUserError] = useState(false)
  const [errorType, setErrorType] = useState()
  const [user, setUser] = useState<User | undefined>()
  const [isTokenValid, setIsTokenValid] = useState<boolean>(false)
  const [interval, setMyInterval] = useState()
  const tokenCheck = useRef(0);

  useEffect(() => {
    restoreSession()
  }, [])

  const restoreSession = async () => {
    setLoading(true)
    let user = await getCachedUser();
    let token = await getToken();
    if (user && token) {
      await validateToken(token)
      setUser(user)
      if (!user.default_locale) {
        await updateLocate()
      }
      await captureUserAnalytics();
      await tokenChecker();
    } else {
      await logout()
    }
    setLoading(false)
  }
  const tokenChecker = async () => {
    let token = await getToken();
    if (!tokenCheck.current) {
      tokenCheck.current = window.setInterval(async () => {
        if (!token) {
          console.log("No token to check")
        } else {
          await validateToken(token)
        }
      }, 1000 * 600);
    }

    if (!token) {
      console.log("Dropping")
      await clearInterval(tokenCheck.current);
    }
  }
  const validateToken = async (token: string) => {
    try {
      const refresh_token = await getRefreshToken()
      let { valid } = await useApi('auth/valid', {
        method: 'POST'
      })
      if (valid) {
        setIsTokenValid(valid)
        tokenChecker()
        return
      }
      if (!valid && refresh_token) {
        const { user, token } = await refreshToken({
          method: 'POST',
          body: JSON.stringify({ refresh_token: refresh_token })
        })
        if (user != undefined && token != undefined) {
          await updateUser(user)
          await setToken(token.access_token)
          await setRefreshToken(token.refresh_token)
        } else {
          valid = false;
        }
      }
      if (!valid) {
        setIsTokenValid(valid)
        logout()
      }
    } catch (error) {
      console.log(`Error validating token: ${error.message}`, { error })
      throw error // continue throwing
    }
  }

  let clearToken = async () => await SecureStore.delete(FTENV().envName + '-token');
  let setToken = async (token: string) => await SecureStore.set(FTENV().envName + '-token', token);
  let getToken = async () => await SecureStore.get(FTENV().envName + '-token');
  let clearRefreshToken = async () => await SecureStore.delete(FTENV().envName + '-refreshToken');
  let setRefreshToken = async (token: string) => await SecureStore.set(FTENV().envName + '-refreshToken', token);
  let getRefreshToken = async () => await SecureStore.get(FTENV().envName + '-refreshToken');

  const captureUserAnalytics = async () => {
    if (user) {
      await Analytics.setUserId(user?.id);
    }
  };

  const getCachedUser = async () => {
    const user = await SecureStore.get(FTENV().envName + '-user')
    return user ? JSON.parse(user) : false
  };

  const clearUser = async () => {
    await SecureStore.delete(FTENV().envName + '-user');
    setUser(undefined)
  }

  const updateUser = async (user: User) => {
    if (user != undefined) {
      await SecureStore.set(FTENV().envName + '-user', JSON.stringify(user));
      setUser(user)
    }
  }

  const logout = async () => {
    setLoading(true)
    await clearUser()
    await clearToken()
    await clearRefreshToken()
    setUser(undefined)
    setLoading(false)
  }
  const postLogin = async (user: User, token: {}) => {
    await updateUser(user)
    await setToken(token.access_token)
    await setRefreshToken(token.refresh_token)
    await setIsTokenValid(!!token)
    await tokenChecker()
  }
  const login = useCallback(
    async (userCredentials: any): Promise<User> => {
      setLoading(true)
      try {
        const { user, token } = await useApi('authenticate', {
          method: 'POST',
          body: JSON.stringify(userCredentials)
        })
        await postLogin(user, token)
        setLoading(false)
        return user
      } catch (error) {
        setLoading(false)
        throw error // continue throwing
      }
    },
    []
  )
  const completeProfile = useCallback(
    async (profileCompletion: any) => {
      setLoading(true)

      try {
        const { data } = await useApi('user/profile/completion', {
          method: 'POST',
          body: JSON.stringify(profileCompletion)
        })
        await updateUser(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        throw error // continue throwing
      }
    },
    []
  )
  const updateLocate = useCallback(
    async () => {
      setLoading(true)

      try {
        const { data } = await useApi('user/locale/' + i18n.currentLocale().substr(0, 2))
        if (user) {
          await updateUser(data)
        }
        setLoading(false)
      } catch (error) {
        setLoading(false)
        throw error // continue throwing
      }
    },
    []
  )
  const handleAppleSignIn = useCallback(
    async (appleResponse: any) => {
      setLoading(true)
      try {
        const decodedToken = jwt_decode(appleResponse.identityToken)
        const { user, token } = await useApi('authenticate/apple', {
          method: 'POST',
          body: JSON.stringify(decodedToken)
        })

        await postLogin(user, token)
        setLoading(false)
        //await tokenChecker()
        return user
      } catch (error) {
        setLoading(false)
        throw error // continue throwing
      }
    },
    []
  )

  const handleGoogleSignIn = useCallback(
    async (gResponse: any) => {
      setLoading(true)
      try {
        const accessToken = gResponse.params.access_token;
        const data = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
        });
        const gUser = await data.json();
        const { sub, email, given_name, family_name, locale, gender, picture } = gUser;
        const { user, token } = await useApi('authenticate/google', {
          method: 'POST',
          body: JSON.stringify({
            first_name: given_name,
            last_name: family_name,
            email: email,
            user_id: sub
          })
        })

        await postLogin(user, token)
        console.log(token)
        setLoading(false)
        return user
      } catch (error) {
        setLoading(false)
        throw error // continue throwing
      }
    },
    []
  )

  const handleFacebookSignIn = useCallback(
    async (facebookToken: any) => {
      setLoading(true)
      try {
        const data = await fetch(`https://graph.facebook.com/me?access_token=${facebookToken}&fields=id,first_name,last_name,email`);
        const fUser = await data.json();
        const { id, email, first_name, last_name } = fUser;
        const { user, token } = await useApi('authenticate/facebook', {
          method: 'POST',
          body: JSON.stringify({
            first_name,
            last_name,
            email: email,
            user_id: id
          })
        })
        await postLogin(user, token)
        setLoading(false)
        return user
      } catch (error) {
        setLoading(false)
        throw error // continue throwing
      }
    },
    []
  )
  const passwordReset = useCallback(
    async (userCredentials) => {

      setpwdResetError(false)
      try {
        const { result, type } = await useApi('password/reset', {
          method: 'POST',
          body: JSON.stringify(userCredentials)
        })
        if (type == "not_found") {
          setpwdResetError(true)
        }
      } catch (error) {
        setLoading(false)
        setpwdResetError(true)
        throw error // continue throwing
      }
    },
    []
  )
  const verifyReset = useCallback(
    async (userCredentials) => {
      try {
        const { data, message } = await useApi('password/verify', {
          method: 'POST',
          body: JSON.stringify(userCredentials)
        })
      } catch (error) {
        throw error // continue throwing
      }
    },
    []
  )

  const signup = useCallback(
    async (userCredentials) => {
      await setUserError(false)
      try {
        const { data, message } = await useApi('signup', {
          method: 'POST',
          body: JSON.stringify(userCredentials)
        })
        //console.log(data)
        await setUserError(!data)
        await setStartVerification(data)
        await setErrorType(message)
      } catch (error) {
        console.log(`Failed to login user: ${error.message}`, { error })
        throw error // continue throwing
      }
    },
    []
  )
  const verifySignup = useCallback(
    async (userCredentials) => {
      try {
        const { data, message } = await useApi('signup/verify', {
          method: 'POST',
          body: JSON.stringify(userCredentials)
        })
      } catch (error) {
        throw error // continue throwing
      }
    },
    []
  )

  const value = useMemo(() => ({
    loading,
    user,
    isTokenValid,
    pwdResetError,
    setpwdResetError,
    userError,
    errorType,
    startVerification,
    login,
    logout,
    passwordReset,
    verifyReset,
    validateToken,
    verifySignup,
    signup,
    handleAppleSignIn,
    handleGoogleSignIn,
    handleFacebookSignIn,
    completeProfile
  }), [
    loading,
    user,
    isTokenValid,
    pwdResetError,
    setpwdResetError,
    userError,
    errorType,
    startVerification,
    login,
    logout,
    passwordReset,
    verifyReset,
    validateToken,
    verifySignup,
    signup,
    handleAppleSignIn,
    handleGoogleSignIn,
    handleFacebookSignIn,
    completeProfile
  ])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
