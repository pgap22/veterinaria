import { useNavigate } from 'react-router-dom'
import { shallow } from 'zustand/shallow'
import { useAuth } from '../store/auth'
import { PATHS_DUENO } from '../constants/routes'

export default function UnProtectedRoute ({ children }) {
  const user = useAuth((state) => state.user, shallow)
  const loading = useAuth((state) => state.loading, shallow)
  const navigate = useNavigate()

  if (loading) return <p>loading...</p>

  // Si hay usuario regresa a home
  if (user.id) {
    navigate(PATHS_DUENO[0].path)
    return
  }

  return (
    <>
      <div>{children}</div>
    </>
  )
}
