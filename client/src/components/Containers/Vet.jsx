import { AddDiagnostic } from '../Modals/Diagnostic'
import { ResolveDiagnostic } from '../Modals/resolveDiagnostic'
import { FiArrowRight } from 'react-icons/fi'
import { getActiveAppointement } from '../../api/vet'
import useSWR from 'swr'

const Appointment = ({ data }) => {
  return (
    <div className='container'>
      <div className='flex flex-wrap'>
        <div className='w-full cursor-pointer'>
          <div className='flex-col p-5 flex gap-3 md:px-7 xl:px-6 rounded-[20px] bg-white border mb-3 cursor-pointer'>
            <div className='flex items-center justify-start'>
              <h4 className='font-bold text-2xl text-dark'>
                {data.motivo}
              </h4>
            </div>
            <div className='flex w-full justify-start gap-4 items-start flex-col '>
              <div className='flex gap-2'>
                <p className='px-3 py-1 bg-[#a3afb8] rounded-lg font-medium text-white'>{data.mascota.especie}</p>
                <p className='text-white px-3 py-1 font-medium rounded-lg capitalize bg-green-400'>Activa</p>
              </div>
              <div className='flex gap-2 h-auto'>
                <ResolveDiagnostic id={data.id} />
                <AddDiagnostic />
              </div>

            </div>

          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-2xl font-bold text-[#303030]'>{data.mascota.raza}</p>
            <div className='flex w-full justify-between items-center'>
              <p className='opacity-60 '>Age - {data.mascota.edad}meses</p>
              <p className='opacity-60 '>Date - 25/03/2023</p>
              <div className='bg-gray-200 p-2 rounded-full group hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500'>
                <FiArrowRight size={25} className='stroke-[#7b7b7b] group-hover:stroke-white' />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export const VetContainer = () => {
  const { data, error, isLoading } = useSWR('/citas/activos', getActiveAppointement)
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  const appointments = data.data

  const prinAppointment = () => {
    return appointments.map((appointment, i) => {
      return <Appointment key={i} data={appointment} />
    })
  }

  return (
    <section className='mx-auto w-4/5 flex flex-col'>
      <div className=' w-full flex justify-start items-start'>
        <h2 className='font-bold text-3xl my-6'>Active appointments</h2>
      </div>

      <div className=' gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full h-auto mb-5'>
        {!appointments.length ? (<><h1>NO HAY CITAS ACTIVAS</h1></>) : prinAppointment()}

      </div>

    </section>
  )
}
