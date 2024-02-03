import { useEffect, useState } from "react";
import { fetchInvitationList } from "./api";

interface Group {
  id: number;
  // otras propiedades aquí...
}

interface UserInvitation {
  groups: Group[];
  // otras propiedades aquí...
}

export const useDashboardData = () => {
  const [userInvitationList, setUserInvitationList] = useState<
    UserInvitation[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<Group[][]>([]);
  const [groupInvitations, setGroupInvitations] = useState<
    Record<number, UserInvitation[]>
  >({});

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchInvitationList();
        setUserInvitationList(data);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const newGroups = userInvitationList.map((user) => user.groups);
    setGroups(newGroups);
  }, [userInvitationList]);

  useEffect(() => {
    const newGroupInvitations = userInvitationList.reduce((acc, invitation) => {
      invitation.groups.forEach((group) => {
        if (!acc[group.id]) {
          acc[group.id] = [];
        }
        acc[group.id].push(invitation);
      });
      return acc;
    }, {} as Record<number, UserInvitation[]>);

    setGroupInvitations(newGroupInvitations);
  }, [userInvitationList]);

  return {
    userInvitationList,
    isLoading,
    setIsLoading,
    groups,
    groupInvitations,
  };
};
