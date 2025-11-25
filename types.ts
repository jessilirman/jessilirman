export enum UserRole {
  SUPER_ADMIN = 'Super Admin',
  ADMIN = 'Admin',
  SENIOR_LAWYER = 'Advogado Senior',
  JUNIOR_LAWYER = 'Advogado Junior',
  ASSISTANT = 'Assistente',
  VIEWER = 'Visualizador'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
  lastLogin?: string;
  avatarUrl?: string;
}

export enum FeeType {
  FIXED = 'Fixo',
  HOURLY = 'Por Hora',
  PERCENTAGE = 'Percentual (Êxito)',
  RETAINER = 'Partido Mensal'
}

export enum PaymentStatus {
  PAID = 'Pago',
  PENDING = 'Pendente',
  OVERDUE = 'Atrasado',
  DRAFT = 'Rascunho'
}

export interface FinancialRecord {
  id: string;
  clientName: string;
  caseRef: string;
  description: string;
  amount: number;
  dueDate: string;
  status: PaymentStatus;
  type: FeeType;
  lawyerId: string;
}

export interface IntegrationStatus {
  service: 'Drive' | 'Calendar' | 'Gmail' | 'Docs' | 'Sheets';
  connected: boolean;
  lastSync?: string;
  icon: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  details: string;
  timestamp: string;
  module: 'Auth' | 'Finance' | 'Users' | 'System' | 'Integration';
  severity: 'Info' | 'Warning' | 'Error';
}
