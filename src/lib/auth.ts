'use client';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  hotelName: string;
  hotelAddress: string;
}

export interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'MANAGER' | 'STAFF';
  hotelId: string;
  hotel?: {
    id: string;
    name: string;
    address: string;
  };
}

class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const auth = {
  async login(credentials: LoginCredentials): Promise<UserData> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new AuthError(error.error || 'Login failed');
    }

    return response.json();
  },

  async signup(data: SignupData): Promise<UserData> {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new AuthError(error.error || 'Signup failed');
    }

    return response.json();
  },

  async logout(): Promise<void> {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new AuthError(error.error || 'Logout failed');
    }

    window.location.href = '/auth/login';
  },

  async getCurrentUser(): Promise<UserData | null> {
    try {
      const response = await fetch('/api/auth/me');
      if (!response.ok) return null;
      return response.json();
    } catch (error) {
      return null;
    }
  },
}; 