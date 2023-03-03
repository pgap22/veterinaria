import { MdPets } from 'react-icons/md'
import { RequestAppointments } from '../Modals/RequestAppointments.jsx'
export const Cita = () => {
  return (
    <div className='container'>
      <div className='flex flex-wrap'>
        <div className='w-full cursor-pointer'>
          <div className='flex-col p-5 flex gap-3 md:px-7 xl:px-6 rounded-[20px] bg-white shadow-md hover:shadow-lg mb-8 cursor-pointer'>
            <MdPets size={40} />
            <h4 className='font-bold text-xl text-dark mb-3'>
              Nombre de la cita
            </h4>
            <p className='text-body-color'>
              We dejoy working with discerning clients, people for whom
              qualuty, service, integrity & aesthetics.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const CitasContainer = () => {
  return (
    <section className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
      <div className=' w-full flex justify-between items-center'>
        <h2 className='font-bold text-3xl my-6'>Tus citas</h2>
        <RequestAppointments />
      </div>

      <div className=' gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full h-auto'>
        <Cita />
        <Cita />
        <Cita />
        <Cita />
        <Cita />
      </div>

    </section>
  )
}
