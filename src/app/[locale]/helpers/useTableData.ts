import { fetchTableData, deleteGuestTable } from "./api";
import { useEffect, useState } from "react";

export const useTableData = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const fetchData = () => {
    setLoading(true);
    fetchTableData().then((data) => {
      setTableData(data);
      setLoading(false);
    });
  };

  const fetchDataAndUpdateExternal = (setTableDataExternal: any) => {
    setLoading(true);
    fetchTableData().then((data) => {
      setTableData(data);
      if (setTableDataExternal) {
        setTableDataExternal(data);
      }
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

  return {
    tableData,
    loading,
    deleteGuestAndFetchData,
    setTableData,
    fetchDataAndUpdateExternal,
  };
};
