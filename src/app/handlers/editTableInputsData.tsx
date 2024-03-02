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
        "span": "Nombre de MEsa",
        "inputField": {
            "type": "text",
            "placeholder": "Nombre de mesa",
            "name": "tablNanme",
            "value": "tableName",
            "onChange": "setTableName(Number(e.target.value))"
        }
    }
]