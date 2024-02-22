import axios from "axios";
import Cookies from "js-cookie";

export const fetchInvitationList = async () => {
  const response = await axios.get("/api/wedding", {});
  console.log(response);
  return response.data;
};

export const fetchUserDataBis = async () => {
  const response = await axios.get("/api/user", {});
  console.log(response.data);

  return response.data;
};

export const fetchGroups = async () => {
  const response = await axios.get("/api/groupsList", {});
  console.log(response.data);
  return response.data;
};

export const fetchUpcomingExpenses = async () => {
  const response = await axios.get("/api/upcomingPayment", {});
  console.log(response.data);
  return response.data;
};
