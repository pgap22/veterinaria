import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import Login from './pages/login'

import Header from './components/Header/Header'

import Register from './pages/register'
import { Home } from './pages/home'
import { CitasContainer } from './components/Containers/Citas'
import { Index } from './pages'
import { PetsContainer } from './components/Containers/Pets'

import { QueryClient, QueryClientProvider } from 'react-query'

// import ProtectedRoute from './layouts/ProtectedRoute'
import UnProtectedRoute from './layouts/UnprotectedRoute'

import { AuthProvider } from './context/AuthContext'

import { PATHS_DUENO } from './constans/routes.js'
import { SUBTITLE_DUENO } from './constans/subtitles'

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
        <Header subTitle={SUBTITLE_DUENO} paths={PATHS_DUENO} />
        <Home />
      </>
    )
  },
  {
    path: '/pets',
    element: (
      <>
        <Header subTitle={SUBTITLE_DUENO} paths={PATHS_DUENO} />
        <PetsContainer />
      </>
    )
  },
  {
    path: '/appointments',
    element: (
      <>
        <Header subTitle={SUBTITLE_DUENO} paths={PATHS_DUENO} />
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
