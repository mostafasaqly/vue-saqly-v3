// useApi.js — Generic API composable
// Composable عام للتعامل مع API calls
import { ref } from 'vue'

/**
 * useApi — wraps any async API call with loading/error/data state
 * يُغلّف أي API call مع حالات التحميل والخطأ والبيانات
 *
 * @param {Function} apiFn - The API function to call
 * @returns {{ data, error, isLoading, execute }}
 */
export function useApi(apiFn) {
  const data = ref(null)
  const error = ref(null)
  const isLoading = ref(false)

  /**
   * Execute the API call with provided arguments
   * @param {...any} args - Arguments to pass to the API function
   */
  const execute = async (...args) => {
    isLoading.value = true
    error.value = null

    try {
      data.value = await apiFn(...args)
      return data.value
    } catch (e) {
      error.value = e.message || 'حدث خطأ غير متوقع'
      return null
    } finally {
      isLoading.value = false
    }
  }

  return { data, error, isLoading, execute }
}

// Usage examples:
/*
import { useApi } from './useApi'
import { postsAPI } from './api/posts'

// In a component:
const { data: posts, isLoading, error, execute: fetchPosts } = useApi(postsAPI.getAll)
const { data: newPost, execute: createPost } = useApi(postsAPI.create)

onMounted(() => fetchPosts({ _limit: 10 }))

const handleCreate = async () => {
  const post = await createPost({ title: 'New Post', body: '...', userId: 1 })
  if (post) console.log('Created:', post)
}
*/
