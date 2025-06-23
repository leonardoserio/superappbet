import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, StyleSheet } from 'react-native';
import { useTheme } from '@/design-system';
import { TabParamList } from './types';
import { HomeScreen } from '@/screens';
import { SportsScreen } from '@/screens/SportsScreen';
import { CasinoScreen } from '@/screens/CasinoScreen';
import { LotteryScreen } from '@/screens/LotteryScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { ModuleService } from '@/services/ModuleService';
import { WebSocketService } from '@/services/sdui/WebSocketService';
import { HomeIcon, SportsIcon, CasinoIcon, LotteryIcon, ProfileIcon } from '@/components/shared/Icon';

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator: React.FC = () => {
  const { theme } = useTheme();
  const [enabledModules, setEnabledModules] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial enabled modules
    const moduleService = ModuleService.getInstance();
    const initialModules = moduleService.getEnabledModules();
    setEnabledModules(initialModules);
    setLoading(false);

    // Listen for real-time module updates
    const handleModuleEnabled = (data: { moduleId: string }) => {
      console.log('📱 TabNavigator: Module enabled:', data.moduleId);
      setEnabledModules(prev => {
        if (!prev.includes(data.moduleId)) {
          return [...prev, data.moduleId];
        }
        return prev;
      });
    };

    const handleModuleDisabled = (data: { moduleId: string }) => {
      console.log('📱 TabNavigator: Module disabled:', data.moduleId);
      setEnabledModules(prev => prev.filter(id => id !== data.moduleId));
    };

    // Setup WebSocket event handlers
    WebSocketService.setEventHandlers({
      onModuleEnabled: handleModuleEnabled,
      onModuleDisabled: handleModuleDisabled,
    });

    // Cleanup function
    return () => {
      // Reset handlers to avoid memory leaks
      WebSocketService.setEventHandlers({});
    };
  }, []);

  if (loading) {
    return null; // or a loading spinner
  }

  const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: theme.colors.background.primary,
      borderTopWidth: 0,
      elevation: Platform.OS === 'android' ? 8 : 0,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      height: Platform.OS === 'ios' ? 85 : 65,
      paddingBottom: Platform.OS === 'ios' ? 25 : 8,
      paddingTop: 8,
    },
    header: {
      backgroundColor: theme.colors.background.primary,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
  });

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.interactive.primary,
        tabBarInactiveTintColor: theme.colors.text.tertiary,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 2,
        },
        headerStyle: styles.header,
        headerTintColor: theme.colors.text.primary,
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '700',
        },
        headerShadowVisible: true,
      }}
    >
      {/* Home is always enabled */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => (
            <HomeIcon color={color} size={size} />
          ),
        }}
      />
      
      {/* Sports tab - enabled with betting module */}
      {enabledModules.includes('betting') && (
        <Tab.Screen
          name="Sports"
          component={SportsScreen}
          options={{
            title: 'Esportes',
            tabBarIcon: ({ color, size }) => (
              <SportsIcon color={color} size={size} />
            ),
          }}
        />
      )}
      
      {/* Casino tab - enabled with casino module */}
      {enabledModules.includes('casino') && (
        <Tab.Screen
          name="Casino"
          component={CasinoScreen}
          options={{
            title: 'Casino',
            tabBarIcon: ({ color, size }) => (
              <CasinoIcon color={color} size={size} />
            ),
          }}
        />
      )}
      
      {/* Lottery tab - enabled with lottery module */}
      {enabledModules.includes('lottery') && (
        <Tab.Screen
          name="Lottery"
          component={LotteryScreen}
          options={{
            title: 'Loteria',
            tabBarIcon: ({ color, size }) => (
              <LotteryIcon color={color} size={size} />
            ),
          }}
        />
      )}
      
      {/* Profile is always enabled */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <ProfileIcon color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};