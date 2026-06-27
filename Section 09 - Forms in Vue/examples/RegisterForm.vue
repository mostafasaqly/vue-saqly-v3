<script setup>
// RegisterForm.vue
// Full registration form with all input types + reactive validation
// نموذج تسجيل كامل مع جميع أنواع الحقول والتحقق الرياكتيفي

import { reactive, computed, ref } from 'vue'

// Form state
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  age: '',
  gender: '',
  country: '',
  interests: [],
  newsletter: false,
  acceptTerms: false,
  bio: '',
})

// Initial state for reset
const initialState = { ...form }

const submitted = ref(false)
const isLoading = ref(false)

const countries = ['مصر', 'السعودية', 'الإمارات', 'الكويت', 'الأردن', 'المغرب', 'تونس', 'ليبيا']
const interestOptions = ['Vue.js', 'React', 'Angular', 'Node.js', 'Python', 'DevOps', 'UI/UX', 'Mobile']

// Computed validation errors
const errors = computed(() => {
  const e = {}

  if (!form.firstName.trim())
    e.firstName = 'الاسم الأول مطلوب'
  else if (form.firstName.trim().length < 2)
    e.firstName = 'الاسم قصير جداً'

  if (!form.lastName.trim())
    e.lastName = 'اسم العائلة مطلوب'

  if (!form.email.trim())
    e.email = 'البريد الإلكتروني مطلوب'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    e.email = 'بريد إلكتروني غير صحيح'

  if (!form.password)
    e.password = 'كلمة المرور مطلوبة'
  else if (form.password.length < 8)
    e.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'

  if (form.password !== form.confirmPassword)
    e.confirmPassword = 'كلمتا المرور غير متطابقتين'

  if (!form.age)
    e.age = 'العمر مطلوب'
  else if (Number(form.age) < 13 || Number(form.age) > 120)
    e.age = 'يجب أن يكون العمر بين 13 و 120'

  if (!form.gender)
    e.gender = 'الجنس مطلوب'

  if (!form.country)
    e.country = 'الدولة مطلوبة'

  if (!form.acceptTerms)
    e.acceptTerms = 'يجب الموافقة على الشروط والأحكام'

  return e
})

const isValid = computed(() => Object.keys(errors.value).length === 0)

// Track touched fields to show errors only after user interaction
const touched = reactive({})
const touch = (field) => { touched[field] = true }
const fieldError = (field) => touched[field] ? errors.value[field] : undefined

// Password strength
const passwordStrength = computed(() => {
  const p = form.password
  if (!p) return { level: 0, text: '', color: '' }
  let score = 0
  if (p.length >= 8) score++
  if (p.length >= 12) score++
  if (/[A-Z]/.test(p)) score++
  if (/[0-9]/.test(p)) score++
  if (/[^A-Za-z0-9]/.test(p)) score++

  const levels = [
    { level: 0, text: '', color: '' },
    { level: 1, text: 'ضعيفة', color: '#f44336' },
    { level: 2, text: 'مقبولة', color: '#ff9800' },
    { level: 3, text: 'جيدة', color: '#2196f3' },
    { level: 4, text: 'قوية', color: '#4caf50' },
    { level: 5, text: 'ممتازة', color: '#42b883' },
  ]
  return levels[Math.min(score, 5)]
})

// Submit
const handleSubmit = async () => {
  // Touch all fields
  Object.keys(form).forEach(k => touch(k))

  if (!isValid.value) return

  isLoading.value = true
  // Simulate API call
  await new Promise(r => setTimeout(r, 1500))
  isLoading.value = false
  submitted.value = true
  console.log('Registered:', form)
}

// Reset
const resetForm = () => {
  Object.assign(form, initialState)
  Object.keys(touched).forEach(k => delete touched[k])
  submitted.value = false
}
</script>

