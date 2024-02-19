import { useEffect, useState } from "react";
import axios from "axios";
import type { Expense } from "../../../types/types";
export const useExpenseData = () => {
  const [expenseData, setExpenseData] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  console.log(loading);

  console.log("soy el expenseData", expenseData);
  const fetchData = async () => {
    try {
      const { data } = await axios.get("/api/expenses");
      setExpenseData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []); // El array vacío como segundo argumento asegura que fetchData se llame solo cuando el componente se monta

  return { expenseData, loading, fetchData };
};
