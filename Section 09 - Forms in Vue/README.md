# Section 9: Forms in Vue

> **Vue 3 Complete Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | v-model with Text Inputs |
| 2 | v-model with Checkbox & Radio |
| 3 | v-model with Select & Textarea |
| 4 | Custom Input Component with defineModel |
| 5 | Reactive Form Validation |
| 6 | Touched Fields — Show Errors on Blur |
| 7 | Handling Form Submit |
| 8 | Resetting the Form |

## Key Concepts

- **`v-model` on native inputs** — Two-way binding for `<input>`, `<textarea>`, `<select>`, `<checkbox>`, and `<radio>`. Under the hood it's `:value` + `@input` (or `@change` for select).
- **`defineModel`** — Build a custom input component that the parent can bind with `v-model` in one line.
- **`reactive` for forms** — Grouping all form fields in one `reactive({})` keeps them organized and easy to reset.
- **Computed validation** — A `computed` object of error messages that auto-updates whenever the form changes.
- **Touched tracking** — Only show an error after the user has interacted with a field (on `blur`). Prevents showing red errors on a fresh, untouched form.
- **`Object.assign`** — The simplest way to reset a reactive form object back to its initial values.

## Code Reference

```vue
<!-- RegisterForm.vue — full registration form with validation -->
<script setup>
import { reactive, computed, ref } from 'vue'

// All form fields in one reactive object
const form = reactive({
  name: '',
  email: '',
  password: '',
  age: null,
  gender: '',
  interests: [],
  country: '',
  bio: '',
  acceptTerms: false,
})

// Save initial state for reset
const initialForm = { ...form, interests: [] }

// Track which fields the user has touched (clicked into and left)
const touched = reactive({
  name: false,
  email: false,
  password: false,
  age: false,
})

// Mark a field as touched on blur
const touch = (field) => { touched[field] = true }

// Derived errors — only returns an error if the field is touched
const errors = computed(() => {
  const e = {}

  if (touched.name && !form.name.trim()) {
    e.name = 'Full name is required'
  }

  if (touched.email) {
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Enter a valid email address'
    }
  }

  if (touched.password) {
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters'
  }

  if (touched.age) {
    if (!form.age) e.age = 'Age is required'
    else if (form.age < 18) e.age = 'You must be 18 or older'
  }

  if (!form.acceptTerms) e.terms = 'You must accept the terms and conditions'

  return e
})

const isValid = computed(() => Object.keys(errors.value).length === 0)

const isSubmitting = ref(false)
const submitSuccess = ref(false)

const handleSubmit = async () => {
  // Touch all fields to reveal any hidden errors
  Object.keys(touched).forEach(key => { touched[key] = true })

  if (!isValid.value) return

  isSubmitting.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log('Submitted:', { ...form })
  submitSuccess.value = true
  isSubmitting.value = false
}

const resetForm = () => {
  Object.assign(form, { ...initialForm, interests: [] })
  Object.keys(touched).forEach(key => { touched[key] = false })
  submitSuccess.value = false
}

const countries = ['Egypt', 'Saudi Arabia', 'UAE', 'Jordan', 'USA', 'UK']
const interestOptions = ['Vue', 'React', 'Angular', 'Node.js', 'TypeScript']
const genders = ['Male', 'Female', 'Prefer not to say']
</script>

<template>
  <form @submit.prevent="handleSubmit" class="register-form" novalidate>
    <h2>Create Account</h2>

    <div v-if="submitSuccess" class="success-banner">
      Account created successfully! ✓
    </div>

    <!-- Name -->
    <div class="field">
      <label for="name">Full Name *</label>
      <input
        id="name"
        v-model="form.name"
        @blur="touch('name')"
        :class="{ error: errors.name }"
        placeholder="Sara Ahmed"
        type="text"
      />
      <span v-if="errors.name" class="error-msg">{{ errors.name }}</span>
    </div>

    <!-- Email -->
    <div class="field">
      <label for="email">Email *</label>
      <input
        id="email"
        v-model="form.email"
        @blur="touch('email')"
        :class="{ error: errors.email }"
        placeholder="sara@example.com"
        type="email"
      />
      <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
    </div>

    <!-- Password -->
    <div class="field">
      <label for="password">Password *</label>
      <input
        id="password"
        v-model="form.password"
        @blur="touch('password')"
        :class="{ error: errors.password }"
        type="password"
        placeholder="Minimum 8 characters"
      />
      <span v-if="errors.password" class="error-msg">{{ errors.password }}</span>
    </div>

    <!-- Age -->
    <div class="field">
      <label for="age">Age *</label>
      <input
        id="age"
        v-model.number="form.age"
        @blur="touch('age')"
        :class="{ error: errors.age }"
        type="number"
        min="0"
        max="120"
      />
      <span v-if="errors.age" class="error-msg">{{ errors.age }}</span>
    </div>

    <!-- Gender (radio) -->
    <div class="field">
      <label>Gender</label>
      <div class="radio-group">
        <label v-for="g in genders" :key="g">
          <input type="radio" :value="g" v-model="form.gender" /> {{ g }}
        </label>
      </div>
    </div>

    <!-- Interests (checkboxes → array) -->
    <div class="field">
      <label>Interests</label>
      <div class="checkbox-group">
        <label v-for="opt in interestOptions" :key="opt">
          <input type="checkbox" :value="opt" v-model="form.interests" /> {{ opt }}
        </label>
      </div>
    </div>

    <!-- Country (select) -->
    <div class="field">
      <label for="country">Country</label>
      <select id="country" v-model="form.country">
        <option value="" disabled>Select country</option>
        <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
      </select>
    </div>

    <!-- Bio (textarea) -->
    <div class="field">
      <label for="bio">Bio</label>
      <textarea
        id="bio"
        v-model.trim="form.bio"
        rows="3"
        maxlength="300"
        placeholder="Tell us about yourself..."
      ></textarea>
      <span class="char-count">{{ form.bio.length }} / 300</span>
    </div>

    <!-- Terms (checkbox) -->
    <div class="field checkbox-field">
      <label>
        <input type="checkbox" v-model="form.acceptTerms" />
        I agree to the Terms and Conditions
      </label>
      <span v-if="errors.terms" class="error-msg">{{ errors.terms }}</span>
    </div>

    <!-- Actions -->
    <div class="form-actions">
      <button type="button" @click="resetForm">Reset</button>
      <button type="submit" :disabled="isSubmitting" class="primary">
        {{ isSubmitting ? 'Creating account...' : 'Create Account' }}
      </button>
    </div>
  </form>
</template>

<style scoped>
.register-form { max-width: 480px; margin: 2rem auto; padding: 2rem; border: 1px solid #ddd; border-radius: 8px; font-family: sans-serif; }
.field { margin-bottom: 1rem; display: flex; flex-direction: column; gap: 0.25rem; }
label { font-weight: 600; font-size: 0.9rem; }
input, select, textarea { padding: 0.5rem 0.75rem; border: 1px solid #ccc; border-radius: 6px; font-size: 1rem; }
input.error, select.error { border-color: #e53e3e; }
.error-msg { color: #e53e3e; font-size: 0.8rem; }
.radio-group, .checkbox-group { display: flex; flex-wrap: wrap; gap: 0.75rem; }
.radio-group label, .checkbox-group label { font-weight: 400; display: flex; align-items: center; gap: 0.25rem; }
.char-count { font-size: 0.75rem; color: #888; text-align: right; }
.form-actions { display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 1rem; }
button { padding: 0.5rem 1rem; border-radius: 6px; border: 1px solid #ccc; cursor: pointer; font-size: 1rem; }
button.primary { background: #42b883; color: white; border: none; }
button:disabled { opacity: 0.5; cursor: not-allowed; }
.success-banner { background: #c6f6d5; color: #276749; padding: 0.75rem; border-radius: 6px; margin-bottom: 1rem; }
</style>
```

