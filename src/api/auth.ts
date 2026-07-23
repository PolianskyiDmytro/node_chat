import { authClient } from '../http/authClient.js';
import { User } from '../types/User';

interface Credentials {
  email: string;
  username: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  user: User;
}

function register({ email, username, password }: Credentials) {
  return authClient.post('/register', { email, username, password });
}

async function login({
  email,
  password,
}: Omit<Credentials, 'username'>): Promise<AuthResponse> {
  const response = await authClient.post<AuthResponse>('/login', {
    email,
    password,
  });

  return response.data;
}

function logout() {
  return authClient.post('/logout');
}

async function activate(activationToken: string): Promise<AuthResponse> {
  const response = await authClient.get<AuthResponse>(
    `/activate/${activationToken}`,
  );

  return response.data;
}

async function refresh(): Promise<AuthResponse> {
  const response = await authClient.get<AuthResponse>('/refresh');

  return response.data;
}

export const authService = {
  register,
  login,
  logout,
  activate,
  refresh,
};
