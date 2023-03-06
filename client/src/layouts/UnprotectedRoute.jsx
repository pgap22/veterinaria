import { useNavigate } from 'react-router-dom'
import { shallow } from 'zustand/shallow'
import { useAuth } from '../store/auth'
import { PATHS_DUENO, PATHS_SECRETARY, PATHS_VET } from '../constants/routes'
import { useEffect } from 'react'
export default function UnProtectedRoute({ children }) {
  const user = useAuth((state) => state.user, shallow)
  const loading = useAuth((state) => state.loading, shallow)
  const navigate = useNavigate()

  if (loading) return <p>loading...</p>

  // Si hay usuario regresa a home
  useEffect(() => {
    if (user.id) {
      if (user.role === 'dueno') {
        navigate(PATHS_DUENO[0].path)
        return
      }
      if (user.role === 'secretaria') {
        navigate(PATHS_SECRETARY[0].path)
        return
      }
      if (user.role === 'veterinario') {
        navigate(PATHS_VET[0].path)
        return
      }

    }
  }, [])

  return (
    <>
      <div>{children}</div>
    </>
  )
}
