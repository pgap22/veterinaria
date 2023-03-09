import { PetCard } from '../Cards/PetCard'
import { VetCard } from '../Cards/VetCard'
import { Link, useParams } from 'react-router-dom'
import { PATHS_DUENO } from '../../constants/routes'
import { IoReturnUpBack } from 'react-icons/io5'
import { obtenerCitasUsuario } from '../../api/vet'
import useSWR from 'swr'

export const DiagnosticContainer = () => {
  const { id } = useParams()

  const { data: citas, error, isLoading } = useSWR(['/diagnosticos', id], obtenerCitasUsuario)
  console.log(citas)
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <>
      <div className='w-4/5 mx-auto flex mt-5 gap-20 mb-8 flex-col md:flex-row'>
        <div className='w-full flex items-start flex-col gap-4'>
          <div className='w-full mx-auto mt-5 flex flex-col gap-5'>
            <div className='flex justify-between w-full'>
              <h1 className='text-4xl font-bold uppercase'>Diagnostico</h1>
              <Link to={PATHS_DUENO[1].path}>
                <IoReturnUpBack size={40} />
              </Link>
            </div>
            {!citas.diagnostico.length
              ? (
                <>
                  <h1>NO HAY DIAGNOSTICOS</h1>
                </>
                )
              : (
                  citas.diagnostico.map((diagnostic, i) => {
                    return <Card key={i} data={diagnostic} />
                  })
                )}
          </div>
        </div>

        <div className=' flex sm:flex-col justify-between gap-2 flex-col'>
          <VetCard vet={citas.veterinario} />
          <PetCard
            page={false}
            pet={citas.mascota}
          />
        </div>
      </div>
    </>
  )
}

const Card = ({ data }) => {
  return (
    <>
      <div className='w-full flex flex-col p-4 h-auto shadow-lg gap-5 rounded-lg max-w-3xl'>
        <div className='flex flex-col gap-5'>
          <div>
            <p className=' text-xl font-bold'>Descricpion:</p>
            <p className='text-base font-normal text-justify break-words'>
              {data.descripcion}
            </p>
          </div>

          <div>
            <p className=' text-xl font-bold'>Recomendaciones:</p>
            <p className='text-base font-normal text-justify break-words'>
              {data.recomendaciones}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
