export interface Room {
  id: string;
  number: string;
  status: RoomStatus;
  wing: 'South Wing' | 'West Wing';
  hasIssues?: boolean;
  assignedTo?: string;
}

export type RoomStatus = 
  | 'vacant_clean'
  | 'vacant_dirty'
  | 'occupied'
  | 'maintenance'
  | 'in_progress';

export interface Wing {
  name: string;
  rooms: Room[];
  stats: {
    total: number;
    clean: number;
    dirty: number;
    maintenance: number;
  }
} 