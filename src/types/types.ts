export interface Group {
  id: number;
}

export interface UserInvitation {
  isConfirmed: boolean;
  groups: Group[];
  weddingId: number;
}

export interface Wedding {
  id: number;
  weddingDate: Date;
  weddingName: string;
  weddingId: number;
  weddingInvitationList: UserInvitation[];
}

export interface DashboardData {
  userInvitationList: any;
  setUserInvitationList: React.Dispatch<React.SetStateAction<any[]>>; // Reemplaza 'any' con el tipo correcto
  isLoading: boolean;
  setIsLoading: any;
  groups: any;
  groupInvitations: any;
  weddings: any;
  setWeddings: any;
  session: any;
  refreshData: any;
  isOpenModalAddUser: boolean;
  setIsOpenModalAddUser: any;
  user: any;
}

export interface DashboardDataB {
  userInvitationList: any[]; // Reemplaza 'any' con el tipo correcto
  setUserInvitationList: React.Dispatch<React.SetStateAction<any[]>>; // Reemplaza 'any' con el tipo correcto
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  groups: Groups[];
  groupInvitations: any; // Reemplaza 'any' con el tipo correcto
  weddings: any[];
}

export interface Groups {
  id: number;
  name: string;
  userId: number;
  weddingId: number;
}
