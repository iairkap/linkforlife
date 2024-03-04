import create from "zustand"

const useTableStore = create(set => ({
    data: [],
    setData: (data: any) => set(() => ({ data })),
}))
