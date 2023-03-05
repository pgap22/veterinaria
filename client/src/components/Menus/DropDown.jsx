import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { BsThreeDots } from 'react-icons/bs'

import { usePetEdit, usePetDelete, usePets } from '../../store/usePet'
import { shallow } from 'zustand/shallow'

function classNames (...classes) {
  return classes.filter(Boolean).join(' ')
}

export const DropdownComponent = ({ id }) => {
  const setOpenEdit = usePetEdit((state) => state.setOpen, shallow)
  const setOpenDelete = usePetDelete((state) => state.setOpen, shallow)
  const pets = usePets((state) => state.pets, shallow)
  const setSelectedPet = usePets((state) => state.setSelectedPet, shallow)
  const selectedPet = pets.filter((pet) => pet.id === id)[0]
  return (
    <Menu as='div' className='relative inline-block text-left z-50'>
      <div>

        <Menu.Button className=' left-24 z-10 absolute rounded-lg text-sm p-1.5'>
          <BsThreeDots size={25} className='fill-white ' />
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
        <Menu.Items className='absolute -right-[7.5rem] top-5 w-28 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => {
                    setSelectedPet(selectedPet)
                    setOpenEdit(true)
                  }}
                  className={classNames(
                    active
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Editar
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => {
                    setSelectedPet(selectedPet)
                    setOpenDelete(true)
                  }}
                  className={classNames(
                    active
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Eliminar
                </button>
              )}
            </Menu.Item>

          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
