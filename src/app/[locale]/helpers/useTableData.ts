import { fetchTableData, deleteGuestTable } from "./api";
import { useEffect } from "react";
import { useState } from "react";

export const useTableData = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    fetchTableData().then((data) => {
      setTableData(data);
      setLoading(false);
    });
  };

  const deleteGuestAndFetchData = async (
    tableId: number,
    weddingInvitationID: number
  ) => {
    await deleteGuestTable(tableId, weddingInvitationID);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { tableData, loading, deleteGuestAndFetchData };
};
