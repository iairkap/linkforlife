import React from 'react';
import { useState } from 'react';
import InputField from './InputField';
import Button from './button';
import axios from 'axios';
import "../sass/components/budget.scss"

function AddBudget({ expenseData, weddings, refreshData }) {

    const [budget, setBudget] = useState("");
    const handleAddBudget = async () => {
        try {
            const { data } = await axios.post("/api/budget", {
                budget
            });
            refreshData(); // Llama a refreshData en lugar de refershData
        } catch (error) {
            console.log(error);
        }
    }

    console.log(weddings[0])


    return (
        <div>
            {
                weddings[0].budget === null &&
                <div className='card-container'>
                    <InputField type='number' value={budget} onChange={(e) => setBudget(e.target.value)} placeholder='Add Budget' />
                    <button onClick={handleAddBudget}>Enviar</button>
                </div>
            }
            {
                weddings[0].budget !== null &&
                <div className='card-container'>
                    <h1>{weddings[0].budget}</h1>
                    <button onClick={handleAddBudget}>Modificar</button>
                </div>
            }
        </div>
    );
}

export default AddBudget;

