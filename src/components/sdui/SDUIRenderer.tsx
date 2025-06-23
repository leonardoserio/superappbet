import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '@/design-system';
import { SDUIService, ScreenConfiguration } from '@/services/sdui/SDUIService';
import { WebSocketService } from '@/services/sdui/WebSocketService';

// Import existing SDUI components
import { Container } from '@/components/server-driven/Container';
import { Button } from '@/components/server-driven/Button';
import { Text as SDUIText } from '@/components/server-driven/Text';
import { BetSlip } from '@/components/server-driven/BetSlip';
import { QuickBetCard } from '@/components/server-driven/QuickBetCard';
import { PromotionCard } from '@/components/server-driven/PromotionCard';
import { GameCard } from '@/components/server-driven/GameCard';

interface SDUIRendererProps {
  screenName: string;
  variant?: string;
  userId?: string;
  fallbackComponent?: React.ComponentType;
  onScreenLoad?: (config: ScreenConfiguration) => void;
  onError?: (error: Error) => void;
}

interface ComponentRegistry {
  [key: string]: React.ComponentType<any>;
}

// Register all SDUI components
const componentRegistry: ComponentRegistry = {
  Container,
  Button,
  Text: SDUIText,
  BetSlip,
  QuickBetCard,
  PromotionCard,
  GameCard,
  // Add new components as they are created
  HeroBanner: Container, // Using Container as placeholder
  LotteryCard: Container,
  GameCarousel: Container,
  LiveScore: Container,
};

