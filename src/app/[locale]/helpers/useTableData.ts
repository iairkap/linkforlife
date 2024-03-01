import { fetchTableData } from "./api";
import { useEffect } from "react";
import { useState } from "react";

export const useTableData = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTableData().then((data) => {
      setTableData(data);
      setLoading(false);
    });
  }, []);

  return { tableData, loading };
};
