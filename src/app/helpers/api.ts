import axios from "axios";
import Cookies from "js-cookie";

export const fetchInvitationList = async () => {
  const response = await axios.get("/api/wedding", {});
  console.log("response.data", response.data);

  return response.data;
};
