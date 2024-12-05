export type CleaningStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export interface Room {
  id: string;
  number: string;
  type: string;
  status: CleaningStatus;
  assignedTo?: string;
  lastCleaned?: Date;
} 