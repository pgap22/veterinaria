import {create} from "zustand"
const useVeterinario = create((set)=>({
    veterinarios: [],
    setVeterinarios: (veterinarios)=> set({veterinarios})
}))

export  {
    useVeterinario
}