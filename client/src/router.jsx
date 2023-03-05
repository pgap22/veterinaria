import { PATHS_DUENO, PATHS_VET, PATHS_SECRETARY } from './constants/routes.js'

import ProtectedRoute from './layouts/ProtectedRoute'
import UnProtectedRoute from './layouts/UnprotectedRoute'

import { Login } from './pages/login'
import { Index } from './pages/index'
import { Register } from './pages/register'
import { Header } from './components/Header/Header'

import { CitasContainer } from './components/Containers/Appointments'
import { PetsContainer } from './components/Containers/Pets'
import { VetContainer } from './components/Containers/Vet.jsx'
import { SecyContainer } from './components/Containers/Secy.jsx'
import { DiagnosticContainer } from './components/Containers/Diagnostic.jsx'

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
    path: '/pets',
    element: (
      <ProtectedRoute>
        <Header paths={PATHS_DUENO} />
        <PetsContainer />
      </ProtectedRoute>
    )
  },
  {
    path: '/appointments',
    element: (
      <ProtectedRoute>
        <Header paths={PATHS_DUENO} />
        <CitasContainer />
      </ProtectedRoute>
    )
  },
  {
    path: '/appointments/diagnostic/:id',
    element: (
      <ProtectedRoute>
        <Header paths={PATHS_DUENO} />
        <DiagnosticContainer />
      </ProtectedRoute>
    )
  },
  {
    path: '/vet',
    element: (
      <>
        <Header paths={PATHS_VET} />
        <VetContainer />
      </>
    )
  },
  {
    path: '/secy',
    element: (
      <>
        <Header paths={PATHS_SECRETARY} />
        <SecyContainer />
      </>
    )
  }

])
