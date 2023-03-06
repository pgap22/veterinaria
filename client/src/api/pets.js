import axiosClient from '../config/axiosClient'

export const fetcherPets = async () => {
  const token = window.localStorage.getItem('token')

  const configHeaders = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axiosClient.get('/mascotas', configHeaders)
}
