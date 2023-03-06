import { useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import axiosClient from '../../config/axiosClient'
import { mutate } from 'swr'

import { usePets } from '../../store/usePet'
import { shallow } from 'zustand/shallow'

const addAppointment = async (newAppointment) => {
  const token = window.localStorage.getItem('token')
  const configHeaders = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axiosClient.post('/citas', newAppointment, configHeaders)
  return data
}

export const RequestAppointments = () => {
  const [showModal, setShowModal] = useState(false)
  const { register, handleSubmit } = useForm()
  const pets = usePets((state) => state.pets, shallow)
  const navigate = useNavigate()
  const succesSubmit = (appointment) => {
    appointment.idMascota = parseInt(appointment.idMascota)
    const idDueno = { idDueno: pets.filter((pet) => pet.id === appointment.idMascota)[0].id_dueno }

    mutate('/citas', async () => {
      await addAppointment({ ...appointment, ...idDueno })
      setShowModal(false)
    })
  }

  const NoPetsModal = () => {
    return (
      <>
        <div
          className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
        >
          <div className='relative w-auto my-6 mx-auto max-w-3xl'>
            {/* content */}
            <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
              {/* header */}
              <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
                <h3 className='text-3xl font-semibold'>
                  No tienes mascotas agregadas en este momento
                </h3>
                <button
                  className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                  onClick={() => setShowModal(false)}
                >
                  <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                    ×
                  </span>
                </button>
              </div>
              {/* body */}
              <div className='relative p-6 flex-auto'>
                <p className='my-4 text-slate-500 text-lg leading-relaxed'>
                  Para poder crear una cita necesitas agregar una mascota obligatoriamente
                </p>
              </div>
              {/* footer */}
              <div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
                <button
                  className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                  type='button'
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className='bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                  type='button'
                  onClick={() => navigate('/pets')}
                >
                  Crear una mascota
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='opacity-25 fixed inset-0 z-40 bg-black' />
      </>
    )
  }

  return (
    <>
      <button
        className='font-medium cursor-pointer px-3 py-2 border rounded-xl hover:text-white text-black hover:bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500'
        type='button'
        onClick={() => setShowModal(true)}
      >
        Solicitar cita
      </button>
      {showModal
        ? (
            pets.length
              ? (
                <>
                  <div
                    className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
                  >
                    <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                      <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                        {/* header */}
                        <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
                          <h3 className='text-3xl font-semibold'>
                            Request an appointment
                          </h3>
                          <IoIosClose className='fill-black cursor-pointer' size={40} onClick={() => setShowModal(false)} />

                        </div>
                        <div className='relative p-6 flex-auto'>
                          <form className='bg-white rounded' onSubmit={handleSubmit(succesSubmit)}>

                            <div className='mb-4'>
                              <label htmlFor='gender' className='block text-gray-700 text-sm font-bold mb-2'>Select a pet</label>
                              <select id='gender' className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' {...register('idMascota', { required: true })}>
                                {pets.map((pet, i) => {
                                  return <option key={i} value={pet.id}>{pet.nombre}</option>
                                })}
                              </select>
                            </div>

                            <div className='mb-4'>
                              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
                                Motivo:
                              </label>
                              <input className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-300 ' id='name' type='text' placeholder='Aristides' {...register('motivo', { required: true })} />
                            </div>

                            <div className='mb-4'>
                              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
                                Appoinment's date
                              </label>
                              {/* <div className='relative max-w-sm'>
                                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                  <svg aria-hidden='true' className='w-5 h-5 text-gray-500 dark:text-gray-400' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z' clipRule='evenodd' /></svg>
                                </div>
                                <input type='date' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5' placeholder='Select date' {...register('fecha', { required: true })} />
                              </div> */}
                            </div>

                            <div className='flex items-center gap-4'>
                              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>
                                Add
                              </button>
                              <button className=' hover:text-blue-800 text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={() => setShowModal(false)}>
                                Close
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='opacity-25 fixed inset-0 z-40 bg-black' />
                </>)
              : (<NoPetsModal />))
        : null}
    </>
  )
}
