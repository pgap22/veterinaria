import { create } from 'zustand'

export const usePetEdit = create((set) => ({
  Open: false,
  setOpen: (OpenValue) => {
    set({ Open: OpenValue })
  }
}))

export const usePetDelete = create((set) => ({
  Open: false,
  setOpen: (OpenValue) => {
    set({ Open: OpenValue })
  }
}))

export const usePets = create((set) => ({
  pets: [],
  selectedPet: {},
  setPets: (pets) => {
    set({ pets })
  },

  setSelectedPet: (pet) => {
    set({ selectedPet: pet })
  }
}))