## Custom Input with defineModel

```vue
<!-- BaseInput.vue — reusable input that supports v-model -->
<script setup>
const model = defineModel({ default: '' })

defineProps({
  label: String,
  type: { type: String, default: 'text' },
  placeholder: String,
  error: String,
})
</script>

<template>
  <div class="field">
    <label v-if="label">{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="model"
      :class="{ error }"
      @input="model = $event.target.value"
    />
    <span v-if="error" class="error-msg">{{ error }}</span>
  </div>
</template>
```

```vue
<!-- Using BaseInput in a form -->
<BaseInput
  v-model="form.name"
  label="Full Name"
  placeholder="Sara Ahmed"
  :error="errors.name"
/>
```

## Review Q&A

**Q: How do I build a custom input component that works with `v-model`?**
A: Use `defineModel()` inside the component. This creates a two-way binding prop that the parent controls with `v-model`. Bind the input's `:value` to the model and update on `@input`.

**Q: What is the best way to validate a form in Vue?**
A: Use a `computed` property that derives error messages from the current form state. It re-evaluates automatically on every change. Combine with a `touched` tracker so errors only show after the user has interacted with each field.

**Q: How do I reset a reactive form?**
A: Save a copy of the initial values (before the user edits anything), then use `Object.assign(form, initialValues)` to restore them. Remember that arrays and objects are references — clone them with spread (`{ ...init }` / `[...arr]`).

**Q: What is the difference between `v-model.number` and `type="number"`?**
A: `type="number"` tells the browser to show a number input, but the value is still a string. `.number` modifier tells Vue to convert the string to a number automatically before updating the reactive variable.

## Examples Folder

- `examples/RegisterForm.vue` — full registration form with touched-based validation

---

**Prev:** [Section 08 — Slots & Reusable Components](../Section%2008%20-%20Slots%20and%20Reusable%20Components/README.md)
**Next:** [Section 10 — Composition API](../Section%2010%20-%20Composition%20API/README.md)
