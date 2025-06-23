import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/design-system';
import { ServerDrivenComponentProps } from './types';

interface BetSlipProps extends ServerDrivenComponentProps {
  selections?: BetSelection[];
  totalStake?: number;
  potentialReturn?: number;
  isOpen?: boolean;
}

interface BetSelection {
  id: string;
  event: string;
  market: string;
  selection: string;
  odds: number;
  stake?: number;
}

export const BetSlip: React.FC<BetSlipProps> = ({
  schema,
  selections = [],
  totalStake = 0,
  potentialReturn = 0,
  isOpen = false,
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background.secondary,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.border.primary,
      padding: 16,
      margin: 8,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text.primary,
    },
    badge: {
      backgroundColor: theme.colors.interactive.primary,
      borderRadius: 12,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    badgeText: {
      color: theme.colors.text.inverse,
      fontSize: 12,
      fontWeight: '600',
    },
    selection: {
      backgroundColor: theme.colors.background.primary,
      borderRadius: 6,
      padding: 12,
      marginBottom: 8,
      borderLeftWidth: 3,
      borderLeftColor: theme.colors.interactive.primary,
    },
    selectionEvent: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text.primary,
      marginBottom: 4,
    },
    selectionMarket: {
      fontSize: 12,
      color: theme.colors.text.secondary,
      marginBottom: 2,
    },
    selectionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    selectionName: {
      fontSize: 14,
      color: theme.colors.text.primary,
      flex: 1,
    },
    odds: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.betting.odds.positive,
      marginLeft: 12,
    },
    summary: {
      borderTopWidth: 1,
      borderTopColor: theme.colors.border.primary,
      paddingTop: 12,
      marginTop: 12,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 4,
    },
    summaryLabel: {
      fontSize: 14,
      color: theme.colors.text.secondary,
    },
    summaryValue: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text.primary,
    },
    totalReturn: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.colors.betting.win,
    },
  });

  if (!isOpen || selections.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, schema?.props?.style]}>
      <View style={styles.header}>
        <Text style={styles.title}>Bet Slip</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{selections.length}</Text>
        </View>
      </View>

      {selections.map((selection) => (
        <View key={selection.id} style={styles.selection}>
          <Text style={styles.selectionEvent}>{selection.event}</Text>
          <Text style={styles.selectionMarket}>{selection.market}</Text>
          <View style={styles.selectionRow}>
            <Text style={styles.selectionName}>{selection.selection}</Text>
            <Text style={styles.odds}>{selection.odds.toFixed(2)}</Text>
          </View>
        </View>
      ))}

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Stake</Text>
          <Text style={styles.summaryValue}>R$ {totalStake.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Potential Return</Text>
          <Text style={styles.totalReturn}>R$ {potentialReturn.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};