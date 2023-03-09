import { FiArrowRight } from 'react-icons/fi'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { obtenerCitas } from '../../api/vet'
const VetCitas = () => {
  const {
    data: Citas,
    isLoading,
    isError
  } = useQuery('/citas/veterinarios', obtenerCitas)

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error...</p>

  return (
    <>
      <section className='mx-auto w-4/5 flex flex-col'>
        <div className=' w-full flex justify-start items-start'>
          <h2 className='font-bold text-3xl my-6'>Selecciona una cita</h2>
        </div>
        <div className='grid gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
          {Citas.map((cita) => (
            <Appointment key={cita.id} data={cita} />
          ))}
        </div>
      </section>
    </>
  )
}

const Appointment = ({ data }) => {
  const navigate = useNavigate()

  return (
    <div className='container'>
      <div className='flex flex-wrap'>
        <div className='w-full'>
          <div className='flex-col p-5 flex gap-3 md:px-7 xl:px-6 rounded-[20px] bg-white border mb-3 cursor-pointer'>
            <div className='flex items-center justify-start'>
              <h4 className='font-bold text-2xl text-dark'>{data.motivo}</h4>
            </div>
            <div className='flex w-full justify-start gap-4 items-center'>
              <p className='px-3 py-1 bg-[#a3afb8] rounded-lg font-medium text-white'>
                {data.mascota.especie}
              </p>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-2xl font-bold text-[#303030]'>
              {data.mascota.nombre}
            </p>
            <div className='flex w-full justify-between items-center mt-4'>
              <p className='opacity-60 '>Age - {data.mascota.edad} meses</p>

              <div
                className='bg-gray-200 p-2 rounded-full group hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 cursor-pointer'
                onClick={() => navigate(`/vet/diagnostic/${data.id}`)}
              >
                <FiArrowRight
                  size={25}
                  className='stroke-[#7b7b7b] group-hover:stroke-white'
                />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default VetCitas
