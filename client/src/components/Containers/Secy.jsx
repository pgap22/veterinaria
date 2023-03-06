import { DistributeAppointment } from '../Modals/DistributeAppointment'
import useSWR from 'swr'
import { fetcherAppointmentsPendientes } from '../../api/secy'


const Appointment = ({ data }) => {

  const { mascota } = data;
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
            <div className='flex w-full justify-start gap-4 items-center'>
              <p className='px-3 py-1 bg-[#a3afb8] rounded-lg font-medium text-white'>{mascota.especie}</p>
              <p className='text-white px-3 py-1 font-medium rounded-lg capitalize bg-orange-600'>{data.estado}</p>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-2xl font-bold text-[#303030]'>{mascota.nombre}</p>
            <div className='flex w-full justify-between items-center'>
              <p className='opacity-60 '>Age - {mascota.edad} mese{mascota.edad > 1 ? 's' : ''}</p>
              <DistributeAppointment id={data.id} />

            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export const SecyContainer = () => {
  const { data: appointmentsPendientes, error, isLoading } = useSWR('/citas/pendientes', fetcherAppointmentsPendientes)
  
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <section className='mx-auto w-4/5 flex flex-col'>
      <div className=' w-full flex justify-start items-start'>
        <h2 className='font-bold text-3xl my-6'>Active appointments</h2>
      </div>

      <div className=' gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full h-auto mb-5'>

        {!appointmentsPendientes.length ? (<><h1>NO HAY CITAS PENDIENTES</h1></>) : (
          appointmentsPendientes.map((appointment, i) => {
            return <Appointment key={i} data={appointment} />
          })
        )}

      </div>

    </section>
  )
}
