import axios from "axios";
import Cookies from "js-cookie";

export const fetchInvitationList = async () => {
  const response = await axios.get("/api/invitationListGeneral", {});
  return response.data;
};
