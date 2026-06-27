// api/posts.js — Posts API service layer
// طبقة خدمة API للمنشورات
import api from './axios'

/**
 * postsAPI — All CRUD operations for posts
 * جميع عمليات CRUD للمنشورات
 */
export const postsAPI = {
  /**
   * Get all posts (with optional filters)
   * GET /posts?_page=1&_limit=10&userId=1
   */
  getAll: (params = {}) => api.get('/posts', { params }),

  /**
   * Get a single post by ID
   * GET /posts/:id
   */
  getById: (id) => api.get(`/posts/${id}`),

  /**
   * Get posts by user ID
   * GET /posts?userId=:userId
   */
  getByUserId: (userId) => api.get('/posts', { params: { userId } }),

  /**
   * Create a new post
   * POST /posts
   */
  create: (data) => api.post('/posts', data),

  /**
   * Update a post (full update)
   * PUT /posts/:id
   */
  update: (id, data) => api.put(`/posts/${id}`, data),

  /**
   * Partially update a post
   * PATCH /posts/:id
   */
  patch: (id, data) => api.patch(`/posts/${id}`, data),

  /**
   * Delete a post
   * DELETE /posts/:id
   */
  delete: (id) => api.delete(`/posts/${id}`),

  /**
   * Search posts by title
   * GET /posts?title_like=:query
   */
  search: (query) => api.get('/posts', { params: { title_like: query } }),
}

// Usage example:
/*
import { postsAPI } from './api/posts'

// In a component or composable:
const posts = await postsAPI.getAll({ _page: 1, _limit: 10 })
const post = await postsAPI.getById(1)
const newPost = await postsAPI.create({ title: 'Hello', body: 'World', userId: 1 })
await postsAPI.update(1, { title: 'Updated' })
await postsAPI.delete(1)
*/
