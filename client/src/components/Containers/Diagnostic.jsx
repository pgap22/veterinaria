import { PetCard } from '../Cards/PetCard'
import { VetCard } from '../Cards/VetCard'
import { IoReturnUpBack } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { PATHS_DUENO } from '../../constants/routes'

export const DiagnosticContainer = () => {
  return (
    <>
      <div className='w-4/5 mx-auto flex mt-5 gap-20 mb-8 '>
        <div className='flex items-start flex-col gap-4'>
          <div className='flex justify-between w-full'>
            <h1 className='text-4xl font-bold uppercase'>Diagnostico</h1>
            <Link to={PATHS_DUENO[1].path}>
              <IoReturnUpBack size={40} />
            </Link>
          </div>

          <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-2'>
              <h1 className='text-2xl font-normal uppercase'>Descripcion</h1>
              <p className='text-base text-justify'>
                Después de examinar a su mascota, el veterinario ha determinado que tiene una fractura en una de sus piernas. La fractura probablemente se debió a un traumatismo agudo, como una caída o un accidente.
              </p>
            </div>
            <div className='flex flex-col gap-2'>
              <h1 className='text-2xl font-normal uppercase'>Recomendaciones</h1>
              <p className='text-base text-justify'>
                El veterinario puede recomendar un tratamiento conservador o una cirugía, dependiendo de la gravedad y ubicación de la fractura. Si se requiere una cirugía, su mascota será anestesiada y se colocará una placa y tornillos para estabilizar el hueso fracturado. Después de la cirugía, su mascota necesitará un período de recuperación que incluirá inmovilización y limitación de la actividad física. <br /> <br />
                Si se recomienda un tratamiento conservador, se puede colocar una férula o un yeso en la pierna fracturada para mantenerla en su lugar mientras se cura. También se pueden recetar analgésicos para el dolor y antiinflamatorios para reducir la inflamación. Es importante limitar la actividad física de su mascota mientras se cura la fractura.
              </p>
            </div>

          </div>
        </div>

        <div className='flex flex-row sm:flex-col justify-between gap-2'>
          <VetCard />
          <PetCard
            page={false} pet={{
              id: 19,
              nombre: 'Manchitas',
              especie: 'Canina',
              raza: 'Chigugua',
              genero: false,
              edad: '18',
              id_dueno: 3
            }}
          />
        </div>

      </div>
    </>
  )
}
