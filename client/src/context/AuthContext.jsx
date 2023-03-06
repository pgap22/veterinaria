import { createContext, useEffect } from "react";
import { shallow } from "zustand/shallow";
import { getUser } from "../api/auth";
import { useAuth } from "../store/auth";
// import { usePets } from '../store/usePet'
// import { fetcherPets } from '../api/pets'
import useSWR from "swr";
import { usePets } from "../store/usePet";
import { useQuery } from "react-query";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const setUser = useAuth((state) => state.setUser, shallow);
  const setPets = usePets((state) => state.setPets, shallow)

  const {isLoading, data, error, refetch} = useQuery("user", getUser, {retry: false, refetchOnReconnect:false,refetchOnWindowFocus:false, enabled:true})

  // const setPets = usePets((state) => state.setPets, shallow)
  // const { data } = useSWR('/mascotas', fetcherPets)
  // const mascotas = data.data

  if (isLoading) return <p>Loading...</p>;

  if (!error) {
    setUser(data);
    setPets(data.mascota)
  }

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
