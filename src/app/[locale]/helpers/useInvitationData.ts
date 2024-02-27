import { useEffect, useState } from "react";
import {
  fetInvitationCards,
  fetchInvitationCardById,
  fetchCreditsData,
} from "./api";
import type { InvitationCard } from "@/types/types";

export const useInvitationData = (id?: number | undefined) => {
  const [invitationCards, setInvitationCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [invitationCard, setInvitationCard] = useState<InvitationCard | null>(
    null
  );
  const [creditsData, setCreditsData] = useState<number>(0);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await fetInvitationCards();
      const dataCredits = await fetchCreditsData();
      setInvitationCards(data);
      setCreditsData(dataCredits);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchDataByID = async (id?: number) => {
    setIsLoading(true);
    try {
      if (!id) {
        throw new Error("No id provided");
      }
      const data = await fetchInvitationCardById(id);
      setInvitationCard(data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDataByID(id);
    }
  }, [id]);

  return { invitationCards, isLoading, invitationCard, creditsData };
};
