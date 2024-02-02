function generateFakeData() {
  const names = [
    "John",
    "Jane",
    "Sam",
    "Sue",
    "Bob",
    "Alice",
    "Milton",
    "Maggie",
    "Moe",
    "Marge",
    "Mickey",
    "Minnie",
    "Marty",
    "Marty",
    "Abraham",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Hernandez",
    "Lopez",
    "Gonzalez",
    "Wilson",
  ];
  const domains = ["example.com", "test.com", "demo.com"];
  const invitedByOptions = [
    "Bride",
    "Groom",
    "BridesFamily",
    "GroomsFamily",
    "Both",
  ];
  const specialRoleOptions = [
    "BestMan",
    "MaidOfHonor",
    "Bridesmaid",
    "Groomsman",
    "FlowerGirl",
    "RingBearer",
    "Usher",
    "Reader",
    "Officiant",
    "Parent",
    "Grandparent",
    "Other",
    "none",
  ];

  const name = names[Math.floor(Math.random() * names.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const invitedBy =
    invitedByOptions[Math.floor(Math.random() * invitedByOptions.length)];
  const specialRole =
    specialRoleOptions[Math.floor(Math.random() * specialRoleOptions.length)];

  const email = `${name}.${lastName}@${domain}`;

  return {
    name,
    lastName,
    emailInvitation: email,
    plusOne: Math.random() < 0.5,
    invitedBy,
    specialRole,
    isAttending: Math.random() < 0.5,
    isConfirmed: Math.random() < 0.5,
    plusOneConfirmed: Math.random() < 0.5,
  };
}

const fakeDataList = Array.from({ length: 150 }, generateFakeData);
console.log(fakeDataList);

function generateData(
  weddingInvitationListIds,
  groupStart,
  groupEnd,
  maxGroupsPerList
) {
  const data = [];

  for (let i = 0; i < weddingInvitationListIds.length; i++) {
    const groupCountForThisList =
      Math.floor(Math.random() * maxGroupsPerList) + 1;

    for (let j = 0; j < groupCountForThisList; j++) {
      const groupId =
        Math.floor(Math.random() * (groupEnd - groupStart + 1)) + groupStart;
      data.push({
        weddingInvitationListId: weddingInvitationListIds[i],
        groupId,
      });
    }
  }

  return data;
}

const weddingInvitationListIds = [
  1,
  4,
  5,
  ...Array.from({ length: 64 }, (_, i) => i + 29),
];
const data = generateData(weddingInvitationListIds, 3, 36, 5);
console.log(JSON.stringify(data, null, 2));
