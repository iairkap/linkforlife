import { useEffect, useState } from "react";
import { useRouter } from "@/navigation";
import { useSession } from "next-auth/react";
import { AxiosError } from "axios";
import {
  fetchUserDataBis,
  fetchGroups,
  fetchInvitationList,
  fetchUpcomingExpenses,
} from "./api";
import { Group, UserInvitation, Wedding } from "@/types/types";
import type { Expense } from "@/types/types";
export const useDashboardData = () => {
  const [userInvitationList, setUserInvitationList] = useState<
    UserInvitation[]
  >([]);
  const [ModalFirstSteps, setModalFirstSteps] = useState(false);
  const [weddings, setWeddings] = useState<Wedding[]>([]);
  const [selectedWedding, setSelectedWedding] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<Group[][]>([]);
  const [groupInvitations, setGroupInvitations] = useState<
    Record<number, UserInvitation[]>
  >({});
  const [user, setUser] = useState<any>([]);
  const [upcomingExpenses, setUpcomingExpenses] = useState<Expense | null>(
    null
  );

  const router = useRouter();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const databis = await fetchUserDataBis();
      setUser(databis);
      const data = await fetchInvitationList();
      setWeddings(data);
      const dataGroups = await fetchGroups();
      setGroups(dataGroups);

      const upcomingExpenses = await fetchUpcomingExpenses();
      setUpcomingExpenses(upcomingExpenses);

      if (data.length > 0) {
        setSelectedWedding(data[0].id);
        const filteredInvitations = data[0].weddingInvitationList.filter(
          (invitation: UserInvitation) => invitation.weddingId === data[0].id
        );
        setUserInvitationList(filteredInvitations);
      } else {
        setSelectedWedding(null);
        setUserInvitationList([]);
      }
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response && axiosError.response.status === 404) {
        router.replace("/dashboard/rsvp");
        setModalFirstSteps(true);
        console.error("No weddings found");
      }
    } finally {
      setIsLoading(false);
    }
  };

  console.log(upcomingExpenses);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!userInvitationList || !selectedWedding) {
      return;
    }

    const newGroupInvitations = userInvitationList.reduce((acc, invitation) => {
      if (invitation.groups) {
        invitation.groups.forEach((group) => {
          if (!acc[group.id]) {
            acc[group.id] = [];
          }
          acc[group.id].push(invitation);
        });
      }
      return acc;
    }, {} as Record<number, UserInvitation[]>);

    setGroupInvitations(newGroupInvitations);
  }, [userInvitationList, selectedWedding]);

  return {
    setUserInvitationList,
    userInvitationList,
    isLoading,
    setIsLoading,
    groups,
    groupInvitations,
    refreshData: fetchData,
    /*     handleWeddingChange,
     */ selectedWedding,
    setSelectedWedding,
    weddings,
    setWeddings,
    ModalFirstSteps,
    setModalFirstSteps,
    user,
    setUser,
    upcomingExpenses,
    setUpcomingExpenses,
  };
};
