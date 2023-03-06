import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { shallow } from 'zustand/shallow'
import { useAuth } from '../store/auth'

export default function ProtectedRouteVet ({ children }) {
  const user = useAuth(state => state.user);
  
  const navigate = useNavigate()


  useEffect(() => {
    if (user.role !== 'veterinario') {
      return navigate('/')
    } 
  }, [])
  

  return (
    <>
      <div>{children}</div>
    </>
  )
}
