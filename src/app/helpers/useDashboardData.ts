import { useEffect, useState } from "react";
import { fetchInvitationList } from "./api";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AxiosError } from "axios";
import { fetchUserDataBis } from "./api";
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
  const [user, setUser] = useState<any>([]);

  const router = useRouter();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const databis = await fetchUserDataBis();
      console.log(databis);
      setUser(databis);
      const data = await fetchInvitationList();
      console.log(data);
      setWeddings(data);

      if (data?.weddings.length === 0) {
        router.replace("/dashboard/rsvp");
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

  console.log(user);
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
    user,
    setUser,
  };
};
