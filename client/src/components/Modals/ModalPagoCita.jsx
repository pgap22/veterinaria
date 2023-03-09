import { useState } from 'react'

import { FiArrowRight } from 'react-icons/fi'
import { IoIosClose } from 'react-icons/io'
import { TailSpin } from 'react-loader-spinner'
import { useForm } from 'react-hook-form'

import { mutate } from 'swr'
import axiosClient from '../../config/axiosClient'

const MASTERCARD_REG = /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/

const payAppointment = async (id) => {
  const token = window.localStorage.getItem('token')
  const configHeaders = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axiosClient.get(`/pagos/pagar/${id}`, configHeaders)
  return data
}

export const ModalPagoCita = ({ id }) => {
  const [isSubmit, setShowSubmit] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const successSubmit = async () => {
    setShowSubmit(true)
    mutate('/citas', async () => {
      await payAppointment(id)
    })
  }

  return (
    <>
      <FiArrowRight size={25} className='stroke-[#7b7b7b] group-hover:stroke-white' onClick={() => setShowModal(true)} />

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
                  <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
                    <h3 className='text-3xl font-semibold'>
                      Paga tu cita medica
                    </h3>
                    <IoIosClose className='fill-black cursor-pointer' size={40} onClick={() => setShowModal(false)} />
                  </div>
                  {/* body */}
                  <div className='relative p-6 flex-auto'>
                    <p className='my-4 text-slate-500 text-lg leading-relaxed'>
                      Le informamos que para poder acceder a los diagnósticos de su cita médica, es necesario que se realice el pago correspondiente de la consulta. El costo de la cita es un estandar establecido de $5. <br />
                      Una vez que se haya realizado el pago, podrá acceder a los resultados de su consulta a través de nuestra plataforma en línea.
                    </p>
                    {(errors.cc && errors.cc.type === 'pattern') && (
                      <div className='my-5'>
                        <span className='bg-red-500 text-white py-2 px-5 rounded-md'>Error al validar los datos</span>
                      </div>
                    )}

                    <form className='bg-white rounded' onSubmit={handleSubmit(successSubmit)}>
                      <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                          Ingrese su tarjeta de credito:
                        </label>
                        <input className='border-gray-300  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='name' type='text' placeholder='5368759186501199' {...register('cc', { required: true, pattern: MASTERCARD_REG })} />
                      </div>

                      <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
                          CVV/CVC
                        </label>
                        <input
                          className='border-gray-300  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='specie' type='text' placeholder='985' {...register('cvv', { required: true })}
                        />
                      </div>

                      <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
                          Fecha de vencimiento
                        </label>
                        <input type='date' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' placeholder='' {...register('fecha', { required: true })} />

                      </div>
                      <div className='flex items-center gap-4'>
                        {isSubmit
                          ? (
                            <TailSpin
                              height='40'
                              width='40'
                              color='#3B0DF6'
                              ariaLabel='tail-spin-loading'
                              radius='5'
                              wrapperStyle={{}}
                              wrapperClass=''
                              visible
                            />
                            )
                          : (
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>
                              Pagar
                            </button>
                            )}
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
