import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@/design-system';
import { TabParamList } from './types';
import { HomeScreen } from '@/screens';
import { SportsScreen } from '@/screens/SportsScreen';
import { CasinoScreen } from '@/screens/CasinoScreen';
import { LotteryScreen } from '@/screens/LotteryScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.background.accent,
        tabBarInactiveTintColor: theme.colors.text.secondary,
        tabBarStyle: {
          backgroundColor: theme.colors.background.secondary,
          borderTopColor: theme.colors.border.primary,
        },
        headerStyle: {
          backgroundColor: theme.colors.background.secondary,
        },
        headerTintColor: theme.colors.text.primary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Início',
        }}
      />
      <Tab.Screen
        name="Sports"
        component={SportsScreen}
        options={{
          title: 'Esportes',
        }}
      />
      <Tab.Screen
        name="Casino"
        component={CasinoScreen}
        options={{
          title: 'Casino',
        }}
      />
      <Tab.Screen
        name="Lottery"
        component={LotteryScreen}
        options={{
          title: 'Loteria',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Perfil',
        }}
      />
    </Tab.Navigator>
  );
};