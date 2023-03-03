import { createContext, useEffect } from 'react'
import { shallow } from 'zustand/shallow'
import { getUser } from '../api/auth'
import { useAuth } from '../store/auth'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const setUser = useAuth((state) => state.setUser, shallow)
  const setLoading = useAuth((state) => state.setLoading, shallow)

  useEffect(() => {
    const loadUser = async () => {
      //
      setLoading(true)

      // Si el token no existe no hacer ninguna peticion y quedar con el state vacio
      if (!window.localStorage.getItem('token')) {
        setLoading(false)
        setUser({})

        return
      }

      const userData = await getUser()

      setUser(userData)
      setLoading(false)
    }

    loadUser()
  }, [])

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}

export { AuthProvider }
