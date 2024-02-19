export interface Group {
  id: number;
}

export interface UserInvitation {
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
  groups: Group[];
  phoneNumber: string;
  weddingId: number;
  avatar?: string;
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

export interface Expense {
  id?: number;
  name?: string;
  description?: string;
  amount?: number;
  weddingId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  alreadyPay?: boolean;
  paymentDate?: Date;
  paidById?: number;
}
