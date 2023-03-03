import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import Login from './pages/login'
import HeaderClient from './components/HeaderClient'
import Register from './pages/register'
import { Home } from './pages/home'
import { CitasContainer } from './components/Citas'
import Index from './pages'
import { PetsContainer } from './components/Pets'

import { QueryClient, QueryClientProvider } from 'react-query'

// import ProtectedRoute from './layouts/ProtectedRoute'
import UnProtectedRoute from './layouts/UnprotectedRoute'

import { AuthProvider } from './context/AuthContext'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <UnProtectedRoute>
        <Login />
      </UnProtectedRoute>
    )
  },
  {
    path: '/register',
    element: (
      <UnProtectedRoute>
        <Register />
      </UnProtectedRoute>
    )
  },
  {
    path: '/',
    element: (
      <>
        <Index />
      </>
    )
  },
  {
    path: '/home',
    element: (
      <>
        <HeaderClient />
        <Home />
      </>
    )
  },
  {
    path: '/pets',
    element: (
      <>
        <HeaderClient />
        <PetsContainer />
      </>
    )
  },
  {
    path: '/appointments',
    element: (
      <>
        <HeaderClient />
        <CitasContainer />
      </>
    )
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
)
