export interface User {
  id: number;
  email: string;
  username?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  password2: string;
}

export interface AuthResponse {
  access: string;
  refresh?: string;
  user?: User;
}

export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
  deadline?: string;
}

export interface TodoCreate {
  title: string;
  description?: string;
  completed?: boolean;
  deadline?: string;
}

export interface TodoUpdate {
  title?: string;
  description?: string;
  completed?: boolean;
  deadline?: string;
}

export interface TodoStatistics {
  total: number;
  completed: number;
  pending: number;
}
