import { useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { AddDiagnosticAxios } from '../../api/vet'
import { mutate } from 'swr'
import { useForm } from 'react-hook-form'

export const AddDiagnostic = ({ id }) => {
  const [showModal, setShowModal] = useState(false)
  const { register, handleSubmit } = useForm()

  const sucessSubmit = async (data) => {
    mutate('/citas/activos', async () => {
      await AddDiagnosticAxios({
        ...data,
        idCita: id
      })
    })
  }

  return (
    <>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='button' onClick={() => setShowModal(true)}>
        Add diagnostic
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
                      Add diagnostic to the appointment
                    </h3>
                    <IoIosClose className='fill-black cursor-pointer' size={40} onClick={() => setShowModal(false)} />
                  </div>
                  {/* body */}
                  <div className='relative p-6 flex-auto'>
                    <form className='bg-white rounded' onClick={handleSubmit(sucessSubmit)}>
                      <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>Descripcion:</label>
                        <textarea id='message' rows='4' className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300' placeholder='Write your descripcion' {...register('descripcion', { required: true })} />
                      </div>

                      <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>Recomendations:</label>
                        <textarea id='message' rows='4' className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300' placeholder='Write your recomendations' {...register('recomendaciones', { required: true })} />
                      </div>

                      <div className='flex items-center gap-4'>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>
                          Add diagnostic
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
