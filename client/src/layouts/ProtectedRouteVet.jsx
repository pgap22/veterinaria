import { useNavigate } from 'react-router-dom'
import { shallow } from 'zustand/shallow'
import { useAuth } from '../store/auth'

export default function ProtectedRouteVet ({ children }) {
  const user = useAuth((state) => state.user, shallow)
  const loading = useAuth((state) => state.loading, shallow)

  const navigate = useNavigate()
  console.log(user)
  if (loading) return <p>loading...</p>

  // Si no hay usuario regresate
  if (!user.id || user.role !== 'veterinario') {
    navigate('/')
    return
  }

  return (
    <>
      <div>{children}</div>
    </>
  )
}
