import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { shallow } from 'zustand/shallow'
import { useAuth } from '../store/auth'

export default function ProtectedRouteVet({ children }) {
  const user = useAuth((state) => state.user, shallow)
  const loading = useAuth((state) => state.loading, shallow)
  const navigate = useNavigate()

  useEffect(() => {
    if (user.role !== 'veterinario') {
      navigate('/')
      return
    }
  })

  if (loading) return <p>loading...</p>


  return (
    <>
      <div>{children}</div>
    </>
  )
}
