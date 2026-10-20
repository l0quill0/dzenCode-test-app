export type ProductStatus = 'FREE' | 'IN_REPAIR';

export interface Price {
  id: number;
  value: number;
  symbol: string;
  isDefault: number;
  productId: number;
}

export interface Group {
  id: number;
  name: string;
}

export interface User {
  id: number;
  email: string;
  name: string | null;
  avatar: string;
}

export interface Product {
  id: number;
  serialNumber: string;
  isNew: number;
  photo: string;
  title: string;
  type: string;
  specification: string;
  status: ProductStatus;
  statusStart: string;
  statusEnd: string | null;
  guaranteeStart: string;
  guaranteeEnd: string;
  orderId: number;
  groupId: number | null;
  userId: number | null;
  date: string;
  price?: Price[];
  order?: Order;
  group?: Group | null;
  user?: User | null;
}

export interface Order {
  id: number;
  title: string;
  date: string;
  description: string;
  products?: Product[];
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
