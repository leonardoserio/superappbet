import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@/design-system';
import { SDUIRenderer } from '@/components/sdui/SDUIRenderer';
import { Icon, WalletIcon } from '@/components/shared/Icon';

export const ProfileScreen: React.FC = () => {
  const { theme } = useTheme();
  
  // Safety check for theme
  if (!theme || !theme.colors) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading theme...</Text>
      </View>
    );
  }

  const menuItems = [
    {
      id: 'wallet',
      title: 'Carteira',
      subtitle: 'Depósitos, saques e histórico',
      icon: 'wallet' as const,
      color: theme.colors.interactive.primary,
      onPress: () => Alert.alert('Carteira', 'Abrir tela da carteira'),
    },
    {
      id: 'history',
      title: 'Histórico de Apostas',
      subtitle: 'Todas as suas apostas',
      icon: 'history' as const,
      color: theme.colors.betting.pending,
      onPress: () => Alert.alert('Histórico', 'Abrir histórico de apostas'),
    },
    {
      id: 'favorites',
      title: 'Favoritos',
      subtitle: 'Jogos e times favoritos',
      icon: 'favorites' as const,
      color: theme.colors.status.danger,
      onPress: () => Alert.alert('Favoritos', 'Abrir favoritos'),
    },
    {
      id: 'notifications',
      title: 'Notificações',
      subtitle: 'Configurações de notificação',
      icon: 'notifications' as const,
      color: theme.colors.interactive.secondary,
      onPress: () => Alert.alert('Notificações', 'Configurações de notificação'),
    },
    {
      id: 'settings',
      title: 'Configurações',
      subtitle: 'Preferências da conta',
      icon: 'settings' as const,
      color: theme.colors.text.tertiary,
      onPress: () => Alert.alert('Configurações', 'Abrir configurações'),
    },
  ];

  const stats = [
    { label: 'Apostas Feitas', value: '127', color: theme.colors.interactive.primary },
    { label: 'Apostas Ganhas', value: '89', color: theme.colors.betting.win },
    { label: 'Taxa de Acerto', value: '70%', color: theme.colors.interactive.secondary },
  ];

  const FallbackComponent = () => {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.background.secondary,
      },
      profileHeader: {
        backgroundColor: theme.colors.background.primary,
        paddingBottom: 20,
      },
      profileBanner: {
        height: 120,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 20,
      },
      profileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: theme.colors.interactive.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        borderWidth: 4,
        borderColor: '#ffffff',
      },
      avatarText: {
        fontSize: 32,
        fontWeight: '700',
        color: '#ffffff',
      },
      userInfo: {
        flex: 1,
      },
      userName: {
        fontSize: 24,
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: 4,
      },
      userEmail: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: 8,
      },
      memberSince: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.6)',
      },
      balanceSection: {
        backgroundColor: theme.colors.background.primary,
        marginHorizontal: 16,
        marginTop: -10,
        borderRadius: 16,
        padding: 20,
        elevation: 4,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      balanceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      },
      balanceTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text.tertiary,
      },
      balanceAmount: {
        fontSize: 32,
        fontWeight: '800',
        color: theme.colors.interactive.primary,
      },
      balanceActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
      },
      balanceButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 4,
      },
      depositButton: {
        backgroundColor: theme.colors.betting.win,
      },
      withdrawButton: {
        backgroundColor: theme.colors.background.tertiary,
      },
      buttonText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#ffffff',
      },
      withdrawButtonText: {
        color: theme.colors.text.primary,
      },
      statsSection: {
        marginHorizontal: 16,
        marginTop: 20,
        backgroundColor: theme.colors.background.primary,
        borderRadius: 16,
        padding: 20,
      },
      statsTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: theme.colors.text.primary,
        marginBottom: 16,
      },
      statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      statItem: {
        flex: 1,
        alignItems: 'center',
      },
      statValue: {
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 4,
      },
      statLabel: {
        fontSize: 12,
        color: theme.colors.text.tertiary,
        textAlign: 'center',
      },
      menuSection: {
        margin: 16,
      },
      menuItem: {
        backgroundColor: theme.colors.background.primary,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      menuIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
      },
      menuContent: {
        flex: 1,
      },
      menuTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text.primary,
        marginBottom: 4,
      },
      menuSubtitle: {
        fontSize: 14,
        color: theme.colors.text.tertiary,
      },
      menuArrow: {
        marginLeft: 8,
      },
    });

    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <LinearGradient
              colors={[...theme.colors.gradients.primary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.profileBanner}
            >
              <View style={styles.profileInfo}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>JD</Text>
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>João da Silva</Text>
                  <Text style={styles.userEmail}>joao.silva@email.com</Text>
                  <Text style={styles.memberSince}>Membro desde Março 2024</Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Balance Section */}
          <View style={styles.balanceSection}>
            <View style={styles.balanceHeader}>
              <Text style={styles.balanceTitle}>Saldo Disponível</Text>
              <WalletIcon color={theme.colors.interactive.primary} size={24} />
            </View>
            <Text style={styles.balanceAmount}>R$ 1.250,00</Text>
            
            <View style={styles.balanceActions}>
              <TouchableOpacity 
                style={[styles.balanceButton, styles.depositButton]}
                onPress={() => Alert.alert('Depósito', 'Abrir tela de depósito')}
              >
                <Text style={styles.buttonText}>DEPOSITAR</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.balanceButton, styles.withdrawButton]}
                onPress={() => Alert.alert('Saque', 'Abrir tela de saque')}
              >
                <Text style={[styles.buttonText, styles.withdrawButtonText]}>SACAR</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Stats Section */}
          <View style={styles.statsSection}>
            <Text style={styles.statsTitle}>Suas Estatísticas</Text>
            <View style={styles.statsRow}>
              {stats.map((stat, index) => (
                <View key={index} style={styles.statItem}>
                  <Text style={[styles.statValue, { color: stat.color }]}>
                    {stat.value}
                  </Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.menuSection}>
            {menuItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.menuItem} onPress={item.onPress}>
                <View style={[styles.menuIconContainer, { backgroundColor: `${item.color}20` }]}>
                  <Icon name={item.icon} size={24} color={item.color} />
                </View>
                <View style={styles.menuContent}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
                <View style={styles.menuArrow}>
                  <Icon name="chevron-right" size={20} color={theme.colors.text.tertiary} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <SDUIRenderer
      screenName="profile"
      userId="user123" // In production, get from auth context
      fallbackComponent={FallbackComponent}
      onScreenLoad={(config) => {
        console.log('👤 Profile screen loaded:', config.layout?.type || 'unknown');
      }}
      onError={(error) => {
        console.error('👤 Profile screen error:', error);
      }}
    />
  );
};