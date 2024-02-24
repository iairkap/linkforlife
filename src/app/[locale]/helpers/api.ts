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
