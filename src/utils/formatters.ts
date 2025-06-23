export const formatCurrency = (
  amount: number,
  currency: string = 'R$',
  decimals: number = 2
): string => {
  return `${currency} ${amount.toFixed(decimals)}`;
};

export const formatOdds = (odds: number, format: 'decimal' | 'fractional' | 'american' = 'decimal'): string => {
  switch (format) {
    case 'decimal':
      return odds.toFixed(2);
    case 'fractional':
      const numerator = Math.round((odds - 1) * 100);
      const denominator = 100;
      const gcd = greatestCommonDivisor(numerator, denominator);
      return `${numerator / gcd}/${denominator / gcd}`;
    case 'american':
      if (odds >= 2) {
        return `+${Math.round((odds - 1) * 100)}`;
      } else {
        return `-${Math.round(100 / (odds - 1))}`;
      }
    default:
      return odds.toFixed(2);
  }
};

export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${(value * 100).toFixed(decimals)}%`;
};

export const formatDate = (date: string | Date, format: 'short' | 'long' | 'time' = 'short'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  switch (format) {
    case 'short':
      return dateObj.toLocaleDateString();
    case 'long':
      return dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    case 'time':
      return dateObj.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
    default:
      return dateObj.toLocaleDateString();
  }
};

export const formatTimeAgo = (date: string | Date): string => {
  const now = new Date();
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else {
    return formatDate(dateObj);
  }
};

export const formatNumber = (num: number, decimals: number = 0): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(decimals)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(decimals)}K`;
  }
  return num.toFixed(decimals);
};

export const formatBetStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    pending: 'Pending',
    won: 'Won',
    lost: 'Lost',
    void: 'Void',
    partially_won: 'Partially Won',
  };
  
  return statusMap[status] || status;
};

// Helper function for fractional odds
const greatestCommonDivisor = (a: number, b: number): number => {
  return b === 0 ? a : greatestCommonDivisor(b, a % b);
};