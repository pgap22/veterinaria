import axiosClient from '../config/axiosClient'

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
