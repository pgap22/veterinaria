import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth'

export default function ProtectedRoute ({ children }) {
  const user = useAuth(state => state.user);
  
  const navigate = useNavigate()


  useEffect(() => {
    if (!user.id || user.role !== 'dueno') {
      return navigate('/')
    } 
  }, [])
  

  return (
    <>
      <div>{children}</div>
    </>
  )
}
