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

export function getInvitationStats(
  userInvitationList: UserInvitation[],
  user: any
) {
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

  const flattenedInvitedBy = invitedBy?.flat();
  const invitedByUser = flattenedInvitedBy?.filter(
    (inv) => inv == user.name
  ).length;
  const invitedByUserPartner = flattenedInvitedBy?.filter(
    (inv) => inv == user.partnerName
  ).length;
  const invitedByUserPartnerFamily = flattenedInvitedBy?.filter(
    (inv) => inv == `${user.partnerName}'s family`
  ).length;
  const invitedByUserFamily = flattenedInvitedBy?.filter(
    (inv) => inv == `${user.name}'s family`
  ).length;
  const invitedByBothUserAndUserPartner = flattenedInvitedBy?.filter(
    (inv) => inv == `${user.name} ${user.partnerName}`
  ).length;

  const confirmedByUser = countInvitationsByFilter(confirmed, user.name);
  const confirmedByUserPartner = countInvitationsByFilter(
    confirmed,
    user.partnerName
  );
  const confirmedByUserFamily = countInvitationsByFilter(
    confirmed,
    `${user.name}'s family`
  );
  const confirmedByUserPartnerFamily = countInvitationsByFilter(
    confirmed,
    `${user.partnerName}'s family`
  );
  const confirmedByBothUserAndUserPartner = countInvitationsByFilter(
    confirmed,
    `${user.name} ${user.partnerName}`
  );
  const confirmedTotal = confirmed?.length;

  const notConfirmedByUser = countInvitationsByFilter(notConfirmed, user.name);
  const notConfirmedByUserPartner = countInvitationsByFilter(
    notConfirmed,
    user.partnerName
  );
  const notConfirmedByUserFamily = countInvitationsByFilter(
    notConfirmed,
    `${user.name}'s family`
  );
  const notConfirmedByUserPartnerFamily = countInvitationsByFilter(
    notConfirmed,
    `${user.partnerName}'s family`
  );
  const notConfirmedByBothUserAndUserPartner = countInvitationsByFilter(
    notConfirmed,
    `${user.name} ${user.partnerName}`
  );
  const notConfirmedTotal = notConfirmed?.length;

  const isAttendingByUser = countInvitationsByFilter(isAttending, user.name);
  const isAttendingByUserPartner = countInvitationsByFilter(
    isAttending,
    user.partnerName
  );
  const isAttendingByUserFamily = countInvitationsByFilter(
    isAttending,
    `${user.name}'s family`
  );
  const isAttendingByUserPartnerFamily = countInvitationsByFilter(
    isAttending,
    `${user.partnerName}'s family`
  );
  const isAttendingByBothUserAndUserPartner = countInvitationsByFilter(
    isAttending,
    `${user.name} ${user.partnerName}`
  );

  const isAttendingTotal = isAttending?.length;

  const notAttendingByUser = countInvitationsByFilter(notAttending, user.name);
  const notAttendingByUserPartner = countInvitationsByFilter(
    notAttending,
    user.partnerName
  );
  const notAttendingByUserFamily = countInvitationsByFilter(
    notAttending,
    `${user.name}'s family`
  );
  const notAttendingByUserPartnerFamily = countInvitationsByFilter(
    notAttending,
    `${user.partnerName}'s family`
  );
  const notAttendingByBothUserAndUserPartner = countInvitationsByFilter(
    notAttending,
    `${user.name} ${user.partnerName}`
  );
  const notAttendingTotal = notAttending?.length;

  return {
    confirmedByUser,
    confirmedByUserPartner,
    confirmedTotal,
    notConfirmedByUser,
    notConfirmedByUserPartner,
    notConfirmedTotal,
    isAttendingByUser,
    isAttendingByUserPartner,
    isAttendingTotal,
    notAttendingByUser,
    notAttendingByUserPartner,
    notAttendingTotal,
    invitedByUser,
    invitedByUserPartner,
    confirmedByUserFamily,
    confirmedByUserPartnerFamily,
    confirmedByBothUserAndUserPartner,
    notConfirmedByUserFamily,
    notConfirmedByUserPartnerFamily,
    notConfirmedByBothUserAndUserPartner,
    isAttendingByUserFamily,
    isAttendingByUserPartnerFamily,
    isAttendingByBothUserAndUserPartner,
    notAttendingByUserFamily,
    notAttendingByUserPartnerFamily,
    notAttendingByBothUserAndUserPartner,
    invitedByUserPartnerFamily,
    invitedByUserFamily,
    invitedByBothUserAndUserPartner,
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
