
export type ActionType = 'buy' | 'sell' | 'bridge' | 'stake' | 'other';

export type ReviewStatus = 'yes' | 'unsure' | 'no' | null;

export interface JournalEntry {
  id: string;
  note: string;
  timestamp: number;
  actionType: ActionType;
  txHash?: string;
  reviewStatus: ReviewStatus;
}

export interface ActivityItem {
  id: string;
  type: 'purchase' | 'post' | 'reply';
  title: string;
  date: string;
  weekLabel: string;
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
}
