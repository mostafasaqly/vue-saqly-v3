# Section 9: Forms in Vue

> **Vue 3 Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | v-model with Text Inputs |
| 2 | v-model with Checkbox & Radio |
| 3 | v-model with Select |
| 4 | Custom Input Component with defineModel |
| 5 | Form Validation (Reactive) |
| 6 | Handling Form Submit |
| 7 | Resetting the Form |

## Key Concepts

- **`v-model`** — Works with text, checkbox, radio, select, and textarea inputs.
- **`defineModel`** — For building custom input components that work with `v-model`.
- **Reactive Validation** — Use `computed` or `watch` to derive form validation state.
- **`Object.assign()`** — A common way to reset a reactive form object.

## Code Reference

```vue
<script setup>
import { reactive, computed, ref } from 'vue'

const form = reactive({
  name: '',
  email: '',
  age: null,
  gender: '',
  interests: [],
  country: '',
  bio: '',
  acceptTerms: false,
})

const initialForm = { ...form }

const errors = computed(() => {
  const e = {}
  if (!form.name.trim()) e.name = 'Name is required'
  if (!form.email.includes('@')) e.email = 'Invalid email address'
  if (!form.age || form.age < 18) e.age = 'You must be at least 18 years old'
  if (!form.acceptTerms) e.terms = 'You must accept the terms'
  return e
})

const isValid = computed(() => Object.keys(errors.value).length === 0)

const handleSubmit = () => {
  if (!isValid.value) return
  console.log('Form submitted:', form)
}

const resetForm = () => Object.assign(form, initialForm)
</script>
```

## Review Q&A

**Q: How do I build a custom input component that works with `v-model`?**
A: Use `defineModel()` inside the component and bind the value with `v-model="model"` on the native input element.

**Q: What is the best way to validate a form in Vue?**
A: Use a `computed` property to derive errors automatically from the form state — it auto-updates on any change.

## Examples Folder

This section's examples are in `Section 09 - Forms in Vue/examples/`:

- `examples/RegisterForm.vue`

Open `Section 09 - Forms in Vue/examples/` to view the runnable example.

---

**Prev:** Section 08 — Slots & Reusable Components  
**Next:** Section 10 — Composition API
