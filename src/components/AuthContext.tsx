import React, { createContext, useMemo, useState, ReactNode } from 'react';
import { accessTokenService } from '../api/accessToken';
import { authService } from '../api/auth';
import { User } from '../types/User';

interface LoginData {
  email: string;
  password: string;
}

interface AuthContextType {
  isChecked: boolean;
  currentUser: User | null;
  checkAuth: () => Promise<void>;
  activate: (activationToken: string) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isChecked, setChecked] = useState(true);

  async function activate(activationToken: string): Promise<void> {
    const { accessToken, user } = await authService.activate(activationToken);

    accessTokenService.save(accessToken);
    setCurrentUser(user);
  }

  async function checkAuth(): Promise<void> {
    try {
      const { accessToken, user } = await authService.refresh();

      accessTokenService.save(accessToken);
      setCurrentUser(user);
    } catch {
      // eslint-disable-next-line no-console
      console.log('User is not authenticated');
    } finally {
      setChecked(true);
    }
  }

  async function login({ email, password }: LoginData): Promise<void> {
    const { accessToken, user } = await authService.login({ email, password });

    accessTokenService.save(accessToken);
    setCurrentUser(user);
  }

  async function logout(): Promise<void> {
    await authService.logout();

    accessTokenService.remove();
    setCurrentUser(null);
  }

  const value = useMemo<AuthContextType>(
    () => ({
      isChecked,
      currentUser,
      checkAuth,
      activate,
      login,
      logout,
    }),
    [currentUser, isChecked],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
