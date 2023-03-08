import axiosClient from "../config/axiosClient";

export const finishAppointement = (id) => {
  const token = window.localStorage.getItem("token");

  const configHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosClient.get(`/citas/finalizar/${id}`, configHeaders);
};

export const getActiveAppointement = async () => {
  const token = window.localStorage.getItem("token");

  const configHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axiosClient.get("/citas/activos", configHeaders);

  return data;
};

export const AddDiagnosticAxios = async (data) => {
  const token = window.localStorage.getItem("token");

  const configHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosClient.post("/diagnosticos", data, configHeaders);
};

export const editDiagnosticAxios = async (data) => {
  const token = window.localStorage.getItem("token");

  const configHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosClient.put(`/diagnosticos/${data.idCita}`, data, configHeaders);
};

export const deleteDiagnosticAxios = async (data) => {
  const token = window.localStorage.getItem("token");

  const configHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axiosClient.delete(`/diagnosticos/${data}`, configHeaders);
};

export const getDiagnosticAxios = async (data) => {

  const token = window.localStorage.getItem("token");

  const configHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
   ;

  return axiosClient.get("/citas/" + data[1], configHeaders).then(({data}) => data);
};

export const obtenerCitas = async () => {
  const token = window.localStorage.getItem("token");

  const configHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosClient.get("/citas/veterinario", configHeaders).then(({data})=> data);
};

export const obtenerCitasUsuario = async (id) => {
  const token = window.localStorage.getItem("token");

  const configHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
 
  return axiosClient.get("/citas/usuario/" + id, configHeaders).then(({data})=> data);
};
