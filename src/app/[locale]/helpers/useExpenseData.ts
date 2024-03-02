import { useEffect, useState } from "react";
import axios from "axios";
import type { Expense } from "../../../types/types";
import { filter } from "d3";

interface GroupedData {
  [key: string]: Expense[];
}
export const useExpenseData = () => {
  const [expenseData, setExpenseData] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPaid, setTotalPaid] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [categories, setCategories] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("/api/expenses");
      const sortedData = data.sort(
        (a: any, b: any) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );

      const groupedData = sortedData.reduce((groups: any, item: any): any => {
        const category = item.categories[0];
        if (!groups[category]) {
          groups[category] = [];
        }
        groups[category].push(item);
        return groups;
      }, {});

      const rows = [];
      for (const category in groupedData) {
        rows.push({
          isCategoryRow: true,
          category: category,
        });
        rows.push(...groupedData[category]);
      }
      setExpenseData(rows);
      let amount = 0;
      for (let expense of sortedData) {
        amount += expense.amount;
      }
      setTotalAmount(amount);
      let total = 0;
      for (let expense of sortedData) {
        if (expense.installments && expense.installments.length > 0) {
          const expenseTotal = expense.installments.reduce(
            (sum: any, installment: any) => sum + installment.amount,
            0
          );
          total += expenseTotal;
        }
      }
      setTotalPaid(total);
      let categoriesSet = new Set<string>();
      for (let expense of sortedData) {
        if (expense.categories) {
          expense.categories.forEach((category: any) =>
            categoriesSet.add(category)
          );
        }
      }
      let categories: string[] = Array.from(categoriesSet);
      setCategories(categories);
      setLoading(false);
    } catch (error) {
      error;
    }
  };
  totalPaid;
  useEffect(() => {
    fetchData();
  }, []); // El array vacío como segundo argumento asegura que fetchData se llame solo cuando el componente se monta

  expenseData;
  totalAmount;
  return {
    expenseData,
    loading,
    fetchData,
    totalPaid,
    totalAmount,
    categories,
  };
};
