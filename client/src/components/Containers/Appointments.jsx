// import { MdPets } from 'react-icons/md'
import { RequestAppointments } from '../Modals/RequestAppointments.jsx'
import { FiArrowRight } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import axiosClient from '../../config/axiosClient.js'
import useSWR from 'swr'

import { useState } from 'react'

import { ModalPagoCita } from '../Modals/ModalPagoCita.jsx'

const estadosCitas = [
  {
    id: 'pendiente',
    bg: 'bg-orange-600',
    name: 'Pendientes'
  },
  {
    id: 'activo',
    bg: 'bg-green-600',
    name: 'Activas'
  },
  {
    id: 'pagoPendiente',
    bg: 'bg-yellow-600',
    name: 'Pago pendientes'
  },
  {
    id: 'finalizada',
    bg: 'bg-blue-600',
    name: 'Finalizadas'
  }
]

const filterEstados = (estado) => {
  return estadosCitas.filter((x) => {
    return x.id === estado
  })[0]
}

const STYLES_BUTTONS_STATE = 'font-medium cursor-pointer px-3 py-2 border rounded-xl hover:text-white text-black hover:bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500'
const STYLES_BUTTONS_STATE_ACTIVE = 'font-medium pointer-events-none px-3 py-2 border rounded-xl text-white text-black bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500'

const fetcher = async () => {
  const token = window.localStorage.getItem('token')

  const configHeaders = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axiosClient.get('/citas', configHeaders)
  return data
}

const Appointment = ({ data }) => {
  const navigate = useNavigate()
  return (
    <div className='container'>
      <div className='flex flex-wrap'>
        <div className='w-full'>
          <div className='flex-col p-5 flex gap-3 md:px-7 xl:px-6 rounded-[20px] bg-white border mb-3 cursor-pointer'>
            <div className='flex items-center justify-start'>
              <h4 className='font-bold text-2xl text-dark'>
                {data.motivo}
              </h4>
            </div>
            <div className='flex w-full justify-start gap-4 items-center'>
              <p className='px-3 py-1 bg-[#a3afb8] rounded-lg font-medium text-white'>{data.mascota.especie}</p>
              <p className={'text-white px-3 py-1 font-medium rounded-lg ' + filterEstados(data.estado).bg}>{filterEstados(data.estado).name}</p>
            </div>

          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-2xl font-bold text-[#303030]'>{data.mascota.nombre}</p>
            <div className='flex w-full justify-between items-center mt-4'>
              <p className='opacity-60 '>Age - {data.mascota.edad} meses</p>
              {data.estado !== 'pendiente' && <p className='opacity-60 '>Date - {data.fecha.split('T')[0]}</p>}

              {data.estado === 'finalizada' && (
                <div className='bg-gray-200 p-2 rounded-full group hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 cursor-pointer' onClick={() => navigate(`/appointments/diagnostic/${data.id}`)}>
                  <FiArrowRight size={25} className='stroke-[#7b7b7b] group-hover:stroke-white' />
                </div>)}

              {data.estado === 'pagoPendiente' && (
                <div className='bg-gray-200 p-2 rounded-full group hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 cursor-pointer'>
                  <ModalPagoCita id={data.id} />
                </div>)}

            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export const CitasContainer = () => {
  const [estado, setEstado] = useState('pendiente')

  const { data: appointments, error, isLoading } = useSWR('/citas', fetcher)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  const appointmentsFilterByState = () => {
    return appointments.filter((x) => {
      return x.estado === estado
    })
  }

  const AppointmentMapped = ({ data }) => {
    if (!data.length) return <h1>No hay citas</h1>
    return data.map((appointment, i) => {
      return <Appointment key={i} data={appointment} />
    })
  }

  return (
    <section className='mx-auto w-4/5 flex flex-col'>
      <div className=' w-full flex justify-start items-start'>
        <h2 className='font-bold text-3xl my-6'>Resumen de todas las citas agendadas</h2>
        {/* <RequestAppointments /> */}
      </div>
      <div className='flex flex-col justify-between items-center w-full pb-8 sm:flex-row'>
        <div className='flex w-auto flex-col justify-center items-center gap-6 mb-3 sm:flex-row'>
          {estadosCitas.map((x, i) => {
            return <div key={i} onClick={() => setEstado(x.id)} className={x.id === estado ? STYLES_BUTTONS_STATE_ACTIVE : STYLES_BUTTONS_STATE}>{x.name}</div>
          })}
        </div>
        <RequestAppointments />
      </div>

      <div className=' gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full h-auto mb-5'>
        {!appointments.length ? (<><h1>NO HAY CITAS</h1></>) : <AppointmentMapped data={appointmentsFilterByState()} />}
      </div>

    </section>
  )
}
