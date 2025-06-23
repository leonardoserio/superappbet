import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// Available icon sets
export type IconSet = 'Ionicons' | 'MaterialIcons' | 'MaterialCommunityIcons' | 'Feather' | 'FontAwesome5';

// Common icon names for betting apps
export type IconName = 
  // Navigation
  | 'home' | 'sports' | 'casino' | 'lottery' | 'profile'
  // Betting
  | 'soccer-ball' | 'basketball' | 'tennis' | 'football' | 'hockey'
  | 'live' | 'odds' | 'bet-slip' | 'cash-out' | 'boost'
  // Casino
  | 'dice' | 'cards' | 'slot-machine' | 'roulette' | 'poker'
  // General
  | 'search' | 'filter' | 'menu' | 'notifications' | 'settings'
  | 'wallet' | 'deposit' | 'withdraw' | 'history' | 'favorites'
  | 'eye' | 'eye-off' | 'chevron-right' | 'chevron-left' | 'chevron-up' | 'chevron-down'
  | 'plus' | 'minus' | 'close' | 'check' | 'star' | 'heart'
  // Social
  | 'share' | 'facebook' | 'google' | 'apple' | 'whatsapp';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  set?: IconSet;
}

// Icon mapping with appropriate sets for each icon
const iconMapping: Record<IconName, { set: IconSet; name: string }> = {
  // Navigation icons
  home: { set: 'Ionicons', name: 'home' },
  sports: { set: 'MaterialIcons', name: 'sports-soccer' },
  casino: { set: 'MaterialCommunityIcons', name: 'casino' },
  lottery: { set: 'MaterialCommunityIcons', name: 'ticket-confirmation' },
  profile: { set: 'Ionicons', name: 'person' },
  
  // Sports icons
  'soccer-ball': { set: 'MaterialIcons', name: 'sports-soccer' },
  basketball: { set: 'MaterialIcons', name: 'sports-basketball' },
  tennis: { set: 'MaterialIcons', name: 'sports-tennis' },
  football: { set: 'MaterialIcons', name: 'sports-football' },
  hockey: { set: 'MaterialIcons', name: 'sports-hockey' },
  
  // Betting icons
  live: { set: 'MaterialIcons', name: 'live-tv' },
  odds: { set: 'MaterialCommunityIcons', name: 'percent' },
  'bet-slip': { set: 'MaterialCommunityIcons', name: 'receipt' },
  'cash-out': { set: 'MaterialCommunityIcons', name: 'cash-fast' },
  boost: { set: 'MaterialCommunityIcons', name: 'trending-up' },
  
  // Casino icons
  dice: { set: 'MaterialCommunityIcons', name: 'dice-6' },
  cards: { set: 'MaterialCommunityIcons', name: 'cards' },
  'slot-machine': { set: 'MaterialCommunityIcons', name: 'slot-machine' },
  roulette: { set: 'MaterialCommunityIcons', name: 'roulette' },
  poker: { set: 'MaterialCommunityIcons', name: 'poker-chip' },
  
  // General UI icons
  search: { set: 'Ionicons', name: 'search' },
  filter: { set: 'Ionicons', name: 'filter' },
  menu: { set: 'Ionicons', name: 'menu' },
  notifications: { set: 'Ionicons', name: 'notifications' },
  settings: { set: 'Ionicons', name: 'settings' },
  
  // Financial icons
  wallet: { set: 'Ionicons', name: 'wallet' },
  deposit: { set: 'MaterialCommunityIcons', name: 'bank-plus' },
  withdraw: { set: 'MaterialCommunityIcons', name: 'bank-minus' },
  history: { set: 'MaterialIcons', name: 'history' },
  favorites: { set: 'Ionicons', name: 'heart' },
  
  // Visibility icons
  eye: { set: 'Ionicons', name: 'eye' },
  'eye-off': { set: 'Ionicons', name: 'eye-off' },
  
  // Navigation arrows
  'chevron-right': { set: 'Ionicons', name: 'chevron-forward' },
  'chevron-left': { set: 'Ionicons', name: 'chevron-back' },
  'chevron-up': { set: 'Ionicons', name: 'chevron-up' },
  'chevron-down': { set: 'Ionicons', name: 'chevron-down' },
  
  // Action icons
  plus: { set: 'Ionicons', name: 'add' },
  minus: { set: 'Ionicons', name: 'remove' },
  close: { set: 'Ionicons', name: 'close' },
  check: { set: 'Ionicons', name: 'checkmark' },
  star: { set: 'Ionicons', name: 'star' },
  heart: { set: 'Ionicons', name: 'heart' },
  
  // Social icons
  share: { set: 'Ionicons', name: 'share-social' },
  facebook: { set: 'Ionicons', name: 'logo-facebook' },
  google: { set: 'Ionicons', name: 'logo-google' },
  apple: { set: 'Ionicons', name: 'logo-apple' },
  whatsapp: { set: 'Ionicons', name: 'logo-whatsapp' },
};

export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 24, 
  color = '#000000',
  set: overrideSet 
}) => {
  const iconConfig = iconMapping[name];
  
  if (!iconConfig) {
    console.warn(`Icon "${name}" not found in mapping`);
    return null;
  }
  
  const iconSet = overrideSet || iconConfig.set;
  const iconName = iconConfig.name;
  
  const commonProps = {
    name: iconName as any,
    size,
    color,
  };
  
  switch (iconSet) {
    case 'Ionicons':
      return <Ionicons {...commonProps} />;
    case 'MaterialIcons':
      return <MaterialIcons {...commonProps} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons {...commonProps} />;
    case 'Feather':
      return <Feather {...commonProps} />;
    case 'FontAwesome5':
      return <FontAwesome5 {...commonProps} />;
    default:
      return <Ionicons {...commonProps} />;
  }
};

// Preset icon components for common betting app icons
export const HomeIcon = (props: Omit<IconProps, 'name'>) => <Icon name="home" {...props} />;
export const SportsIcon = (props: Omit<IconProps, 'name'>) => <Icon name="sports" {...props} />;
export const CasinoIcon = (props: Omit<IconProps, 'name'>) => <Icon name="casino" {...props} />;
export const LotteryIcon = (props: Omit<IconProps, 'name'>) => <Icon name="lottery" {...props} />;
export const ProfileIcon = (props: Omit<IconProps, 'name'>) => <Icon name="profile" {...props} />;
export const WalletIcon = (props: Omit<IconProps, 'name'>) => <Icon name="wallet" {...props} />;
export const LiveIcon = (props: Omit<IconProps, 'name'>) => <Icon name="live" {...props} />;
export const BetSlipIcon = (props: Omit<IconProps, 'name'>) => <Icon name="bet-slip" {...props} />;

export default Icon;