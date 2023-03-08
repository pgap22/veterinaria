import { create } from "zustand";

const useDiagnostico = create((set)=>({
    diagnostico: [],
    setDiagnostico: (diagnostico)=>set({diagnostico})
}))

export default useDiagnostico