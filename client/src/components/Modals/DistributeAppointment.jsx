import { useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { FiArrowRight } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import useSWR, { mutate } from "swr";
import { asignarCitaVeterinario, obtenerVeterinarios } from '../../api/secy';


export const DistributeAppointment = ({ id }) => {

  const { register, handleSubmit } = useForm();
  
  const {data:veterinarios} = useSWR("/veterinarios", obtenerVeterinarios);


  const succesSubmit = async (data) => {
    mutate("/citas/pendientes", async ()=>{
      await asignarCitaVeterinario({
        ...data,
        id
      })
    })
  }

  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className='bg-gray-200 p-2 rounded-full group hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500' onClick={() => setShowModal(true)}>
        <FiArrowRight size={25} className='stroke-[#7b7b7b] group-hover:stroke-white' />
      </div>
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
                      Assign the appointment
                    </h3>
                    <IoIosClose className='fill-black cursor-pointer' size={40} onClick={() => setShowModal(false)} />
                  </div>
                  {/* body */}
                  <div className='relative p-6 flex-auto'>
                    <form className='bg-white rounded' onSubmit={handleSubmit(succesSubmit)}>
                      
                      
                      <div className='mb-4'>
                        <label htmlFor='gender' className='block text-gray-700 text-sm font-bold mb-2'>Select vet to assing the appointment </label>
                        <select id='gender' className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' {...register('idVeterinario', { required: true })}>
                        {
                          veterinarios.map(veterinario => (
                            <option key={veterinario.id} value={veterinario.id}>{veterinario.nombre}</option>
                          ))
                        }
                        </select>
                      </div>



                      <div className='relative max-w-sm mb-3'>
                        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                          <svg aria-hidden='true' className='w-5 h-5 text-gray-500 dark:text-gray-400' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z' clipRule='evenodd' /></svg>
                        </div>
                        <input type='date' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5' placeholder='Select date' {...register('fecha', { required: true })} />
                      </div>

                      <div className='flex items-center gap-4'>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>
                          Assign appointment
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
          </>
          )
        : null}
    </>
  )
}
