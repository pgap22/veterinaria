import { useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { finishAppointement } from '../../api/vet'
import { mutate } from 'swr'

export const ResolveDiagnostic = ({ id }) => {
  const [showModal, setShowModal] = useState(false)

  const handleClick = async () => {
    mutate('/citas/activos', async () => {
      await finishAppointement(id)
      setShowModal(false)
    })
  }

  return (
    <>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='button' onClick={() => setShowModal(true)}>
        Resolve
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
                      Resolve the appointment
                    </h3>
                    <IoIosClose className='fill-black cursor-pointer' size={40} onClick={() => setShowModal(false)} />
                  </div>
                  {/* body */}
                  <div className='p-6 flex gap-5 flex-col'>
                    <p>Resolve all the diagnostics for this appointment</p>
                    <div>
                      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='button' onClick={() => handleClick()}>
                        Resolve appointment
                      </button>
                      <button className=' hover:text-blue-800 text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={() => setShowModal(false)}>
                        Close
                      </button>
                    </div>

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
