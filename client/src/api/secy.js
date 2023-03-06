import axios from 'axios'
import axiosClient from '../config/axiosClient'

const token = window.localStorage.getItem('token')

  const configHeaders = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

export const fetcherAppointmentsPendientes = () => {
  const token = window.localStorage.getItem('token')

  const configHeaders = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axiosClient.get('/citas/pendientes', configHeaders)
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

export const obtenerVeterinarios = async ()=>{
  return axiosClient.get('/veterinarios', configHeaders)
}

export const asignarCitaVeterinario = async (data)=> {
  console.log(data);
  const payload = {
    idVeterinario: parseInt(data.idVeterinario),
    fecha: new Date(data.fecha)
  }

  console.log(payload);

  return axiosClient.put(`/citas/aceptar/${data.id}`,payload,configHeaders)
}