
import { MdPets } from 'react-icons/md'
import { ModalPets } from './ModalPets'
const PetCard = () => {
  return (
    <>
      <div className='flex items-center justify-center'>
        <div className='flex flex-col items-center justify-center relative'>

          <div
            id='partnerCard'
            className=' bg-white shadow-lg rounded-lg text-black overflow-hidden max-w-sm p-2 h-auto flex flex-col'
          >
            <div>
              <h3 className='text-left pl-8 pb-4 pt-2 text-xl'>
                Pet's name: Aristides
              </h3>
            </div>

            <div className='flex items-center justify-center min-h-[200px]'>
              <MdPets size={70} />

              {/* <img
                src='https://cdn-icons-png.flaticon.com/512/1326/1326382.png'
                alt='EasyCode'
                className='w-1/2 object-cover'
              /> */}

            </div>
            <div className='grid grid-cols-4'>
              <div className='p-4 pr-0 text-lg col-span-3'>
                <h4 className='font-bold'>
                  Details
                </h4>
                <p>Specie: Canino</p>
                <p>Race: Chiguagua</p>
                <p>Gender: Male</p>
              </div>
              <div className='col-span-1 pt-4'>
                <div className='w-20 h-20 mt-auto ml-auto flex flex-col items-center justify-center text-center border rounded-full'>
                  <p className='text-semibold text-xl'>
                    {Math.floor(Math.random() * 10)} <br /> Age
                  </p>
                </div>

              </div>
            </div>
            <div className='flex w-full justify-evenly'>
              <button className=' bg-blue-500 rounded-md py-2 px-8'>Editar</button>
              <button className=' bg-red-500 rounded-md py-2 px-8'>Eliminar</button>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export const PetsContainer = () => {
  return (
    <section className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 pb-8'>
      <div className=' w-full flex justify-between items-center'>
        <h2 className='font-bold text-3xl my-6'>Tus Mascotas</h2>
        <ModalPets />
      </div>

      <div className=' gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full h-auto'>
        <PetCard />
        <PetCard />
        <PetCard />
        <PetCard />
        <PetCard />
      </div>

    </section>
  )
}
