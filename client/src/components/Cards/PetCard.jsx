import { useState } from 'react'
import { DropdownComponent } from '../Menus/DropDown'
import { MdPets } from 'react-icons/md'
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs'

export const PetCard = ({ page, pet }) => {
  const [gender] = useState(pet.genero)
  return (
    <>
      <div className='flex flex-col justify-center items-center h-auto'>
        <div className='relative flex flex-col items-center rounded-[20px] w-[300px] mx-auto p-4 bg-white bg-clip-border shadow-xl'>

          <div className='relative flex h-32 w-full justify-center rounded-xl bg-cover'>
            {page ? <DropdownComponent id={pet.id} /> : null}

            <img src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwcHBw0HBwcHBwcHBw0HBwcHBw8ICQcNFREWFhURExMYKCggGBoxJxUfITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0NDw0PDysZFRk3LTc3LTcrLTcrKy03LS0rKy0rKy0tKy0rKysrKysrKystKysrKysrKystLSsrKzctLf/AABEIALcBEwMBIgACEQEDEQH/xAAaAAEBAQADAQAAAAAAAAAAAAACAQADBAUG/8QAFhABAQEAAAAAAAAAAAAAAAAAAAER/8QAGgEBAQEBAQEBAAAAAAAAAAAAAgEABQMGBP/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A9yHIkhSP1V+2UoUSHIJyrCkSFBr0lWHEkKC9JVhRIUGvSVYUSFBPShRIUYaUKDCiBThQYUQaUOBCjDThQIUQThShKUrDTlLXHq6w4eroa2o2Fo2po2s2LaNrWhahSNaNrWjaxyMw6jE+YhxIUdB+KUpCiQoNekqw4kKCcqwokKDXpKsKJCg16SrCiRYJylCiQozVYcCFEE4UCFEo04sGFEEoUCFKyUpSlCLqCeroausmFraOpqNhalqaNrLi2ja1o2sUjWha1o2oUjaw6zFj5+FEhx0XOlWFEhwacqwokKDXpKsKJCiU5VixosF6SlFiQoNOVYUGFBIosSLGQoUGLGEoUFYiFFFUQtXR1tRMPW0dbWTC1tHU1FwtS0dS1lxbRta0bWWRrQta0bUORdYNZlx40ODDjo1yZVhwYcE5VhRIUSvSVYUSFBOVYsSFEOVYsSEL0lWLEijhyrCglEVYqKiEoqyEwrqIWro62oha2jrajFqaOtrLi6lqalqLjWja1o2sUjWja1o2sUjawazFjzYcGHHScSVYcGHBwpVhRIUE5VixosTDlWFEiwcekqqyocrKywcOVlRRw5VVFRVUVRFXRZmJtHW1mLW0dbUxsXU1NTUXF1LUtS1FxbRtS0bUKRbQta0bWKRtYdZix04cGHHTfPyrDgwohSlCiRYNhyrCiQohyrFiRYOHKsWIqYcqqiicrK0YbDlZUZDlVUZCVkZGVtRNRl1tTU1lXU1NS1FW1LUtS1Fa0bWtG1Cka0bWtG1DkbWHWZXDDgwo6uPmpShRIUEpVhRIUQ5VixosTClWKhDhysrMmHKrMw4cqszIcrMzDhyszImHKrIw4crMiamKupramoq6NraNrEtqWpaNqLIto2taNqE1oWraFqE2smsy60KDDjqvlZShRIUQ5VhRIUHClWLEhIUrKyocrKijhyszMhyqyMmHKqMw4crMyJhyszIOFK2oyJhyslbU1MKVqlrUamFrWpa1G1MLWtG1rRtZdaja1o2tjayhqti65IcGFHTx8tpQ4MKIWlFjRYhSrFaKmHKrMqYUrMyicqKzJhyozMhSszIOHKyMyYcrIyIcrIyVMKVqNWjRw5WqWtRrLrWpalS1C1rRta0bUxda0LVtG1sXW1h1mxtdmHAhx0nzGlDgw4xasKJCiYWrFjRUKVlZkKVmZhw5WZmQ5UZkTClZFQcOVkZEOVkZKmHKw1ko4UrWpWo2thStalrWjamFrWja1qWpi6lo1bRtbC1KNa0bUxtZh1mxdd6HAhx0nzOnCgw4haUKDCiLqwkhNhSszMOFKzMyHKiKiYcrVGQcOVkZEKVkZKmHKw1rUqHK1StRtQpWtS1rRtTCla0bVtG1MLWtG1rRtTF1rRta0bWxda0LVtC1F1tYdZsXXoxyRmdF82cOMyKcKMyEUJmZWZmQolZmSnESownGGqyU4KVmQolFmE4lS1malBtSswnBtG1mQolG1mZRtG1mQhtG1mZRtC1mRR1WZmf/2Q==' className='absolute flex h-32 w-full justify-center rounded-xl bg-cover' />
            <div className='absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700'>
              <MdPets size={50} className='full w-10/12 fill-white' />
            </div>
          </div>
          <div className='mt-16 flex flex-col items-center'>
            <h4 className='text-xl font-bold text-black'>
              {pet.nombre}
            </h4>
            <p className='text-base font-normal text-gray-600'>{pet.especie} - {pet.raza}</p>

          </div>

          <div className='mt-6 mb-3 flex gap-14 md:!gap-14'>
            <div className='flex flex-col items-center justify-center gap-3'>
              {gender ? (<BsGenderMale size={30} className='fill-black' />) : (<BsGenderFemale size={30} className='fill-black' />)}

              <p className='text-sm font-normal text-gray-600'>Genero</p>
            </div>
            <div className='flex flex-col items-center justify-center gap-3'>
              <p className='text-2xl font-bold text-black '>
                {pet.edad}
              </p>
              <p className='text-sm font-normal text-gray-600'>Edad/meses</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
