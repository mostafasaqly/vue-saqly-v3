// useFetch.ts — Typed composable for data fetching
// Composable مكتوب بـ TypeScript لجلب البيانات
import { ref, watchEffect, isRef, type Ref } from 'vue'

// Return type interface
interface UseFetchReturn<T> {
  data: Ref<T | null>
  error: Ref<string | null>
  isLoading: Ref<boolean>
  refetch: () => Promise<void>
}

/**
 * useFetch — Generic typed data fetching composable
 * @param url - A string URL or a Ref<string> for reactive URLs
 * @returns data, error, isLoading, refetch
 */
export function useFetch<T>(url: string | Ref<string>): UseFetchReturn<T> {
  const data = ref<T | null>(null) as Ref<T | null>
  const error = ref<string | null>(null)
  const isLoading = ref<boolean>(false)

  const fetchData = async (): Promise<void> => {
    const resolvedUrl = isRef(url) ? url.value : url
    if (!resolvedUrl) return

    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(resolvedUrl)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      data.value = (await response.json()) as T
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
      data.value = null
    } finally {
      isLoading.value = false
    }
  }

  watchEffect(() => {
    const resolvedUrl = isRef(url) ? url.value : url
    if (resolvedUrl) fetchData()
  })

  return { data, error, isLoading, refetch: fetchData }
}

// Usage with full type inference:
/*
import type { Product } from './types'

const { data: product, isLoading } = useFetch<Product>(
  'https://api.example.com/products/1'
)
// product is typed as Ref<Product | null>
// All properties are autocompleted!
*/
