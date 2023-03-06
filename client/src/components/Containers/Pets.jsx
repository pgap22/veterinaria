
import { AddPetsForm } from '../Modals/AddPetsForm'
import { ModalEditPets } from '../Modals/ModalEditPets'
import { ModalDeleteItem } from '../Modals/ModalDeleteItem'
import useSWR from 'swr'
import { fetcherPets } from '../../api/pets'

import { PetCard } from '../Cards/PetCard'

import { usePetEdit, usePetDelete, usePets } from '../../store/usePet'
import { shallow } from 'zustand/shallow'

export const PetsContainer = () => {
  const isOpenEdit = usePetEdit((state) => state.Open, shallow)
  const isOpenDelete = usePetDelete((state) => state.Open, shallow)
  const mascotas = usePets((state) => state.pets, shallow)


  const PrintPets = () => {
    return mascotas.map((pet, i) => {
      return <PetCard key={i} pet={pet} page />
    })
  }

  return (
    <section className='mx-auto max-w-screen-xl px-4 '>
      <div className=' w-full flex justify-between items-center'>
        <h2 className='font-bold text-3xl my-6'>Tus Mascotas</h2>
        <AddPetsForm />
      </div>

      <div className=' gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-c xl:grid-cols-4 w-full h-auto mx-auto mb-5'>

        {!mascotas.length ? (<><h1>NO HAY MASCOTAS</h1></>) : <PrintPets />}

        {isOpenEdit ? <ModalEditPets /> : null}
        {isOpenDelete ? <ModalDeleteItem /> : null}
      </div>

    </section>
  )
}
