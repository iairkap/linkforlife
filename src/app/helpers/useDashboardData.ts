import { useEffect, useState } from "react";
import { fetchInvitationList } from "./api";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AxiosError } from "axios";

interface Group {
  id: number;
}

interface UserInvitation {
  isConfirmed: boolean;
  groups: Group[];
  weddingId: number;
}

interface Wedding {
  id: number;
  weddingName: string;
  weddingId: number;
  weddingInvitationList: UserInvitation[]; // Asegúrate de definir UserInvitation
}
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

  /*   const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchInvitationList();
      const allInvitations = data.flatMap(
        (wedding) => wedding.weddingInvitationList
      );
      setUserInvitationList(allInvitations);
      setWeddings(data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };
  const handleWeddingChange = (event) => {
    const weddingId = Number(event.target.value);
    setSelectedWedding(weddingId);
    const wedding = weddings.find((wedding) => wedding.id === weddingId);
    if (wedding) {
      setUserInvitationList(wedding.weddingInvitationList);
    } else {
      setUserInvitationList([]);
    }
  };
 */

  const router = useRouter();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchInvitationList();
      setWeddings(data);

      if (data?.weddings.length === 0) {
        router.push("/dashboard/rsvp");
      }
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response && axiosError.response.status === 404) {
        router.push("/dashboard/rsvp");
        setModalFirstSteps(true);
      }
    }
    setIsLoading(false);
  };
  const handleWeddingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const weddingId = Number(event.target.value);
    setSelectedWedding(weddingId);
    const wedding = weddings.find((wedding) => wedding.id === weddingId);
    if (wedding) {
      setUserInvitationList(wedding.weddingInvitationList);
    } else {
      setUserInvitationList([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!userInvitationList || !selectedWedding) {
      return;
    }

    const filteredInvitations = userInvitationList.filter(
      (invitation) => invitation.weddingId === selectedWedding
    );
    const newGroups = filteredInvitations.map((user) => user.groups);
    setGroups(newGroups);
  }, [userInvitationList, selectedWedding]);

  useEffect(() => {
    if (!userInvitationList || !selectedWedding) {
      return;
    }

    const filteredInvitations = userInvitationList.filter(
      (invitation) => invitation.weddingId === selectedWedding
    );
    const newGroupInvitations = filteredInvitations.reduce(
      (acc, invitation) => {
        if (invitation.groups) {
          invitation.groups.forEach((group) => {
            if (!acc[group.id]) {
              acc[group.id] = [];
            }
            acc[group.id].push(invitation);
          });
        }
        return acc;
      },
      {} as Record<number, UserInvitation[]>
    );

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
    handleWeddingChange,
    selectedWedding,
    setSelectedWedding,
    weddings,
    setWeddings,
    ModalFirstSteps,
    setModalFirstSteps,
  };
};
