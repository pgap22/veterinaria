
import { AddPetsForm } from '../Modals/AddPetsForm'
import { ModalEditPets } from '../Modals/ModalEditPets'
import { ModalDeleteItem } from '../Modals/ModalDeleteItem'
import axiosClient from '../../config/axiosClient'
import useSWR from 'swr'

import { PetCard } from '../Cards/PetCard'

import { usePetEdit, usePetDelete, usePets } from '../../store/usePet'
import { shallow } from 'zustand/shallow'

const fetcher = async () => {
  const token = window.localStorage.getItem('token')

  const configHeaders = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axiosClient.get('/mascotas', configHeaders)
}

export const PetsContainer = () => {
  const isOpenEdit = usePetEdit((state) => state.Open, shallow)
  const isOpenDelete = usePetDelete((state) => state.Open, shallow)
  const setPets = usePets((state) => state.setPets, shallow)

  const { data, error, isLoading } = useSWR('/mascotas', fetcher)
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  const mascotas = data.data
  setPets(mascotas)

  const printPet = () => {
    return mascotas.map((pet, i) => {
      return <PetCard key={i} pet={pet} page />
    })
  }

  console.log(mascotas)

  return (
    <section className='mx-auto max-w-screen-xl px-4 '>
      <div className=' w-full flex justify-between items-center'>
        <h2 className='font-bold text-3xl my-6'>Tus Mascotas</h2>
        <AddPetsForm />
      </div>

      <div className=' gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-c xl:grid-cols-4 w-full h-auto mx-auto mb-5'>

        {!mascotas.length ? (<><h1>NO HAY MASCOTAS</h1></>) : printPet()}

        {isOpenEdit ? <ModalEditPets /> : null}
        {isOpenDelete ? <ModalDeleteItem /> : null}
      </div>

    </section>
  )
}
