import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/design-system';
import { ServerDrivenComponentProps } from './types';

interface QuickBetCardProps extends ServerDrivenComponentProps {
  eventId: string;
  homeTeam: string;
  awayTeam: string;
  league?: string;
  startTime?: string;
  odds?: {
    home: number;
    draw?: number;
    away: number;
  };
  live?: boolean;
  score?: {
    home: number;
    away: number;
  };
  minute?: string;
  actions?: Array<{
    type: string;
    payload: any;
  }>;
}

export const QuickBetCard: React.FC<QuickBetCardProps> = ({
  schema: _schema,
  eventId: _eventId,
  homeTeam,
  awayTeam,
  league,
  startTime,
  odds,
  live = false,
  score,
  minute,
  actions = [],
}) => {
  const { theme } = useTheme();

  const handlePress = () => {
    actions.forEach(action => {
      console.log('QuickBetCard action:', action);
      // Handle different action types
    });
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return '';
    try {
      const date = new Date(timeString);
      return date.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } catch {
      return timeString;
    }
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background.secondary,
      borderRadius: 12,
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 16,
      shadowColor: theme.colors.text.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    league: {
      fontSize: 12,
      color: theme.colors.text.secondary,
      fontWeight: '500',
    },
    liveIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    liveDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#ff4444',
      marginRight: 4,
    },
    liveText: {
      fontSize: 12,
      color: '#ff4444',
      fontWeight: 'bold',
    },
    matchInfo: {
      marginBottom: 12,
    },
    teams: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    teamContainer: {
      flex: 1,
      alignItems: 'center',
    },
    teamName: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text.primary,
      textAlign: 'center',
    },
    score: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.interactive.primary,
      marginTop: 4,
    },
    vsText: {
      fontSize: 16,
      color: theme.colors.text.secondary,
      fontWeight: 'bold',
      marginHorizontal: 16,
    },
    timeInfo: {
      alignItems: 'center',
    },
    startTime: {
      fontSize: 12,
      color: theme.colors.text.secondary,
    },
    minute: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#ff4444',
    },
    oddsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border.primary,
    },
    oddButton: {
      flex: 1,
      padding: 8,
      marginHorizontal: 4,
      backgroundColor: theme.colors.interactive.primary,
      borderRadius: 6,
      alignItems: 'center',
    },
    oddLabel: {
      fontSize: 10,
      color: '#ffffff',
      marginBottom: 2,
    },
    oddValue: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#ffffff',
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.header}>
        <Text style={styles.league}>{league}</Text>
        {live && (
          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>AO VIVO</Text>
          </View>
        )}
      </View>

      <View style={styles.matchInfo}>
        <View style={styles.teams}>
          <View style={styles.teamContainer}>
            <Text style={styles.teamName}>{homeTeam}</Text>
            {live && score && (
              <Text style={styles.score}>{score.home}</Text>
            )}
          </View>
          
          <View style={styles.timeInfo}>
            {live && minute ? (
              <Text style={styles.minute}>{minute}</Text>
            ) : (
              <Text style={styles.vsText}>VS</Text>
            )}
            {!live && startTime && (
              <Text style={styles.startTime}>{formatTime(startTime)}</Text>
            )}
          </View>
          
          <View style={styles.teamContainer}>
            <Text style={styles.teamName}>{awayTeam}</Text>
            {live && score && (
              <Text style={styles.score}>{score.away}</Text>
            )}
          </View>
        </View>
      </View>

      {odds && (
        <View style={styles.oddsContainer}>
          <TouchableOpacity style={styles.oddButton}>
            <Text style={styles.oddLabel}>1</Text>
            <Text style={styles.oddValue}>{odds.home.toFixed(2)}</Text>
          </TouchableOpacity>
          
          {odds.draw && (
            <TouchableOpacity style={styles.oddButton}>
              <Text style={styles.oddLabel}>X</Text>
              <Text style={styles.oddValue}>{odds.draw.toFixed(2)}</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity style={styles.oddButton}>
            <Text style={styles.oddLabel}>2</Text>
            <Text style={styles.oddValue}>{odds.away.toFixed(2)}</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};