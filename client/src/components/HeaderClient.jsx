import { useNavigate } from 'react-router-dom'
import { NavLink } from './Link'
import { shallow } from 'zustand/shallow'
import { useAuth } from '../store/auth'

// import { CitasContainer } from '../components/Citas'

export default function HeaderClient () {
  const user = useAuth((state) => state.user, shallow)
  const setUser = useAuth((state) => state.setUser, shallow)
  const logout = () => {
    window.localStorage.removeItem('token')
    setUser({})
    navigate('/')
  }
  const linkStyles = 'block rounded-lg bg-gray-300 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-400 focus:outline-none focus:ring text-center'
  const activeStyles = 'pointer-events-none bg-gray-400 text-center'

  const navigate = useNavigate()

  return (
    <>
      <header aria-label='Page Header' className='bg-white shadow-md'>
        <div className='mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8'>
          <div className='sm:flex sm:items-center sm:justify-between'>
            <div className='text-center sm:text-left'>
              <h1 className='text-2xl font-bold text-gray-900 sm:text-3xl'>
                Bienvenido Juan Carlos{user.name}
              </h1>

              <p className='mt-1.5 text-sm text-gray-500'>
                Aqui estan tus citas veterinarias! 🐶
              </p>
            </div>

            <div className='mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center'>

              <NavLink to='/home' stylesComponent={linkStyles} classNameIsActive={activeStyles}>
                Home
              </NavLink>

              <NavLink to='/pets' stylesComponent={linkStyles} classNameIsActive={activeStyles}>
                Pets
              </NavLink>

              <NavLink to='/appointments' stylesComponent={linkStyles} classNameIsActive={activeStyles}>
                Appointments
              </NavLink>

              <button
                onClick={logout}
                className='block rounded-lg bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring'
                type='button'
              >
                Log out
              </button>

            </div>
          </div>
        </div>
      </header>
    </>
  )
}
