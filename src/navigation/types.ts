export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Profile: undefined;
  Sports: undefined;
  Casino: undefined;
  Lottery: undefined;
  Payments: undefined;
  BetHistory: undefined;
  Settings: undefined;
};

export type TabParamList = {
  Home: undefined;
  Sports: undefined;
  Casino: undefined;
  Lottery: undefined;
  Profile: undefined;
};

export type SportsStackParamList = {
  SportsList: undefined;
  SportDetail: { sportId: string };
  EventDetail: { eventId: string };
  LiveEvents: undefined;
};

export type CasinoStackParamList = {
  CasinoHome: undefined;
  GameDetail: { gameId: string };
  GameHistory: undefined;
};

export type ProfileStackParamList = {
  ProfileHome: undefined;
  EditProfile: undefined;
  Settings: undefined;
  BetHistory: undefined;
  PaymentMethods: undefined;
  Support: undefined;
};