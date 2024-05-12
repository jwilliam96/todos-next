import { create } from "zustand"

interface Props {
    todoStateG: Todos | null
    updateStateG: (data: Todos | null) => void
}

interface Todos {
    id: string
    title: string
    description: string
}


export const todoStore = create<Props>()((set) => ({
    todoStateG: null,
    updateStateG: (data) => set(() => ({ todoStateG: data }))
}))