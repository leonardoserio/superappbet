export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateBetAmount = (amount: number, minBet: number = 1, maxBet: number = 10000): {
  isValid: boolean;
  error?: string;
} => {
  if (amount < minBet) {
    return {
      isValid: false,
      error: `Minimum bet amount is ${minBet}`,
    };
  }
  
  if (amount > maxBet) {
    return {
      isValid: false,
      error: `Maximum bet amount is ${maxBet}`,
    };
  }
  
  if (amount <= 0) {
    return {
      isValid: false,
      error: 'Bet amount must be greater than 0',
    };
  }
  
  return { isValid: true };
};

export const validateOdds = (odds: number): boolean => {
  return odds > 1 && odds <= 1000;
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateAge = (birthDate: string): {
  isValid: boolean;
  age?: number;
  error?: string;
} => {
  const today = new Date();
  const birth = new Date(birthDate);
  
  if (birth > today) {
    return {
      isValid: false,
      error: 'Birth date cannot be in the future',
    };
  }
  
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())
    ? age - 1
    : age;
  
  if (actualAge < 18) {
    return {
      isValid: false,
      age: actualAge,
      error: 'You must be at least 18 years old',
    };
  }
  
  return {
    isValid: true,
    age: actualAge,
  };
};

export const validateRequired = (value: any): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  
  return value !== null && value !== undefined;
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};