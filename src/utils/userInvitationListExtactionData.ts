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
  function countInvitationsByFilter(
    invitations: UserInvitation[],
    filter: string
  ) {
    return invitations?.filter((inv) => inv.invitedBy.includes(filter)).length;
  }

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

  console.log(userInvitationList);

  const flattenedInvitedBy = invitedBy?.flat();
  const invitedByBride = flattenedInvitedBy?.filter(
    (inv) => inv == "Bride"
  ).length;
  const invitedByGroom = flattenedInvitedBy?.filter(
    (inv) => inv == "Groom"
  ).length;

  const confirmedByBride = countInvitationsByFilter(confirmed, "Bride");
  const confirmedByGroom = countInvitationsByFilter(confirmed, "Groom");
  const confirmedTotal = confirmed?.length;

  const notConfirmedByBride = countInvitationsByFilter(notConfirmed, "Bride");
  const notConfirmedByGroom = countInvitationsByFilter(notConfirmed, "Groom");
  const notConfirmedTotal = notConfirmed?.length;

  const isAttendingByBride = countInvitationsByFilter(isAttending, "Bride");
  const isAttendingByGroom = countInvitationsByFilter(isAttending, "Groom");
  const isAttendingTotal = isAttending?.length;

  const notAttendingByBride = countInvitationsByFilter(notAttending, "Bride");
  const notAttendingByGroom = countInvitationsByFilter(notAttending, "Groom");
  const notAttendingTotal = notAttending?.length;

  return {
    confirmedByBride,
    confirmedByGroom,
    confirmedTotal,
    notConfirmedByBride,
    notConfirmedByGroom,
    notConfirmedTotal,
    isAttendingByBride,
    isAttendingByGroom,
    isAttendingTotal,
    notAttendingByBride,
    notAttendingByGroom,
    notAttendingTotal,
    invitedByBride,
    invitedByGroom,
  };
}

export function getAdjustedInvitationStats(
  userInvitationList: UserInvitation[]
) {
  let isAttendingTotal = 0;
  let notAttendingTotal = 0;
  let notConfirmedTotal = 0;

  userInvitationList.forEach((invitation) => {
    if (!invitation.isConfirmed) {
      notConfirmedTotal++;
    } else if (!invitation.isAttending) {
      notAttendingTotal++;
    } else {
      isAttendingTotal++;
    }
  });

  return {
    isAttendingTotal,
    notAttendingTotal,
    notConfirmedTotal,
  };
}
