import { ResolveDiagnotic } from '../Modals/Diagnostic'
const xd = 'activa'
const STYLE_BG_TAGS = {
  pendiente: 'bg-orange-600 ',
  activa: 'bg-green-400',
  finalizada: 'bg-gray-400'
}

const Appointment = () => {
  return (
    <div className='container'>
      <div className='flex flex-wrap'>
        <div className='w-full cursor-pointer'>
          <div className='flex-col p-5 flex gap-3 md:px-7 xl:px-6 rounded-[20px] bg-white border mb-3 cursor-pointer'>
            <div className='flex items-center justify-start'>
              <h4 className='font-bold text-2xl text-dark'>
                Mi perro tiene cancer
              </h4>
            </div>
            <div className='flex w-full justify-start gap-4 items-center'>
              <p className='px-3 py-1 bg-[#a3afb8] rounded-lg font-medium text-white'>Canino</p>
              <p className={'text-white px-3 py-1 font-medium rounded-lg capitalize ' + STYLE_BG_TAGS[xd]}>{xd}</p>
            </div>

            <p className='text-body-color'>
              Mi perro se encuentra muy mal de salud recientemente le hemos diagnosticado cancer terminal, necesitamos dormirlo lo mas pronto
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-2xl font-bold text-[#303030]'>Labrador Retriever</p>
            <div className='flex w-full justify-between items-center'>
              <p className='opacity-60 '>Age - 18 meses</p>
              <p className='opacity-60 '>Date - 25/03/2023</p>
              <ResolveDiagnotic />

            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export const VetContainer = () => {
  return (
    <section className='mx-auto w-4/5 flex flex-col'>
      <div className=' w-full flex justify-start items-start'>
        <h2 className='font-bold text-3xl my-6'>Active appointments</h2>
      </div>

      <div className=' gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full h-auto mb-5'>
        <Appointment />
        <Appointment />
        <Appointment />

      </div>

    </section>
  )
}
