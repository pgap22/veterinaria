import { RxAvatar } from 'react-icons/rx'

export const VetCard = ({ vet }) => {
  return (
    <>
      <div className='flex flex-col justify-center items-center h-auto'>
        <div className='relative flex flex-col items-center rounded-[20px] w-[300px] mx-auto p-4 bg-white bg-clip-border shadow-xl'>

          <div className='relative flex h-32 w-full justify-center rounded-xl bg-cover'>
            <img src='https://fondosmil.com/fondo/455.png' className='absolute flex h-32 w-full justify-center rounded-xl bg-cover' />
            <div className='absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-white'>
              <RxAvatar size={75} className='full w-10/12' />
            </div>
          </div>
          <div className='mt-11 flex flex-col items-center'>
            <h4 className='text-xl font-bold text-black'>
              {vet.nombre}
            </h4>
            <p className='text-base font-normal text-gray-600'>Speciality - {vet.especialidad}</p>
          </div>
        </div>
      </div>
    </>
  )
}
