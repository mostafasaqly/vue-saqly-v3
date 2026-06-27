// types.ts — Shared TypeScript interfaces for the course
// الواجهات المشتركة بـ TypeScript

// ===== USER =====
export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user' | 'guest'
  isActive: boolean
  createdAt: string
}

// ===== PRODUCT =====
export interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  image: string
  rating: number
  stock: number
}

// ===== CART =====
export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image?: string
}

// ===== TASK =====
export type TaskStatus = 'pending' | 'active' | 'done'

export interface Task {
  id: number
  title: string
  description?: string
  status: TaskStatus
  createdAt: string
  updatedAt: string
}

// ===== API RESPONSE =====
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// ===== PAGINATION =====
export interface PaginationParams {
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
  search?: string
}

// ===== FORM =====
export interface LoginForm {
  email: string
  password: string
  rememberMe: boolean
}

export interface RegisterForm {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}
