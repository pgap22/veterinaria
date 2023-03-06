import { create } from 'zustand'

export const useCitaVet = create((set) => ({
  cita: {},
  modalDiagnostico: false,
  modalFinalizar: false,

  setCita: (cita) => {
    set({ cita })
  },
  setModalDiagnostico: (bool) => {
    set({ modalDiagnostico: bool })
  },
  setModalFinalizar: (bool) => {
    set({ modalFinalizar: bool })
  },
}))
