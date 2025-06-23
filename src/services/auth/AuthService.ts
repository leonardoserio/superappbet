interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

class AuthServiceClass {
  private listeners: Array<(state: AuthState) => void> = [];
  private state: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
  };

  getState(): AuthState {
    return { ...this.state };
  }

  subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify(): void {
    this.listeners.forEach(listener => listener(this.getState()));
  }

  async login(email: string, password: string): Promise<void> {
    try {
      // Simulate API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const { user, token } = await response.json();

      this.state = {
        isAuthenticated: true,
        user,
        token,
      };

      this.notify();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.state.token}`,
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.state = {
        isAuthenticated: false,
        user: null,
        token: null,
      };

      this.notify();
    }
  }

  async register(email: string, password: string, name: string): Promise<void> {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const { user, token } = await response.json();

      this.state = {
        isAuthenticated: true,
        user,
        token,
      };

      this.notify();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async refreshToken(): Promise<void> {
    if (!this.state.token) {
      throw new Error('No token to refresh');
    }

    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.state.token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const { token } = await response.json();

      this.state = {
        ...this.state,
        token,
      };

      this.notify();
    } catch (error) {
      console.error('Token refresh error:', error);
      await this.logout();
      throw error;
    }
  }

  isTokenExpired(): boolean {
    if (!this.state.token) {
      return true;
    }

    try {
      const payload = JSON.parse(atob(this.state.token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }
}

export const AuthService = new AuthServiceClass();