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

export const AddDiagnosticAxios = async (data) => {
  const token = window.localStorage.getItem('token')

  const configHeaders = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axiosClient.post('/diagnosticos', data, configHeaders)
}

export const editDiagnosticAxios = async (data) => {
  const token = window.localStorage.getItem('token')

  const configHeaders = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axiosClient.put(`/diagnosticos/${data.id}`, data, configHeaders)
}

export const deleteDiagnosticAxios = async (data) => {
  const token = window.localStorage.getItem('token')

  const configHeaders = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axiosClient.delete(`/diagnosticos/${data.id}`, configHeaders)
}

export const getDiagnosticAxios = async (data) => {
  const token = window.localStorage.getItem('token')

  const configHeaders = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axiosClient.get('/diagnosticos', configHeaders)
}
