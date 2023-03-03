import { Link } from 'react-router-dom'
import { MdPets, MdViewAgenda } from 'react-icons/md'

const CardFeatures = ({ icon, feature, text, path }) => {
  return (
    <div className='bg-[#d4d4db] flex flex-col gap-7 p-3 rounded-xl lg:w-96 w-auto justify-between'>
      <div className='flex gap-4'>
        {icon}
        <p>{feature}</p>
      </div>
      <p>{text}</p>
      <div className='h-auto flex'>
        <Link to={path} className='bg-white w-2/5 flex justify-center h-10 items-center rounded-md shadow-sm'><p>Ir</p></Link>
      </div>

    </div>

  )
}

export const Home = () => {
  return (
    <>
      <section className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
        <h2 className='font-bold text-3xl my-6'>Features</h2>
        <div className=' w-full h-auto flex justify-start gap-3 lg:flex-row flex-col '>
          <CardFeatures path='/pets' icon={<MdPets size={30} />} feature='Gestionar Mascotas' text='Agreaga a tus mascotas para llevar un mejor control' />
          <CardFeatures path='/appointments' icon={<MdViewAgenda size={30} />} feature='Solicita tus citas' text='Agenda tus citas' />
        </div>
      </section>
    </>
  )
}
