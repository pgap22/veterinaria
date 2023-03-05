import { useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { FiArrowRight } from 'react-icons/fi'

export const DistributeAppointment = () => {
  // To edit i will need to verify the edit prop to get the pet by id which is a prop to
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
                    <form className='bg-white rounded'>
                      <div className='mb-4'>
                        <label htmlFor='gender' className='block text-gray-700 text-sm font-bold mb-2'>Select vet to assing the appointment </label>
                        <select id='gender' className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'>
                          <option value={0}>Pedrito Jimenez</option>
                          <option value={1}>Leandro Pineda</option>
                          <option value={2}>Sofia Quinteros</option>
                        </select>
                      </div>
                      <div className='flex items-center gap-4'>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='button'>
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
