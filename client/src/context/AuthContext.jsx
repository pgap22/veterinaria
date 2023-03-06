import { createContext, useEffect } from 'react'
import { shallow } from 'zustand/shallow'
import { getUser } from '../api/auth'
import { useAuth } from '../store/auth'
// import { usePets } from '../store/usePet'
// import { fetcherPets } from '../api/pets'
// import useSWR from 'swr'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const setUser = useAuth((state) => state.setUser, shallow)
  const setLoading = useAuth((state) => state.setLoading, shallow)

  // const setPets = usePets((state) => state.setPets, shallow)
  // const { data } = useSWR('/mascotas', fetcherPets)
  // const mascotas = data.data

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
      // setPets(mascotas)
      setUser(userData)
      setLoading(false)
    }

    loadUser()
  }, [])

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}

export { AuthProvider }
