export interface TicketType {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'completed';
  created_at: number; // timestamp
}
