import axiosClient from '../config/axiosClient'

export const finishAppointement = (id) => {
  const token = window.localStorage.getItem('token')

  const configHeaders = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axiosClient.get(`/citas/finalizar/${id}`, configHeaders)
}

export const getActiveAppointement = () => {
  const token = window.localStorage.getItem('token')

  const configHeaders = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axiosClient.get('/citas/activos', configHeaders)
}
