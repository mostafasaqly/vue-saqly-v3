// useFetch.js — Generic data fetching composable
// Composable عام لجلب البيانات من API
import { ref, watchEffect, isRef } from 'vue'

/**
 * useFetch — fetches data from a URL reactively
 * @param {string | Ref<string>} url - The URL to fetch (can be a ref for reactive URL)
 * @returns {{ data, error, isLoading, refetch }}
 */
export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const isLoading = ref(false)

  const fetchData = async () => {
    const resolvedUrl = isRef(url) ? url.value : url
    if (!resolvedUrl) return

    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(resolvedUrl)
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`)
      }
      data.value = await response.json()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'خطأ غير معروف'
      data.value = null
    } finally {
      isLoading.value = false
    }
  }

  // Auto-fetch when URL changes
  watchEffect(() => {
    const resolvedUrl = isRef(url) ? url.value : url
    if (resolvedUrl) fetchData()
  })

  return {
    data,
    error,
    isLoading,
    refetch: fetchData,
  }
}

/*
Usage examples:

// 1. Static URL
const { data, isLoading, error } = useFetch('https://api.example.com/posts')

// 2. Reactive URL (auto-refetches when URL changes)
const userId = ref(1)
const url = computed(() => `https://api.example.com/users/${userId.value}`)
const { data: user, isLoading } = useFetch(url)

// Then in template:
// <div v-if="isLoading">جاري التحميل...</div>
// <div v-else-if="error">خطأ: {{ error }}</div>
// <pre v-else>{{ data }}</pre>
*/
