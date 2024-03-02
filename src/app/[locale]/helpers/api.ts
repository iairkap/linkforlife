import axios from "axios";
import Cookies from "js-cookie";

export const fetchInvitationList = async () => {
  const response = await axios.get("/api/wedding", {});
  return response.data;
};

export const fetchUserDataBis = async () => {
  const response = await axios.get("/api/user", {});

  return response.data;
};

export const fetchGroups = async () => {
  const response = await axios.get("/api/groupsList", {});
  return response.data;
};

export const fetchUpcomingExpenses = async () => {
  const response = await axios.get("/api/upcomingPayment", {});
  return response.data;
};

export const fetInvitationCards = async () => {
  const response = await axios.get("/api/invitationCard", {});
  return response.data;
};

export const fetchInvitationCardById = async (id: number) => {
  const response = await axios.get(`/api/invitationCard/${id}`, {});
  return response.data;
};

export const fetchCreditsData = async () => {
  const response = await axios.get("/api/credits", {});
  return response.data;
};

export const fetchTableData = async () => {
  const response = await axios.get("/api/tables", {});
  return response.data;
};

export const deleteGuestTable = async (
  tableId: number,
  weddingInvitationID: number
) => {
  const response = await axios.delete("/api/addGuestToTable", {
    data: {
      tableId,
      weddingInvitationID,
    },
  });
  return response.data;
};
