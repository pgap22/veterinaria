import axiosClient from "../config/axiosClient";

export async function authUser(usuario) {
  const { data } = await axiosClient.post("/usuarios/login", usuario);
  return data;
}

export async function registerUser(usuario) {
  const { data } = await axiosClient.post("/usuarios", usuario);
  return data;
}

export async function getUser() {
  const token = window.localStorage.getItem("token");

  const configHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axiosClient.get("/usuarios/perfil", configHeaders);

  return data;
}
