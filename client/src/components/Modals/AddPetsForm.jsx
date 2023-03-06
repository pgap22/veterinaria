import { useState } from 'react'
import { IoIosClose } from 'react-icons/io'

import { useForm } from 'react-hook-form'

import axiosClient from '../../config/axiosClient'
import { mutate } from 'swr'
import { usePets } from '../../store/usePet'
import { shallow } from 'zustand/shallow'

const addPet = async (newPet) => {
  const token = window.localStorage.getItem('token')
  const configHeaders = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axiosClient.post('/mascotas/', newPet, configHeaders)
  return data
}

export const AddPetsForm = () => {
  const [showModal, setShowModal] = useState(false)
  const { register, handleSubmit } = useForm()

  const mascotas = usePets((state) => state.pets, shallow)
  const setPets = usePets((state) => state.setPets, shallow)

  const successSubmit = async (data) => {
    data.genero = data.genero === 'true'
    data.edad = parseInt(data.edad)

    mutate('/mascotas', async () => {
      const mascotanNew = await addPet(data)
      setPets([...mascotas, mascotanNew])
      setShowModal(false)
    })
  }

  return (
    <>
      <button
        className='font-medium cursor-pointer px-3 py-2 border rounded-xl hover:text-white text-black hover:bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500'
        type='button'
        onClick={() => setShowModal(true)}
      >
        Agregar Mascota
      </button>
      {showModal
        ? (
          <>
            <div
              className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
            >
              <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                {/* content */}

                <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                  {/* header */}
                  <div className='flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t gap-5'>

                    <h3 className='text-3xl font-semibold'>
                      Agrega a una nueva Mascota
                    </h3>
                    <IoIosClose className='fill-black cursor-pointer' size={40} onClick={() => setShowModal(false)} />
                  </div>
                  {/* body */}
                  <div className='relative p-6 flex-auto'>
                    <form className='bg-white rounded' onSubmit={handleSubmit(successSubmit)}>
                      <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                          Name:
                        </label>
                        <input className='border-gray-300  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='name' type='text' placeholder='Aristides' {...register('nombre', { required: true })} />
                      </div>

                      <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
                          Specie:
                        </label>
                        <input className='border-gray-300  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='specie' type='text' placeholder='caninus' {...register('especie', { required: true })} />
                      </div>

                      <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
                          Race:
                        </label>
                        <input className='border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='race' type='text' placeholder='Dalmata' {...register('raza', { required: true })} />
                      </div>

                      <div className='mb-4'>
                        <label htmlFor='gender' className='block text-gray-700 text-sm font-bold mb-2'>Select pet's gender</label>

                        <select id='countries' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' {...register('genero', { required: true })}>
                          <option value>Male</option>
                          <option value={false}>Female</option>
                        </select>

                      </div>

                      <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
                          Age:
                        </label>
                        <input className='border-gray-300  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='age' type='text' placeholder='8' {...register('edad', { required: true })} />
                      </div>

                      <div className='flex items-center gap-4'>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>
                          Add
                        </button>
                      </div>
                    </form>
                  </div>

                </div>
              </div>
            </div>
            <div className='opacity-25 fixed inset-0 z-40 bg-black' />
          </>
          )
        : null}
    </>
  )
}
