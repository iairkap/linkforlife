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
        "span": "Numero de Mesas",
        "inputField": {
            "type": "number",
            "placeholder": "Numero de mesas",
            "name": "numberTable",
            "value": "numberTable",
            "onChange": "setNumberTable(Number(e.target.value))"
        }
    }
]