import axios from "axios"

interface AddTableProps {
    numberTable: number;
    numberChairs: number;
}

export const handleClickAddTable = async (numberTable: number | null, numberChairs: number | null, onRequestClose: any): Promise<AddTableProps> => {

    const response = await axios.post<AddTableProps>('/api/tables', {
        numberTable,
        numberChairs
    })

    onRequestClose()
    return response.data

}