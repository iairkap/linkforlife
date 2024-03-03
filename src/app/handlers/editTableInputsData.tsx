export const InputsData = [
    {
        "span": "Numero de Sillas",
        "inputField": {
            "type": "number",
            "placeholder": "Numero de sillas",
            "name": "numberChairs",
            "value": "numberChairs",
            "onChange": "setNumberChairs(Number(e.target.value))"
        }
    },
    {
        "span": "Nombre de Mesa",
        "inputField": {
            "type": "text",
            "placeholder": "Nombre de mesa",
            "name": "tableName",
            "value": "tableName",
            "onChange": "setTableName(Number(e.target.value))"
        }
    }
]