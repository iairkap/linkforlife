import { useEffect, useState } from "react";
import { fetInvitationCards } from "./api";

export const useInvitationData = () => {
  const [invitationCards, setInvitationCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await fetInvitationCards();
      setInvitationCards(data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { invitationCards, isLoading };
};