export const SDUIRenderer: React.FC<SDUIRendererProps> = ({
  screenName,
  variant = 'default',
  userId,
  fallbackComponent: FallbackComponent,
  onScreenLoad,
  onError,
}) => {
  const [config, setConfig] = useState<ScreenConfiguration | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    loadScreenConfiguration();
    
    // Setup WebSocket handler for real-time screen updates
    const originalHandler = WebSocketService['handlers']?.onScreenUpdated;
    WebSocketService.setEventHandlers({
      onScreenUpdated: (data) => {
        if (data.screenName === screenName && data.variant === variant) {
          console.log(`🖥️ Screen ${screenName} updated via WebSocket`);
          setConfig(data.config);
          onScreenLoad?.(data.config);
        }
        originalHandler?.(data);
      },
    });

    return () => {
      // Cleanup if needed
    };
  }, [screenName, variant, userId]);

  const loadScreenConfiguration = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let screenConfig: ScreenConfiguration;
      
      // Use specific screen methods for better optimization
      switch (screenName) {
        case 'home':
          screenConfig = await SDUIService.getHomeScreen(userId);
          break;
        case 'sports':
          screenConfig = await SDUIService.getSportsScreen(userId);
          break;
        case 'casino':
          screenConfig = await SDUIService.getCasinoScreen(userId);
          break;
        case 'lottery':
          screenConfig = await SDUIService.getLotteryScreen(userId);
          break;
        case 'profile':
          if (!userId) throw new Error('userId required for profile screen');
          screenConfig = await SDUIService.getProfileScreen(userId);
          break;
        default:
          screenConfig = await SDUIService.getScreenConfiguration(screenName, {
            variant,
            userId,
          });
      }
      
      setConfig(screenConfig);
      onScreenLoad?.(screenConfig);
      
      // Track screen view analytics
      SDUIService.trackEvent('screen_view', {
        screenName,
        variant,
        loadTime: Date.now(),
      }, userId);
      
    } catch (err) {
      const error = err as Error;
      console.error(`Failed to load screen ${screenName}:`, error);
      setError(error);
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  const renderComponent = (componentConfig: any, index: number): React.ReactNode => {
    const { id, type, props = {}, children = [], conditions } = componentConfig;
    
    // Check component conditions (platform, user segment, etc.)
    if (conditions && !evaluateConditions(conditions)) {
      return null;
    }

    const ComponentClass = componentRegistry[type];
    
    if (!ComponentClass) {
      console.warn(`Unknown component type: ${type}`);
      return (
        <View key={id || index} style={styles.unknownComponent}>
          <Text style={styles.unknownComponentText}>
            Unknown component: {type}
          </Text>
        </View>
      );
    }

    // Handle component actions
    const enhancedProps = {
      ...props,
      key: id || index,
      onPress: props.onPress || (() => handleComponentAction(componentConfig)),
      children: children.length > 0 ? children.map(renderComponent) : props.children,
    };

    return React.createElement(ComponentClass, enhancedProps);
  };

  const renderSection = (section: any, index: number): React.ReactNode => {
    const { id, type, title, components = [], style = {} } = section;

    switch (type) {
      case 'hero':
        return (
          <View key={id || index} style={[styles.heroSection, style]}>
            {title && (
              <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
                {title}
              </Text>
            )}
            {components.map(renderComponent)}
          </View>
        );

      case 'grid':
        return (
          <View key={id || index} style={[styles.gridSection, style]}>
            {title && (
              <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
                {title}
              </Text>
            )}
            <View style={styles.gridContainer}>
              {components.map((comp: any, idx: number) => (
                <View key={comp.id || idx} style={styles.gridItem}>
                  {renderComponent(comp, idx)}
                </View>
              ))}
            </View>
          </View>
        );

      case 'carousel':
        return (
          <View key={id || index} style={[styles.carouselSection, style]}>
            {title && (
              <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
                {title}
              </Text>
            )}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.carousel}
            >
              {components.map((comp: any, idx: number) => (
                <View key={comp.id || idx} style={styles.carouselItem}>
                  {renderComponent(comp, idx)}
                </View>
              ))}
            </ScrollView>
          </View>
        );

      case 'banner':
        return (
          <View key={id || index} style={[styles.bannerSection, style]}>
            {components.map(renderComponent)}
          </View>
        );

      default:
        return (
          <View key={id || index} style={[styles.defaultSection, style]}>
            {title && (
              <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
                {title}
              </Text>
            )}
            {components.map(renderComponent)}
          </View>
        );
    }
  };

  const renderLayout = (): React.ReactNode => {
    if (!config) return null;

    const { layout } = config;
    const containerStyle = {
      backgroundColor: layout.backgroundColor || theme.colors.background.primary,
    };

    switch (layout.type) {
      case 'scroll':
        return (
          <ScrollView style={[styles.scrollContainer, containerStyle]}>
            {layout.sections?.map(renderSection)}
          </ScrollView>
        );

      case 'tabs':
        // For now, render first tab - in production, implement tab navigation
        const firstTab = layout.tabs?.[0];
        return (
          <ScrollView style={[styles.scrollContainer, containerStyle]}>
            {firstTab?.components?.map(renderComponent)}
          </ScrollView>
        );

      case 'sections':
        return (
          <ScrollView style={[styles.scrollContainer, containerStyle]}>
            {layout.sections?.map(renderSection)}
          </ScrollView>
        );

      case 'grid':
        return (
          <View style={[styles.gridLayout, containerStyle]}>
            {layout.sections?.map(renderSection)}
          </View>
        );

      default:
        return (
          <ScrollView style={[styles.scrollContainer, containerStyle]}>
            <Text style={styles.errorText}>Unknown layout type: {layout.type}</Text>
          </ScrollView>
        );
    }
  };

  const handleComponentAction = (componentConfig: any) => {
    const { actions = [] } = componentConfig;
    
    actions.forEach((action: any) => {
      switch (action.type) {
        case 'navigate':
          // Handle navigation - integrate with your navigation system
          console.log('Navigate action:', action.payload);
          break;
          
        case 'module_action':
          // Execute module action via WebSocket for real-time response
          WebSocketService.executeModuleAction(
            action.payload.module,
            action.payload.action,
            action.payload,
          );
          break;
          
        case 'api_call':
          // Handle API calls
          console.log('API call action:', action.payload);
          break;
          
        case 'analytics_track':
          // Track analytics event
          SDUIService.trackEvent(action.payload.event, action.payload.properties, userId);
          break;
          
        default:
          console.log('Unknown action type:', action.type);
      }
    });
  };

  const evaluateConditions = (conditions: any): boolean => {
    // Implement condition evaluation logic
    // This could check platform, user segment, feature flags, etc.
    
    if (conditions.platform) {
      // Check if current platform is in allowed platforms
      const currentPlatform = 'mobile'; // Get from device info
      if (!conditions.platform.includes(currentPlatform)) {
        return false;
      }
    }
    
    if (conditions.userSegment) {
      // Check user segment - this would come from user data
      // For now, assume user is in 'default' segment
      const userSegment = 'default';
      if (!conditions.userSegment.includes(userSegment)) {
        return false;
      }
    }
    
    if (conditions.featureFlag) {
      // Check feature flag via WebSocket
      WebSocketService.checkFeatureFlag('core', conditions.featureFlag, { userId });
      // For now, assume feature is enabled
      return true;
    }
    
    return true;
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: theme.colors.background.primary }]}>
        <ActivityIndicator size="large" color={theme.colors.interactive.primary} />
        <Text style={[styles.loadingText, { color: theme.colors.text.secondary }]}>
          Loading {screenName}...
        </Text>
      </View>
    );
  }

  if (error) {
    if (FallbackComponent) {
      return <FallbackComponent />;
    }
    
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: theme.colors.background.primary }]}>
        <Text style={[styles.errorText, { color: theme.colors.text.primary }]}>
          Failed to load screen
        </Text>
        <Text style={[styles.errorDetails, { color: theme.colors.text.secondary }]}>
          {error.message}
        </Text>
        <Button
          variant="outline"
          title="Retry"
          onPress={loadScreenConfiguration}
          style={styles.retryButton}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      {renderLayout()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  scrollContainer: {
    flex: 1,
  },
  gridLayout: {
    flex: 1,
  },
  heroSection: {
    padding: 16,
  },
  gridSection: {
    padding: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    marginBottom: 16,
  },
  carouselSection: {
    paddingVertical: 16,
  },
  carousel: {
    paddingLeft: 16,
  },
  carouselItem: {
    marginRight: 16,
    width: 200,
  },
  bannerSection: {
    marginVertical: 8,
  },
  defaultSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  unknownComponent: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginVertical: 4,
  },
  unknownComponentText: {
    color: '#666',
    fontStyle: 'italic',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorDetails: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    marginTop: 16,
  },
});