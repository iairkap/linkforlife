import { useEffect, useState } from "react";
import axios from "axios";
import type { Expense } from "../../../types/types";

export const useExpenseData = () => {
  const [expenseData, setExpenseData] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  console.log(loading);

  console.log("soy el expenseData", expenseData);
  const fetchData = async () => {
    try {
      const { data } = await axios.get("/api/expenses");
      const sortedData = data.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );

      setExpenseData(sortedData);

      let amount = 0;

      for (let expense of data) {
        amount += expense.amount;
      }
      setTotalAmount(amount);
      let total = 0;
      for (let expense of data) {
        if (expense.installments && expense.installments.length > 0) {
          const expenseTotal = expense.installments.reduce(
            (sum, installment) => sum + installment.amount,
            0
          );
          total += expenseTotal;
        }
      }
      setTotalPaid(total);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(totalPaid);
  useEffect(() => {
    fetchData();
  }, []); // El array vacío como segundo argumento asegura que fetchData se llame solo cuando el componente se monta

  console.log(expenseData);
  console.log(totalAmount);
  return { expenseData, loading, fetchData, totalPaid, totalAmount };
};
