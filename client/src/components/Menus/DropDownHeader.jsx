import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { RxAvatar } from 'react-icons/rx'

import { useNavigate } from 'react-router-dom'
import { shallow } from 'zustand/shallow'
import { useAuth } from '../../store/auth'
import { usePets } from '../../store/usePet'
import { useQueryClient } from 'react-query'

function classNames (...classes) {
  return classes.filter(Boolean).join(' ')
}

export const DropdownComponentHeader = () => {
  const setPets = usePets((state) => state.setPets, shallow)
  const setSelectedPet = usePets((state) => state.setSelectedPet, shallow)

  const setUser = useAuth((state) => state.setUser, shallow)
  const queryClient = useQueryClient();

  const logout = async () => {
    window.localStorage.removeItem('token')
    await queryClient.resetQueries();
    setUser({})
    setPets([])
    setSelectedPet({})
    navigate('/')
  }

  const navigate = useNavigate()
  return (
    <Menu as='div' className='relative inline-block text-left z-50'>
      <div>
        <Menu.Button className='rounded-lg text-sm p-1.5'>
          <RxAvatar size={50} />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-[1.5rem] top-14 w-28 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => logout()}
                  className={classNames(
                    active
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Log out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
