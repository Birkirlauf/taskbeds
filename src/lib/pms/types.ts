export interface PMSProvider {
  name: string;
  id: string;
  apiVersion: string;
}

export interface PMSConfig {
  provider: PMSProvider;
  apiKey: string;
  apiEndpoint: string;
  hotelId: string;
  syncInterval: number; // in milliseconds
}

export interface PMSReservation {
  id: string;
  pmsId: string;
  guestName: string;
  checkIn: Date;
  checkOut: Date;
  roomNumber: string;
  status: 'confirmed' | 'cancelled' | 'checked_in' | 'checked_out';
  adults: number;
  children: number;
  totalAmount: number;
  paymentStatus: 'pending' | 'partial' | 'paid';
  specialRequests?: string;
  lastSyncedAt: Date;
}

export interface PMSSyncEvent {
  type: 'reservation' | 'room' | 'rate' | 'availability';
  action: 'create' | 'update' | 'delete';
  entityId: string;
  timestamp: Date;
  payload: any;
}

export interface PMSError {
  code: string;
  message: string;
  details?: any;
}
