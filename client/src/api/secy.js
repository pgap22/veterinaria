import axios from 'axios'
import axiosClient from '../config/axiosClient'

const token = window.localStorage.getItem('token')

const configHeaders = {
  headers: {
    Authorization: `Bearer ${token}`
  }
}

export const fetcherAppointmentsPendientes = async () => {
  const token = window.localStorage.getItem('token')

  const configHeaders = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axiosClient.get('/citas/pendientes', configHeaders)
  return data
}

export const fetcherPetSecy = (id) => {
  const token = window.localStorage.getItem('token')

  const configHeaders = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axiosClient.get(`/mascotas/${id}`, configHeaders)
}

export const obtenerVeterinarios = async () => {
  const {data} = await axiosClient.get('/veterinarios', configHeaders)
  return data;
}

export const asignarCitaVeterinario = async (data) => {
  const payload = {
    idVeterinario: parseInt(data.idVeterinario),
    fecha: new Date(data.fecha)
  }


  return axiosClient.put(`/citas/aceptar/${data.id}`, payload, configHeaders)
}