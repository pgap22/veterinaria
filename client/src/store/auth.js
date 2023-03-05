// import { useNavigate } from 'react-router-dom'
import { create } from 'zustand'

export const useAuth = create((set) => ({
  user: {},
  loading: false,
  setUser: (newAuthUser) => {
    set({ user: newAuthUser })
  },
  setLoading: (bool) => {
    set({ loading: bool })
  },
  logout: () => {
    window.localStorage.setItem('token', '')

    set({ user: {} })
  }
}))
