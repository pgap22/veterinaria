import { createContext, useEffect } from "react";
import { shallow } from "zustand/shallow";
import { getUser } from "../api/auth";
import { useAuth } from "../store/auth";
// import { usePets } from '../store/usePet'
// import { fetcherPets } from '../api/pets'
import useSWR from "swr";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const setUser = useAuth((state) => state.setUser, shallow);
  const setLoading = useAuth((state) => state.setLoading, shallow);
  const { data, error, isLoading } = useSWR("/usuario/perfil", getUser, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateOnReconnect: false,
  });
  // const setPets = usePets((state) => state.setPets, shallow)
  // const { data } = useSWR('/mascotas', fetcherPets)
  // const mascotas = data.data

  if (isLoading) return <p>Loading...</p>;

  if (!error) {
    setUser(data);
  }

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
