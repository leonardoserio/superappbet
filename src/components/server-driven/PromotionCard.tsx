import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/design-system';
import { ServerDrivenComponentProps } from './types';

interface PromotionCardProps extends ServerDrivenComponentProps {
  title: string;
  description?: string;
  imageUrl?: string;
  validUntil?: string;
  ctaText?: string;
  ctaAction?: any;
  terms?: string;
  priority?: number;
  actions?: Array<{
    type: string;
    payload: any;
  }>;
}

export const PromotionCard: React.FC<PromotionCardProps> = ({
  schema,
  title,
  description,
  imageUrl,
  validUntil,
  ctaText = 'Participar',
  ctaAction,
  terms,
  priority = 5,
  actions = [],
}) => {
  const { theme } = useTheme();

  const handlePress = () => {
    if (ctaAction) {
      console.log('CTA Action:', ctaAction);
    }
    
    actions.forEach(action => {
      console.log('Promotion action:', action);
    });
  };

  const formatValidUntil = (dateString?: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return `Válido até ${date.toLocaleDateString('pt-BR')}`;
    } catch {
      return '';
    }
  };

  const isHighPriority = priority >= 8;
  const isMediumPriority = priority >= 5;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: isHighPriority 
        ? theme.colors.interactive.primary 
        : theme.colors.background.secondary,
      borderRadius: 12,
      overflow: 'hidden',
      marginVertical: 8,
      marginHorizontal: 16,
      shadowColor: theme.colors.text.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
    },
    imageContainer: {
      height: 120,
      backgroundColor: theme.colors.background.accent,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    imagePlaceholder: {
      fontSize: 48,
    },
    content: {
      padding: 16,
    },
    header: {
      marginBottom: 12,
    },
    title: {
      fontSize: isHighPriority ? 20 : 18,
      fontWeight: 'bold',
      color: isHighPriority 
        ? '#ffffff' 
        : theme.colors.text.primary,
      marginBottom: 4,
    },
    description: {
      fontSize: 14,
      color: isHighPriority 
        ? 'rgba(255, 255, 255, 0.9)' 
        : theme.colors.text.secondary,
      lineHeight: 20,
    },
    validUntil: {
      fontSize: 12,
      color: isHighPriority 
        ? 'rgba(255, 255, 255, 0.8)' 
        : theme.colors.text.tertiary,
      marginTop: 8,
      fontStyle: 'italic',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 16,
    },
    ctaButton: {
      backgroundColor: isHighPriority 
        ? 'rgba(255, 255, 255, 0.2)' 
        : theme.colors.interactive.primary,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
      borderWidth: isHighPriority ? 1 : 0,
      borderColor: isHighPriority ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
    },
    ctaText: {
      fontSize: 14,
      fontWeight: '600',
      color: isHighPriority ? '#ffffff' : '#ffffff',
    },
    terms: {
      fontSize: 10,
      color: isHighPriority 
        ? 'rgba(255, 255, 255, 0.7)' 
        : theme.colors.text.tertiary,
      flex: 1,
      marginRight: 12,
    },
    priorityBadge: {
      position: 'absolute',
      top: 12,
      right: 12,
      backgroundColor: '#ff4444',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    priorityText: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#ffffff',
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      {isHighPriority && (
        <View style={styles.priorityBadge}>
          <Text style={styles.priorityText}>ESPECIAL</Text>
        </View>
      )}
      
      {imageUrl && (
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: imageUrl }} 
            style={styles.image}
            onError={() => console.log('Failed to load promotion image')}
          />
        </View>
      )}
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          {description && (
            <Text style={styles.description}>{description}</Text>
          )}
          {validUntil && (
            <Text style={styles.validUntil}>{formatValidUntil(validUntil)}</Text>
          )}
        </View>
        
        <View style={styles.footer}>
          {terms && (
            <Text style={styles.terms}>{terms}</Text>
          )}
          
          <TouchableOpacity style={styles.ctaButton} onPress={handlePress}>
            <Text style={styles.ctaText}>{ctaText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};