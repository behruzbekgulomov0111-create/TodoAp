import axios, { AxiosInstance, AxiosError } from 'axios';
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  Todo,
  TodoCreate,
  TodoUpdate,
  TodoStatistics
} from '../types';

const BASE_URL = 'https://todo-production-35f6.up.railway.app/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('access_token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/register/', data);
    return response.data;
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/login/', data);
    if (response.data.access) {
      localStorage.setItem('access_token', response.data.access);
    }
    return response.data;
  }

  async logout(): Promise<void> {
    await this.api.post('/logout/');
    localStorage.removeItem('access_token');
  }

  async getTodos(): Promise<Todo[]> {
    const response = await this.api.get<Todo[]>('/todo/');
    return response.data;
  }

  async getTodo(id: number): Promise<Todo> {
    const response = await this.api.get<Todo>(`/todo/${id}/`);
    return response.data;
  }

  async createTodo(data: TodoCreate): Promise<Todo> {
    const response = await this.api.post<Todo>('/todo/', data);
    return response.data;
  }

  async updateTodo(id: number, data: TodoUpdate): Promise<Todo> {
    const response = await this.api.patch<Todo>(`/todo/${id}/`, data);
    return response.data;
  }

  async deleteTodo(id: number): Promise<void> {
    await this.api.delete(`/todo/${id}/`);
  }

  async getStatistics(): Promise<TodoStatistics> {
    const response = await this.api.get<TodoStatistics>('/todo/statistic/');
    return response.data;
  }
}

export const apiService = new ApiService();
