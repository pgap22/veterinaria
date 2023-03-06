import { create } from 'zustand'

export const useAppointment = create((set) => ({
  appointment: [],
  setAppointment: (appointment) => {
    set({ appointment })
  }

}))