<template>
  <div class="form-wrapper" dir="rtl">
    <div v-if="submitted" class="success-msg">
      <h2>✅ تم التسجيل بنجاح!</h2>
      <p>مرحباً {{ form.firstName }} {{ form.lastName }}!</p>
      <button @click="resetForm">تسجيل جديد</button>
    </div>

    <form v-else @submit.prevent="handleSubmit" class="register-form" novalidate>
      <h2>📝 نموذج التسجيل</h2>

      <!-- Name Row -->
      <div class="form-row">
        <div class="form-group" :class="{ error: fieldError('firstName') }">
          <label>الاسم الأول *</label>
          <input
            v-model.trim="form.firstName"
            @blur="touch('firstName')"
            type="text"
            placeholder="أحمد"
          />
          <span class="error-msg">{{ fieldError('firstName') }}</span>
        </div>
        <div class="form-group" :class="{ error: fieldError('lastName') }">
          <label>اسم العائلة *</label>
          <input
            v-model.trim="form.lastName"
            @blur="touch('lastName')"
            type="text"
            placeholder="محمد"
          />
          <span class="error-msg">{{ fieldError('lastName') }}</span>
        </div>
      </div>

      <!-- Email -->
      <div class="form-group" :class="{ error: fieldError('email') }">
        <label>البريد الإلكتروني *</label>
        <input
          v-model.trim="form.email"
          @blur="touch('email')"
          type="email"
          placeholder="ahmed@example.com"
        />
        <span class="error-msg">{{ fieldError('email') }}</span>
      </div>

      <!-- Password -->
      <div class="form-group" :class="{ error: fieldError('password') }">
        <label>كلمة المرور *</label>
        <input
          v-model="form.password"
          @blur="touch('password')"
          type="password"
          placeholder="8 أحرف على الأقل"
        />
        <div v-if="form.password" class="password-strength">
          <div
            class="strength-bar"
            :style="{ width: (passwordStrength.level * 20) + '%', background: passwordStrength.color }"
          ></div>
          <span :style="{ color: passwordStrength.color }">{{ passwordStrength.text }}</span>
        </div>
        <span class="error-msg">{{ fieldError('password') }}</span>
      </div>

      <!-- Confirm Password -->
      <div class="form-group" :class="{ error: fieldError('confirmPassword') }">
        <label>تأكيد كلمة المرور *</label>
        <input
          v-model="form.confirmPassword"
          @blur="touch('confirmPassword')"
          type="password"
          placeholder="أعد كتابة كلمة المرور"
        />
        <span class="error-msg">{{ fieldError('confirmPassword') }}</span>
      </div>

      <!-- Age & Gender Row -->
      <div class="form-row">
        <div class="form-group" :class="{ error: fieldError('age') }">
          <label>العمر *</label>
          <input
            v-model.number="form.age"
            @blur="touch('age')"
            type="number"
            min="13"
            max="120"
            placeholder="25"
          />
          <span class="error-msg">{{ fieldError('age') }}</span>
        </div>

        <div class="form-group" :class="{ error: fieldError('gender') }">
          <label>الجنس *</label>
          <div class="radio-group">
            <label>
              <input v-model="form.gender" @change="touch('gender')" type="radio" value="male" />
              ذكر
            </label>
            <label>
              <input v-model="form.gender" @change="touch('gender')" type="radio" value="female" />
              أنثى
            </label>
          </div>
          <span class="error-msg">{{ fieldError('gender') }}</span>
        </div>
      </div>

      <!-- Country Select -->
      <div class="form-group" :class="{ error: fieldError('country') }">
        <label>الدولة *</label>
        <select v-model="form.country" @blur="touch('country')">
          <option value="">اختر دولتك</option>
          <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
        </select>
        <span class="error-msg">{{ fieldError('country') }}</span>
      </div>

      <!-- Interests Checkboxes -->
      <div class="form-group">
        <label>الاهتمامات (اختياري)</label>
        <div class="checkbox-grid">
          <label v-for="interest in interestOptions" :key="interest" class="checkbox-item">
            <input type="checkbox" v-model="form.interests" :value="interest" />
            {{ interest }}
          </label>
        </div>
      </div>

      <!-- Bio Textarea -->
      <div class="form-group">
        <label>نبذة عنك (اختياري)</label>
        <textarea
          v-model.trim="form.bio"
          rows="3"
          placeholder="أخبرنا عن نفسك..."
          maxlength="300"
        ></textarea>
        <small>{{ form.bio.length }} / 300</small>
      </div>

      <!-- Newsletter -->
      <div class="form-group checkbox-single">
        <label>
          <input type="checkbox" v-model="form.newsletter" />
          أريد استقبال النشرة الإخبارية
        </label>
      </div>

      <!-- Terms -->
      <div class="form-group checkbox-single" :class="{ error: fieldError('acceptTerms') }">
        <label>
          <input
            type="checkbox"
            v-model="form.acceptTerms"
            @change="touch('acceptTerms')"
          />
          أوافق على <a href="#" @click.prevent>الشروط والأحكام</a> *
        </label>
        <span class="error-msg">{{ fieldError('acceptTerms') }}</span>
      </div>

      <!-- Actions -->
      <div class="form-actions">
        <button type="button" @click="resetForm" class="btn-reset">إلغاء</button>
        <button
          type="submit"
          class="btn-submit"
          :disabled="isLoading"
          :class="{ loading: isLoading }"
        >
          {{ isLoading ? 'جاري التسجيل...' : 'تسجيل' }}
        </button>
      </div>

      <!-- Validation summary -->
      <div v-if="!isValid && Object.keys(touched).length" class="validation-summary">
        <p>⚠️ يرجى تصحيح {{ Object.keys(errors).length }} خطأ قبل الإرسال</p>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-wrapper {
  max-width: 640px;
  margin: 2rem auto;
  font-family: 'Segoe UI', sans-serif;
}

.register-form {
  padding: 2rem;
  border-radius: 16px;
  background: white;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
}

h2 { text-align: center; color: #333; margin-bottom: 1.5rem; }

.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

.form-group { margin-bottom: 1.25rem; }

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.4rem;
  color: #333;
  font-size: 0.9rem;
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="number"],
select,
textarea {
  width: 100%;
  padding: 0.6rem 0.9rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: border-color 0.2s;
  box-sizing: border-box;
  font-family: inherit;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #42b883;
}

.form-group.error input,
.form-group.error select,
.form-group.error textarea {
  border-color: #f44336;
}

.error-msg {
  color: #f44336;
  font-size: 0.8rem;
  display: block;
  margin-top: 0.3rem;
  min-height: 1.2em;
}

.password-strength {
  margin-top: 0.5rem;
}

.strength-bar {
  height: 4px;
  border-radius: 2px;
  transition: width 0.3s, background 0.3s;
  margin-bottom: 0.25rem;
}

.radio-group {
  display: flex;
  gap: 1.5rem;
  padding: 0.5rem 0;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: normal;
  cursor: pointer;
}

.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: normal;
  cursor: pointer;
}

.checkbox-single label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: normal;
  cursor: pointer;
}

.checkbox-single a { color: #42b883; }

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.btn-reset, .btn-submit {
  padding: 0.65rem 1.75rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}

.btn-reset { background: #f5f5f5; color: #333; }
.btn-submit { background: #42b883; color: white; }
.btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }

.validation-summary {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #fff3e0;
  border-radius: 8px;
  color: #e65100;
  font-size: 0.9rem;
}

.success-msg {
  text-align: center;
  padding: 3rem;
}

.success-msg button {
  margin-top: 1rem;
  padding: 0.6rem 1.5rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

small { color: #999; font-size: 0.8rem; }
</style>
