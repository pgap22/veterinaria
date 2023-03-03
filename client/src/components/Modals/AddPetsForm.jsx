import { useState } from 'react'
import { IoIosClose } from 'react-icons/io'

export const AddPetsForm = () => {
  // To edit i will need to verify the edit prop to get the pet by id which is a prop to
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <button
        className='block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring'
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

                    <form className='bg-white rounded'>
                      <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                          Name:
                        </label>
                        <input className='border-gray-300  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='name' type='text' placeholder='Aristides' />
                      </div>

                      <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
                          Specie:
                        </label>
                        <input className='border-gray-300  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='specie' type='text' placeholder='caninus' />
                      </div>

                      <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
                          Race:
                        </label>
                        <input className='border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='race' type='text' placeholder='Dalmata' />
                      </div>

                      <div className='mb-4'>
                        <label htmlFor='gender' className='block text-gray-700 text-sm font-bold mb-2'>Select pet's gender</label>
                        <select id='gender' className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'>
                          <option defaultValue='' disabled />
                          <option value>Male</option>
                          <option value={false}>Female</option>
                        </select>
                      </div>

                      <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
                          Age:
                        </label>
                        <input className='border-gray-300  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='age' type='number' placeholder='8' />
                      </div>

                      <div className='flex items-center gap-4'>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='button'>
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
          </>
          )

        : null}
    </>
  )
}
