interface UserInvitation {
  id: number;
  name: string;
  lastName: string;
  emailInvitation: string;
  createdAt: string;
  updatedAt: string;
  plusOne: boolean;
  userId: number;
  invitedBy: string[];
  specialRole: string[];
  isAttending: boolean;
  isConfirmed: boolean;
  plusOneConfirmed: boolean;
  groupId: null | number;
  Table: any;
  groups: any[];
}

export function getInvitationStats(userInvitationList: UserInvitation[]) {
  const confirmed = userInvitationList?.filter(
    (inv) => inv.isConfirmed === true
  );
  const notConfirmed = userInvitationList?.filter(
    (inv) => inv.isConfirmed === false
  );
  const isAttending = userInvitationList?.filter(
    (inv) => inv.isAttending === true
  );
  const notAttending = userInvitationList?.filter(
    (inv) => inv.isAttending === false
  );
  const invitedBy = userInvitationList?.map((inv) => inv.invitedBy);

  return { confirmed, notConfirmed, isAttending, notAttending, invitedBy };
}
