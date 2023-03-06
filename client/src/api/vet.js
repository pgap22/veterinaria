import axiosClient from '../config/axiosClient'

const token = window.localStorage.getItem('token')

const configHeaders = {
  headers: {
    Authorization: `Bearer ${token}`
  }
}

export const finishAppointement = (id) => {
 
  return axiosClient.get(`/citas/finalizar/${id}`, configHeaders)
}

export const getActiveAppointement = async() => {
  const token = window.localStorage.getItem('token')

  const configHeaders = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const {data} = await axiosClient.get('/citas/activos', configHeaders)

  return data;
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
  return axiosClient.put(`/diagnosticos/${data.idCita}`, data, configHeaders)
}

export const deleteDiagnosticAxios = async (data) => {
  const token = window.localStorage.getItem('token')

  const configHeaders = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }


  return axiosClient.delete(`/diagnosticos/${data}`, configHeaders)
}

export const getDiagnosticAxios = async (data) => {
  const token = window.localStorage.getItem('token')

  const configHeaders = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const {data:DataDiagnostic} = await axiosClient.get('/citas/'+data, configHeaders)
  return DataDiagnostic
}

export const obtenerCitas = async()=>{
  const {data} = await axiosClient.get("/citas/veterinario",configHeaders)
  return data
}

export const obtenerCitasUsuario = async(id)=>{
  const {data} = await axiosClient.get("/citas/usuario/"+id,configHeaders)
  return data
}