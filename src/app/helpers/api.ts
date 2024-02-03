import axios from "axios";
import Cookies from "js-cookie";

export const fetchInvitationList = async () => {
  const token = Cookies.get("token");
  const response = await axios.get("/api/invitationListGeneral", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
