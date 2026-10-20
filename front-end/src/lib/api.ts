import axios from 'axios';
import type { AuthResponse, Order, Product, User } from '@/types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const TOKEN_STORAGE_KEY = 'dzencode_jwt_token';

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  const fromStorage = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (fromStorage) return fromStorage;

  const cookieMatch = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${TOKEN_STORAGE_KEY}=`));
  return cookieMatch ? decodeURIComponent(cookieMatch.split('=')[1]) : null;
}

export function setStoredToken(token: string | null): void {
  if (typeof window === 'undefined') return;
  if (token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    document.cookie = `${TOKEN_STORAGE_KEY}=${encodeURIComponent(token)}; path=/; max-age=86400; SameSite=Lax`;
  } else {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    document.cookie = `${TOKEN_STORAGE_KEY}=; path=/; max-age=0; SameSite=Lax`;
  }
}

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  auth: {
    login: async (email: string, password: string): Promise<AuthResponse> => {
      const { data } = await httpClient.post<AuthResponse>('/auth/login', {
        email,
        password,
      });
      return data;
    },
    me: async (): Promise<User> => {
      const { data } = await httpClient.get<User>('/auth/me');
      return data;
    },
  },

  orders: {
    getAll: async (): Promise<Order[]> => {
      const { data } = await httpClient.get<Order[]>('/orders');
      return data;
    },
    getOne: async (id: number): Promise<Order> => {
      const { data } = await httpClient.get<Order>(`/orders/${id}`);
      return data;
    },
    delete: async (id: number): Promise<Order> => {
      const { data } = await httpClient.delete<Order>(`/orders/${id}`);
      return data;
    },
  },

  products: {
    getAll: async (params?: {
      type?: string;
      specification?: string;
    }): Promise<Product[]> => {
      const { data } = await httpClient.get<Product[]>('/products', { params });
      return data;
    },
    getOne: async (id: number): Promise<Product> => {
      const { data } = await httpClient.get<Product>(`/products/${id}`);
      return data;
    },
    delete: async (id: number): Promise<Product> => {
      const { data } = await httpClient.delete<Product>(`/products/${id}`);
      return data;
    },
  },
};
