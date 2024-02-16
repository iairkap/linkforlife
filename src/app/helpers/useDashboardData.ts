import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AxiosError } from "axios";
import { fetchUserDataBis, fetchGroups, fetchInvitationList } from "./api";
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
  weddingDate: Date;
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
      setUser(databis);
      const data = await fetchInvitationList();
      setWeddings(data);
      const dataGroups = await fetchGroups();
      setGroups(dataGroups);
      if (data.length > 0) {
        setSelectedWedding(data[0].id);
        const filteredInvitations = data[0].weddingInvitationList.filter(
          (invitation: UserInvitation) => invitation.weddingId === data[0].id
        );
        setUserInvitationList(filteredInvitations);
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
  };
};

/* useEffect(() => {
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
      console.log("no hay invitaciones");
      return;
    }

    const filteredInvitations = userInvitationList.filter(
      (invitation) => invitation.weddingId === selectedWedding
    ); */
