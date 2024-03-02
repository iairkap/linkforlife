import React, { useState } from 'react';
import Modal from './modal';
import table from "../../../../public/table.svg"
import InputField from './InputField';
import { InputsData } from '@/app/handlers/editTableInputsData';
import { handleClickAddTable } from '@/app/handlers/addTable';
interface AddTableProps {
    isOpen: boolean;
    contentLabel: string;
    onRequestClose: () => void;
}

function AddTable({ isOpen, contentLabel, onRequestClose, }: AddTableProps) {
    const iconElement = <img src={table.src} height={table.height} width={table.width} style={{ filter: `blur(${table.blurWidth}px ${table.blurHeight}px)` }} />

    const [numberChairs, setNumberChairs] = useState<number | null>(null)
    const [numberTables, setNumberTables] = useState<number | null>(null)

    const stateSetters: { [key: string]: React.Dispatch<React.SetStateAction<number | null>> } = {
        numberChairs: setNumberChairs,
        numberTable: setNumberTables,
    }


    return (
        <Modal isOpen={isOpen} contentLabel={contentLabel} onRequestClose={onRequestClose} icon={iconElement}>
            <section className='containerModalInvitationWedding'>
                <h1 className='title-container'>
                    Agregar Mesas
                </h1>
                {InputsData.map((inputData, index) => (
                    <div key={index}>
                        <span>{inputData.span}</span>
                        <InputField
                            type={inputData.inputField.type}
                            placeholder={inputData.inputField.placeholder}
                            name={inputData.inputField.name}
                            value={inputData.inputField.name === 'numberChairs' ? numberChairs : numberTables}
                            onChange={(e) => stateSetters[inputData.inputField.name as 'numberChairs' | 'numberTable'](Number(e.target.value))}
                        />
                    </div>
                ))}

                <button className='button-a' onClick={() => handleClickAddTable(numberTables, numberChairs, onRequestClose)}>Save</button>

            </section>
        </Modal>
    );
}

export default AddTable;