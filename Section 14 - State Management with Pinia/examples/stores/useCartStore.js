// stores/useCartStore.js — Full cart store with localStorage persistence
// مخزن السلة الكاملة مع الحفظ في localStorage
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

const CART_KEY = 'vue_cart'

export const useCartStore = defineStore('cart', () => {
  // ===== STATE =====
  // Load from localStorage on init
  const items = ref(JSON.parse(localStorage.getItem(CART_KEY) || '[]'))

  // ===== GETTERS =====
  const itemCount = computed(() =>
    items.value.reduce((total, item) => total + item.quantity, 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce((total, item) => total + item.price * item.quantity, 0)
  )

  const isEmpty = computed(() => items.value.length === 0)

  const getItemById = computed(() => (id) =>
    items.value.find((item) => item.id === id)
  )

  // ===== ACTIONS =====
  const addItem = (product) => {
    const existing = items.value.find((i) => i.id === product.id)
    if (existing) {
      existing.quantity += product.quantity || 1
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || '',
        quantity: product.quantity || 1,
      })
    }
  }

  const removeItem = (id) => {
    const index = items.value.findIndex((i) => i.id === id)
    if (index !== -1) items.value.splice(index, 1)
  }

  const updateQuantity = (id, quantity) => {
    const item = items.value.find((i) => i.id === id)
    if (item) {
      if (quantity <= 0) removeItem(id)
      else item.quantity = quantity
    }
  }

  const incrementQuantity = (id) => {
    const item = items.value.find((i) => i.id === id)
    if (item) item.quantity++
  }

  const decrementQuantity = (id) => {
    const item = items.value.find((i) => i.id === id)
    if (item) {
      if (item.quantity <= 1) removeItem(id)
      else item.quantity--
    }
  }

  const clearCart = () => {
    items.value = []
  }

  const isInCart = (id) => items.value.some((i) => i.id === id)

  // ===== PERSISTENCE =====
  // Watch cart and save to localStorage on every change
  watch(
    items,
    (newItems) => {
      localStorage.setItem(CART_KEY, JSON.stringify(newItems))
    },
    { deep: true }
  )

  return {
    // State
    items,
    // Getters
    itemCount,
    totalPrice,
    isEmpty,
    getItemById,
    // Actions
    addItem,
    removeItem,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    isInCart,
  }
})
