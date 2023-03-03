import { PATHS_DUENO } from './constans/routes.js'
import { SUBTITLE_DUENO } from './constans/subtitles'

// import ProtectedRoute from './layouts/ProtectedRoute'
import UnProtectedRoute from './layouts/UnprotectedRoute'

import { Login } from './pages/login'
import { Index } from './pages/index'
import { Register } from './pages/register'
import { Home } from './pages/home'
import { Header } from './components/Header/Header'
import { CitasContainer } from './components/Containers/Citas'
import { PetsContainer } from './components/Containers/Pets'

import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
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
