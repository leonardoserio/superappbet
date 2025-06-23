import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/design-system';
import { ServerDrivenComponentProps } from './types';

interface GameCardProps extends ServerDrivenComponentProps {
  gameId: string;
  title: string;
  category?: string;
  imageUrl?: string;
  jackpot?: string;
  rtp?: string;
  features?: string[];
  minBet?: string;
  maxBet?: string;
  dealer?: string;
  players?: number;
  actions?: Array<{
    type: string;
    payload: any;
  }>;
}

export const GameCard: React.FC<GameCardProps> = ({
  schema: _schema,
  gameId,
  title,
  category,
  imageUrl,
  jackpot,
  rtp,
  features = [],
  minBet,
  maxBet,
  dealer,
  players,
  actions = [],
}) => {
  const { theme } = useTheme();

  const handlePress = () => {
    actions.forEach(action => {
      console.log('GameCard action:', action);
    });
  };

  const isLiveGame = dealer || players;
  const isJackpotGame = !!jackpot;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background.secondary,
      borderRadius: 12,
      overflow: 'hidden',
      marginVertical: 8,
      marginHorizontal: 8,
      shadowColor: theme.colors.text.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      width: 180,
    },
    imageContainer: {
      height: 120,
      backgroundColor: theme.colors.background.accent,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    imagePlaceholder: {
      fontSize: 36,
      color: theme.colors.text.secondary,
    },
    categoryBadge: {
      position: 'absolute',
      top: 8,
      left: 8,
      backgroundColor: theme.colors.interactive.primary,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 8,
    },
    categoryText: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#ffffff',
    },
    jackpotBadge: {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: '#ffd700',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 8,
    },
    jackpotText: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#000000',
    },
    liveBadge: {
      position: 'absolute',
      bottom: 8,
      left: 8,
      backgroundColor: '#ff4444',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    liveDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: '#000',
      marginRight: 4,
    },
    liveText: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#ffffff',
    },
    content: {
      padding: 12,
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.colors.text.primary,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 12,
      color: theme.colors.text.secondary,
      marginBottom: 8,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    infoLabel: {
      fontSize: 10,
      color: theme.colors.text.tertiary,
    },
    infoValue: {
      fontSize: 10,
      fontWeight: '600',
      color: theme.colors.text.primary,
    },
    features: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 8,
    },
    featureTag: {
      backgroundColor: theme.colors.background.accent,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
      marginRight: 4,
      marginBottom: 4,
    },
    featureText: {
      fontSize: 9,
      color: theme.colors.text.secondary,
    },
    footer: {
      borderTopWidth: 1,
      borderTopColor: theme.colors.border.primary,
      paddingTop: 8,
      marginTop: 8,
    },
    jackpotAmount: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#ffd700',
      textAlign: 'center',
    },
    betRange: {
      fontSize: 11,
      color: theme.colors.text.secondary,
      textAlign: 'center',
    },
    liveInfo: {
      alignItems: 'center',
    },
    dealerName: {
      fontSize: 11,
      fontWeight: '600',
      color: theme.colors.text.primary,
    },
    playersCount: {
      fontSize: 10,
      color: theme.colors.text.secondary,
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image 
            source={{ uri: imageUrl }} 
            style={styles.image}
            onError={() => console.log(`Failed to load image for game ${gameId}`)}
          />
        ) : (
          <Text style={styles.imagePlaceholder}>🎮</Text>
        )}
        
        {category && (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{category}</Text>
          </View>
        )}
        
        {isJackpotGame && (
          <View style={styles.jackpotBadge}>
            <Text style={styles.jackpotText}>JACKPOT</Text>
          </View>
        )}
        
        {isLiveGame && (
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>AO VIVO</Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {category && <Text style={styles.subtitle}>{category}</Text>}
        
        {rtp && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>RTP:</Text>
            <Text style={styles.infoValue}>{rtp}</Text>
          </View>
        )}
        
        {minBet && maxBet && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Aposta:</Text>
            <Text style={styles.infoValue}>{minBet} - {maxBet}</Text>
          </View>
        )}
        
        {features.length > 0 && (
          <View style={styles.features}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureTag}>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        )}
        
        {(isJackpotGame || isLiveGame || (minBet && maxBet)) && (
          <View style={styles.footer}>
            {isJackpotGame && jackpot && (
              <Text style={styles.jackpotAmount}>{jackpot}</Text>
            )}
            
            {isLiveGame && (
              <View style={styles.liveInfo}>
                {dealer && (
                  <Text style={styles.dealerName}>Dealer: {dealer}</Text>
                )}
                {players && (
                  <Text style={styles.playersCount}>{players} jogadores</Text>
                )}
              </View>
            )}
            
            {!isJackpotGame && !isLiveGame && minBet && maxBet && (
              <Text style={styles.betRange}>{minBet} - {maxBet}</Text>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};