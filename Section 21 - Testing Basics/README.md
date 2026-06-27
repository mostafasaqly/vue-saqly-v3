# Section 21: Testing Basics

> **Vue 3 Complete Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | Why Test? Types of Tests |
| 2 | Vitest Setup |
| 3 | Writing Your First Unit Test |
| 4 | Testing Composables |
| 5 | Testing Vue Components with Vue Test Utils |
| 6 | Mounting Components — `mount` vs `shallowMount` |
| 7 | Querying the DOM in Tests |
| 8 | Simulating User Interactions |
| 9 | Testing Pinia Stores |
| 10 | Mocking API Calls |

## Key Concepts

- **Unit test** — Tests a single function or composable in isolation. Fast, no browser needed.
- **Component test** — Mounts a Vue component and tests its rendered output and interactions. Uses Vue Test Utils.
- **Vitest** — A Vite-native test runner. Uses the same config as Vite (no separate setup), supports ESM, and runs tests at Vite speed.
- **Vue Test Utils (VTU)** — The official testing library for Vue components. Provides `mount`, `shallowMount`, and querying helpers.
- **`mount`** — Renders the component and all its children. Use for integration-style component tests.
- **`shallowMount`** — Renders the component but stubs all child components. Use to isolate one component at a time.
- **`wrapper.find` / `wrapper.get`** — Query DOM elements inside the mounted component.
- **`wrapper.trigger('click')`** — Simulate a DOM event.
- **`setActivePinia`** — Initializes Pinia for testing without a Vue app.
- **`vi.fn()`** — Creates a mock function. `vi.spyOn()` spies on an existing function.

## Code Reference

```js
// vitest.config.js — or in vite.config.js under test:
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',    // simulate a browser DOM
    globals: true,           // no need to import describe/it/expect
  },
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})
```

```js
// tests/unit/useCounter.test.js — testing a composable
import { describe, it, expect } from 'vitest'
import { useCounter } from '@/composables/useCounter'

describe('useCounter', () => {
  it('starts at the given initial value', () => {
    const { count } = useCounter(5)
    expect(count.value).toBe(5)
  })

  it('increments the count', () => {
    const { count, increment } = useCounter(0)
    increment()
    expect(count.value).toBe(1)
  })

  it('decrements the count', () => {
    const { count, decrement } = useCounter(3)
    decrement()
    expect(count.value).toBe(2)
  })

  it('does not go below the min', () => {
    const { count, decrement } = useCounter(0, { min: 0 })
    decrement()
    expect(count.value).toBe(0)
  })

  it('resets to initial value', () => {
    const { count, increment, reset } = useCounter(0)
    increment()
    increment()
    reset()
    expect(count.value).toBe(0)
  })
})
```

```js
// tests/unit/TaskList.test.js — testing a Vue component
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskItem from '@/components/TaskItem.vue'

describe('TaskItem', () => {
  const task = { id: '1', title: 'Buy groceries', done: false, dueDate: null }

  it('renders the task title', () => {
    const wrapper = mount(TaskItem, { props: { task } })
    expect(wrapper.text()).toContain('Buy groceries')
  })

  it('shows a checked checkbox when task is done', async () => {
    const doneTask = { ...task, done: true }
    const wrapper = mount(TaskItem, { props: { task: doneTask } })
    const checkbox = wrapper.find('input[type="checkbox"]')
    expect(checkbox.element.checked).toBe(true)
  })

  it('emits toggle event when checkbox is clicked', async () => {
    const wrapper = mount(TaskItem, { props: { task } })
    await wrapper.find('input[type="checkbox"]').trigger('change')
    expect(wrapper.emitted('toggle')).toBeTruthy()
    expect(wrapper.emitted('toggle')[0]).toEqual([task.id])
  })

  it('emits delete event when delete button is clicked', async () => {
    const wrapper = mount(TaskItem, { props: { task } })
    await wrapper.find('button.delete').trigger('click')
    expect(wrapper.emitted('delete')).toBeTruthy()
  })

  it('enters edit mode on double-click of title', async () => {
    const wrapper = mount(TaskItem, { props: { task } })
    await wrapper.find('.task-title').trigger('dblclick')
    expect(wrapper.find('input.edit-input').exists()).toBe(true)
  })
})
```

