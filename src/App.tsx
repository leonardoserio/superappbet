import React, { useEffect, useState } from 'react';
import { StatusBar, View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider, useTheme } from '@/design-system';
import { TabNavigator } from '@/navigation';
import { ModuleService } from '@/services/ModuleService';
import { SDUIService } from '@/services/sdui/SDUIService';
import { WebSocketService } from '@/services/sdui/WebSocketService';

const AppContent: React.FC = () => {
  const { theme, isDark } = useTheme();
  const [isInitializing, setIsInitializing] = useState(true);
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        setIsInitializing(true);
        setInitError(null);
        
        // Initialize SDUI service first
        console.log('🚀 Initializing SDUI services...');
        
        // Initialize WebSocket connection
        await WebSocketService.connect();
        
        // Setup WebSocket event handlers
        WebSocketService.setEventHandlers({
          onModuleEnabled: async (data) => {
            console.log('📦 Module enabled via WebSocket:', data);
            const moduleService = ModuleService.getInstance();
            if (!moduleService.isModuleEnabled(data.moduleId)) {
              await moduleService.enableModule(data.moduleId, data.config);
            }
          },
          onModuleDisabled: async (data) => {
            console.log('📦 Module disabled via WebSocket:', data);
            const moduleService = ModuleService.getInstance();
            if (moduleService.isModuleEnabled(data.moduleId)) {
              await moduleService.disableModule(data.moduleId, data.reason);
            }
          },
          onModuleConfigUpdated: (data) => {
            console.log('⚙️ Module config updated via WebSocket:', data);
            // Handle module config updates if needed
          },
          onScreenUpdated: (data) => {
            console.log('🖥️ Screen updated via WebSocket:', data);
          },
          onThemeUpdated: (data) => {
            console.log('🎨 Theme updated via WebSocket:', data);
          },
          onForceRefresh: (data) => {
            console.log('🔄 Force refresh requested via WebSocket:', data.reason);
            // Could trigger a complete app refresh here
          },
        });
        
        // Initialize modules (now they will consume from backend)
        const moduleService = ModuleService.getInstance();
        await moduleService.initializeModules();
        
        // Perform health check
        const healthCheck = await SDUIService.healthCheck();
        if (!healthCheck.healthy) {
          console.warn('⚠️ Backend health check failed, using fallback mode');
        }
        
        console.log('✅ App initialized successfully');
        setIsInitializing(false);
      } catch (error) {
        console.error('❌ Failed to initialize app:', error);
        setInitError(error instanceof Error ? error.message : 'Unknown initialization error');
        setIsInitializing(false);
      }
    };
    
    initializeApp();
    
    // Cleanup WebSocket on unmount
    return () => {
      WebSocketService.disconnect();
    };
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.primary,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background.primary,
    },
    loadingText: {
      marginTop: 16,
      fontSize: 16,
      color: theme.colors.text.secondary,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background.primary,
      padding: 24,
    },
    errorTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.text.primary,
      marginBottom: 8,
      textAlign: 'center',
    },
    errorMessage: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      textAlign: 'center',
      lineHeight: 20,
    },
  });

  // Show loading screen during initialization
  if (isInitializing) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar 
          barStyle={isDark ? 'light-content' : 'dark-content'} 
          backgroundColor={theme.colors.background.primary}
        />
        <ActivityIndicator size="large" color={theme.colors.interactive.primary} />
        <Text style={styles.loadingText}>Inicializando SuperAppBet...</Text>
      </View>
    );
  }

  // Show error screen if initialization failed
  if (initError) {
    return (
      <View style={styles.errorContainer}>
        <StatusBar 
          barStyle={isDark ? 'light-content' : 'dark-content'} 
          backgroundColor={theme.colors.background.primary}
        />
        <Text style={styles.errorTitle}>Falha na Inicialização</Text>
        <Text style={styles.errorMessage}>
          Não foi possível conectar com o servidor. Verifique sua conexão e tente novamente.
        </Text>
        <Text style={styles.errorMessage}>
          {initError}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle={isDark ? 'light-content' : 'dark-content'} 
        backgroundColor={theme.colors.background.primary}
      />
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </View>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;