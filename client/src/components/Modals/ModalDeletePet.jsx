import { IoIosClose } from 'react-icons/io'
export const ModalDeletePet = () => {
  return (
    <>
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
                  Eliminar mascota
                </h3>
                <IoIosClose className='fill-black cursor-pointer' size={40} />
              </div>
              {/* body */}
              <div className='relative p-6 flex-auto'>
                <p className='my-4 text-slate-500 text-lg leading-relaxed'>
                  Are you sure that you what to delete this pet?.
                  If this pet has a appointment  before you can't delete this pet
                </p>
              </div>
              {/* footer */}
              <div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
                <button
                  className='text-blue-500 hover:text-blue-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                  type='button'
                >
                  Close
                </button>
                <button
                  className='bg-red-500  text-white hover:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                  type='button'
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='opacity-25 fixed inset-0 z-40 bg-black' />
      </>
    </>
  )
}
