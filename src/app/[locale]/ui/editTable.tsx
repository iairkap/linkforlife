import React, { useState } from 'react';
import Modal from './modal';
import table from "../../../../public/table.svg"
import InputField from './InputField';
import { InputsData } from '@/app/handlers/editTableInputsData';
import { handleClickEditTable } from '@/app/handlers/addTable';
import { useTableData } from '../helpers/useTableData';
interface AddTableProps {
    isOpen: boolean;
    contentLabel: string;
    onRequestClose: () => void;
    tableID?: number | null;
}

function EditTable({ isOpen, contentLabel, onRequestClose, tableID }: AddTableProps) {
    const iconElement = <img src={table.src} height={table.height} width={table.width} style={{ filter: `blur(${table.blurWidth}px ${table.blurHeight}px)` }} />

    const [numberChairs, setNumberChairs] = useState<number | null>(null)
    const [tableName, setTableName] = useState<string>("")

    const stateSetters: { [key: string]: React.Dispatch<React.SetStateAction<string | number | null>> } = {
        numberChairs: setNumberChairs as React.Dispatch<React.SetStateAction<string | number | null>>,
        tableName: setTableName as React.Dispatch<React.SetStateAction<string | number | null>>,
    }

    const { fetchData } = useTableData(); // Use useTableData to get fetchData



    return (
        <Modal isOpen={isOpen} contentLabel={contentLabel} onRequestClose={onRequestClose} icon={iconElement}>
            <section className='containerModalInvitationWedding'>
                <h1 className='title-container'>
                    Modificar Mesa
                </h1>
                {InputsData.map((inputData, index) => (
                    <div key={index}>
                        <span>{inputData.span}</span>
                        <InputField
                            type={inputData.inputField.type}
                            placeholder={inputData.inputField.placeholder}
                            name={inputData.inputField.name}
                            value={inputData.inputField.name === 'numberChairs' ? numberChairs : tableName}
                            onChange={(e) => {
                                const value = inputData.inputField.name === 'numberChairs' ? Number(e.target.value) : e.target.value;
                                stateSetters[inputData.inputField.name as 'numberChairs' | 'tableName'](value);
                            }}
                        />
                    </div>
                ))}
                <button className='button-a' onClick={async () => {
                    if (tableID == null) {
                        // Show an error message or return early
                        console.error('tableID is null or undefined');
                        return;
                    }
                    await handleClickEditTable(numberChairs, tableID, onRequestClose, tableName);
                    fetchData();
                }}>Save</button>

            </section>
        </Modal>
    );
}

export default EditTable;