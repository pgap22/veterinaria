import { MdOutlinePets } from 'react-icons/md'
import { NavLink } from '../CustomComponents/Link'
import { DropdownComponentHeader } from '../Menus/DropDownHeader'

import { shallow } from 'zustand/shallow'
import { useAuth } from '../../store/auth'

const LINK_STYLES_NAV = 'text-gray-300 hover:text-gray-900 transition-all delay-250 hover:border-b hover:border-gray-200 uppercase tracking-widest '
const ACTIVE_LINKS_STYLES_NAV = 'text-gray-900 border-b border-gray-300 transition-all delay-250 uppercase tracking-widest'

export const Header = ({ subTitle, paths }) => {
  const user = useAuth((state) => state.user, shallow)
  return (
    <>
      <header>
        <nav className='bg-white border-gray-100 px-4 lg:px-6 py-2.5 border-b'>
          <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl sm:flex-row flex-col'>

            <div className='flex items-center gap-3'>
              <MdOutlinePets size={35} className='text-gray-800' />
              <span className='self-center text-2xl font-semibold whitespace-nowrap'>Vet online</span>
            </div>

            <div className='justify-between items-center flex w-auto ' id='mobile-menu-2'>
              <ul className='flex font-medium space-x-8 '>
                {paths.map((x, i) => {
                  return (
                    <li key={i}>
                      <NavLink to={x.path} stylesComponent={LINK_STYLES_NAV} classNameIsActive={ACTIVE_LINKS_STYLES_NAV}>
                        {x.page}
                      </NavLink>
                    </li>
                  )
                })}

                {/* <a href='#' className='block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 ' aria-current='page'>Home</a> */}

              </ul>
            </div>

            <div className='flex items-center'>
              <div className='flex items-center gap-2'>
                <div className='flex flex-col'>
                  <h1 className='text-lg font-bold text-gray-900 uppercase '>
                    {user.nombre}
                  </h1>
                </div>

                <DropdownComponentHeader />
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