```js
// tests/unit/useCartStore.test.js — testing a Pinia store
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '@/stores/useCartStore'

describe('useCartStore', () => {
  beforeEach(() => {
    // Create a fresh Pinia before each test
    setActivePinia(createPinia())
  })

  const product = { id: 1, title: 'Vue Shirt', price: 25, image: '/img.png' }

  it('starts with an empty cart', () => {
    const cart = useCartStore()
    expect(cart.items).toHaveLength(0)
    expect(cart.isEmpty).toBe(true)
  })

  it('adds a product to the cart', () => {
    const cart = useCartStore()
    cart.addItem(product)
    expect(cart.items).toHaveLength(1)
    expect(cart.items[0].qty).toBe(1)
  })

  it('increments qty when the same product is added twice', () => {
    const cart = useCartStore()
    cart.addItem(product)
    cart.addItem(product)
    expect(cart.items).toHaveLength(1)
    expect(cart.items[0].qty).toBe(2)
  })

  it('calculates the correct total', () => {
    const cart = useCartStore()
    cart.addItem(product, 3)        // 3 × $25 = $75
    expect(cart.subtotal).toBe(75)
  })

  it('removes a product', () => {
    const cart = useCartStore()
    cart.addItem(product)
    cart.removeItem(product.id)
    expect(cart.isEmpty).toBe(true)
  })

  it('clears the cart', () => {
    const cart = useCartStore()
    cart.addItem(product)
    cart.clearCart()
    expect(cart.items).toHaveLength(0)
  })
})
```

```js
// tests/unit/postsAPI.test.js — mocking API calls
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useApi } from '@/composables/useApi'
import { postsAPI } from '@/api/posts'

// Mock the entire API module
vi.mock('@/api/posts', () => ({
  postsAPI: {
    getAll: vi.fn(),
  },
}))

describe('useApi with mocked postsAPI', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('sets data on success', async () => {
    const mockPosts = [{ id: 1, title: 'Hello' }]
    postsAPI.getAll.mockResolvedValue(mockPosts)

    const { data, isLoading, execute } = useApi(postsAPI.getAll)
    expect(isLoading.value).toBe(false)

    const promise = execute()
    expect(isLoading.value).toBe(true)

    await promise
    expect(isLoading.value).toBe(false)
    expect(data.value).toEqual(mockPosts)
  })

  it('sets error on failure', async () => {
    postsAPI.getAll.mockRejectedValue(new Error('Network error'))

    const { error, execute } = useApi(postsAPI.getAll)
    await execute()
    expect(error.value).toBe('Network error')
  })
})
```

## Test Types Comparison

| Type | What it tests | Speed | Tools |
|------|--------------|-------|-------|
| Unit | Single function / composable | Very fast | Vitest |
| Component | One mounted component | Fast | Vitest + VTU |
| Integration | Multiple components together | Medium | Vitest + VTU |
| E2E | Full user flows in a real browser | Slow | Playwright / Cypress |

## Vitest Commands

```bash
# Run all tests once
npm run test:unit

# Run in watch mode (re-runs on file save)
npx vitest

# Run with UI (browser-based test explorer)
npx vitest --ui

# Run with coverage report
npx vitest --coverage
```

## Review Q&A

**Q: Why use Vitest instead of Jest?**
A: Vitest uses the same Vite config — no extra Babel transform, no separate module resolution setup. It supports ES Modules natively, runs tests in the same environment as your app, and is significantly faster than Jest for Vue + Vite projects.

**Q: What is the difference between `mount` and `shallowMount`?**
A: `mount` renders the component and all its children. `shallowMount` replaces child components with stubs — useful when you only want to test the current component's logic and don't care about children. Use `mount` for more realistic integration tests.

**Q: Why do I need `setActivePinia(createPinia())` in Pinia tests?**
A: Outside of a Vue app, there is no Pinia instance. `setActivePinia(createPinia())` creates a fresh, isolated store for each test. Using it in `beforeEach` ensures no state bleeds between tests.

**Q: Do I need to test every single line?**
A: No. Focus on behavior that matters: critical business logic (cart total, form validation), components that handle user interaction, and composables that manage complex state. Avoid testing implementation details that will change as you refactor.

## Examples Folder

See the course web-app for runnable test files for TaskItem, useCartStore, and useApi.

---

**Prev:** [Section 20 — Project 3: Mini E-Commerce App](../Section%2020%20-%20Project%20Mini%20E-Commerce%20App/README.md)
**Next:** [Section 22 — Deployment](../Section%2022%20-%20Deployment/README.md)
