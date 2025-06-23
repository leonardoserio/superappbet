export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface User extends BaseEntity {
  email: string;
  name: string;
  avatar?: string;
  isVerified: boolean;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  currency: string;
  notifications: NotificationPreferences;
}

export interface NotificationPreferences {
  push: boolean;
  email: boolean;
  sms: boolean;
  marketing: boolean;
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, any>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface BettingEvent extends BaseEntity {
  name: string;
  sport: string;
  league: string;
  startTime: string;
  status: 'upcoming' | 'live' | 'finished' | 'cancelled';
  markets: BettingMarket[];
}

export interface BettingMarket extends BaseEntity {
  name: string;
  type: string;
  selections: BettingSelection[];
  isActive: boolean;
}

export interface BettingSelection extends BaseEntity {
  name: string;
  odds: number;
  isActive: boolean;
  marketId: string;
  eventId: string;
}

export interface Bet extends BaseEntity {
  userId: string;
  selections: BetSelection[];
  stake: number;
  potentialReturn: number;
  status: 'pending' | 'won' | 'lost' | 'void' | 'partially_won';
  placedAt: string;
  settledAt?: string;
}

export interface BetSelection {
  selectionId: string;
  odds: number;
  result?: 'won' | 'lost' | 'void';
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | null;
  loading: LoadingState;
  error: string | null;
}