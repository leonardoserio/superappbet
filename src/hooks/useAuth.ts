import { useState, useEffect } from 'react';
import { AuthService } from '@/services/auth';

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  token: string | null;
  loading: boolean;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true,
  });

  useEffect(() => {
    const unsubscribe = AuthService.subscribe((authState) => {
      setState({
        ...authState,
        loading: false,
      });
    });

    // Initialize with current state
    setState({
      ...AuthService.getState(),
      loading: false,
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      await AuthService.login(email, password);
    } catch (error) {
      setState(prev => ({ ...prev, loading: false }));
      throw error;
    }
  };

  const logout = async () => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      await AuthService.logout();
    } catch (error) {
      setState(prev => ({ ...prev, loading: false }));
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      await AuthService.register(email, password, name);
    } catch (error) {
      setState(prev => ({ ...prev, loading: false }));
      throw error;
    }
  };

  return {
    ...state,
    login,
    logout,
    register,
  };
};