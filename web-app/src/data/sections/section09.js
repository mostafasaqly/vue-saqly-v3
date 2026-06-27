export default {
  id: 9,
  title: "النماذج في Vue",
  titleEn: "Forms in Vue",
  level: "متوسط",
  levelEn: "Intermediate",
  lessons: [
    "نظرة عامة على النماذج",
    "حقول النص بـ v-model",
    "Checkbox — فردي ومتعدد",
    "Radio Buttons",
    "Select — منفرد ومتعدد",
    "بناء Custom Input بـ defineModel",
    "التحقق من المدخلات (Validation)",
    "Touched Fields — الخطأ عند المغادرة فقط",
    "معالجة Submit وإعادة التعيين",
    "مكتبات الـ Validation",
  ],
  lessonsEn: [
    "Forms Overview",
    "Text Inputs with v-model",
    "Checkbox — Single & Multiple",
    "Radio Buttons",
    "Select — Single & Multiple",
    "Custom Input Components with defineModel",
    "Form Validation",
    "Touched Fields — Show Errors After Blur",
    "Submit Handling & Form Reset",
    "Validation Libraries",
  ],
  intro: "نتعلم التعامل الكامل مع النماذج في Vue — من v-model البسيط إلى بناء custom inputs مع validation احترافي.",
  introEn: "Learn complete form handling in Vue — from basic v-model to building custom inputs with professional validation.",
  content: [
    { type: "heading", text: "أنواع حقول الإدخال مع v-model" },
    { type: "code", code: `<script setup>
import { ref, reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  password: '',
  age: 0,
  gender: '',
  country: '',
  agree: false,
  hobbies: [],
  notes: '',
})
</script>

<template>
  <!-- Text -->
  <input v-model="form.name" type="text" placeholder="الاسم" />

  <!-- Email + Trim -->
  <input v-model.trim="form.email" type="email" placeholder="البريد" />

  <!-- Number -->
  <input v-model.number="form.age" type="number" min="0" max="99" />

  <!-- Password -->
  <input v-model="form.password" type="password" />

  <!-- Textarea -->
  <textarea v-model="form.notes" rows="4"></textarea>

  <!-- Checkbox — فردي -->
  <input type="checkbox" v-model="form.agree" id="agree" />
  <label for="agree">أوافق على الشروط</label>

  <!-- Checkboxes — متعددة (→ array) -->
  <input type="checkbox" v-model="form.hobbies" value="reading" id="h1" />
  <label for="h1">قراءة</label>
  <input type="checkbox" v-model="form.hobbies" value="coding" id="h2" />
  <label for="h2">برمجة</label>

  <!-- Radio -->
  <input type="radio" v-model="form.gender" value="male" id="m" />
  <label for="m">ذكر</label>
  <input type="radio" v-model="form.gender" value="female" id="f" />
  <label for="f">أنثى</label>

  <!-- Select -->
  <select v-model="form.country">
    <option value="">— اختر —</option>
    <option value="sa">السعودية</option>
    <option value="eg">مصر</option>
    <option value="jo">الأردن</option>
  </select>

  <p>{{ form }}</p>
</template>` },
    { type: "heading", text: "بناء BaseInput مع defineModel" },
    { type: "code", code: `<!-- BaseInput.vue -->
<script setup>
import { useId } from 'vue'

const model = defineModel({ type: String, default: '' })

defineProps({
  label: { type: String, required: true },
  type: { type: String, default: 'text' },
  placeholder: String,
  error: String,
  required: Boolean,
})

const id = useId()  // ID فريد لكل instance — يربط label بـ input
</script>

<template>
  <div class="field">
    <label :for="id" class="field__label">
      {{ label }}
      <span v-if="required" class="field__required">*</span>
    </label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="model"
      :class="['field__input', { 'field__input--error': error }]"
      @input="model = ($event.target as HTMLInputElement).value"
    />
    <Transition name="fade">
      <span v-if="error" class="field__error">{{ error }}</span>
    </Transition>
  </div>
</template>

<style scoped>
.field { display: flex; flex-direction: column; gap: .25rem; }
.field__input--error { border-color: #e53e3e; }
.field__error { color: #e53e3e; font-size: .85rem; }
.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>` },
    { type: "heading", text: "نموذج التسجيل مع Validation كامل" },
    { type: "code", code: `<!-- RegisterForm.vue -->
<script setup>
import { reactive, computed } from 'vue'
import BaseInput from '@/components/BaseInput.vue'

const form = reactive({ name: '', email: '', password: '' })
const touched = reactive({ name: false, email: false, password: false })
const errors = reactive({ name: '', email: '', password: '' })

function validateField(field) {
  if (field === 'name' || field === 'all') {
    errors.name = form.name.trim().length < 2 ? 'الاسم يجب أن يكون حرفين على الأقل' : ''
  }
  if (field === 'email' || field === 'all') {
    errors.email = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? 'البريد الإلكتروني غير صالح' : ''
  }
  if (field === 'password' || field === 'all') {
    errors.password = form.password.length < 8 ? 'كلمة المرور 8 أحرف على الأقل' : ''
  }
}

function onBlur(field) {
  touched[field] = true
  validateField(field)
}

const isValid = computed(() =>
  Object.values(errors).every(e => !e) &&
  Object.values(form).every(v => v.trim?.() ?? v)
)

async function onSubmit() {
  // تحقق من الكل عند Submit
  Object.keys(touched).forEach(k => { touched[k] = true })
  validateField('all')
  if (!isValid.value) return

  console.log('إرسال:', form)
}

function reset() {
  Object.assign(form, { name: '', email: '', password: '' })
  Object.assign(touched, { name: false, email: false, password: false })
  Object.assign(errors, { name: '', email: '', password: '' })
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="form" novalidate>
    <BaseInput
      v-model="form.name"
      label="الاسم"
      placeholder="مصطفى سقلى"
      required
      :error="touched.name ? errors.name : ''"
      @blur="onBlur('name')"
    />

    <BaseInput
      v-model="form.email"
      label="البريد الإلكتروني"
      type="email"
      placeholder="mail@example.com"
      required
      :error="touched.email ? errors.email : ''"
      @blur="onBlur('email')"
    />

    <BaseInput
      v-model="form.password"
      label="كلمة المرور"
      type="password"
      required
      :error="touched.password ? errors.password : ''"
      @blur="onBlur('password')"
    />

    <div class="form__actions">
      <button type="button" @click="reset">إعادة تعيين</button>
      <button type="submit" :disabled="!isValid">إنشاء الحساب</button>
    </div>
  </form>
</template>` },
    { type: "tip", text: "استخدم نمط touched لإظهار أخطاء الحقل فقط بعد أن يتفاعل المستخدم معه — لا تُظهر خطأ 'البريد مطلوب' فور فتح الصفحة." },
    { type: "heading", text: "إعادة تعيين النموذج" },
    { type: "code", code: `// pattern بسيط وفعّال لـ reset
const INITIAL_STATE = { name: '', email: '', password: '' }
const form = reactive({ ...INITIAL_STATE })

function reset() {
  Object.assign(form, INITIAL_STATE)
}` },
    { type: "heading", text: "مكتبات الـ Validation" },
    { type: "list", items: [
      "VeeValidate — المكتبة الأشهر في نظام Vue، تدعم Yup وZod كـ schema",
      "valibot — بديل حديث وخفيف لـ Zod",
      "Zod — Type-safe schema validation، ممتاز مع TypeScript",
      "للمشاريع الصغيرة: validation يدوي كما في هذا القسم يكفي تماماً",
    ]},
    { type: "heading", text: "✅ مراجعة" },
    { type: "qa", question: "ما هو الفرق بين v-model.number وv-model.trim؟", answer: "v-model.number يحوّل قيمة الحقل إلى رقم تلقائياً بدلاً من string (مفيد لـ number inputs). v-model.trim يزيل المسافات من بداية ونهاية النص تلقائياً قبل تحديث الـ ref." },
    { type: "qa", question: "لماذا نستخدم defineModel في Custom Input Components؟", answer: "defineModel يُبسّط التوافق مع v-model في الـ parent. بدونه تحتاج: prop: { modelValue: String }، وإرسال emit('update:modelValue', val) عند كل تغيير. مع defineModel سطر واحد يُنجز كل ذلك." },
    { type: "qa", question: "ما هو نمط touched وما مشكلة الـ validation بدونه؟", answer: "بدون touched، تُظهر أخطاء validation فور فتح الصفحة — المستخدم يرى 'الاسم مطلوب' قبل أن يضغط على الصفحة. touched = { field: false } يتتبع هل تفاعل المستخدم مع الحقل. الخطأ يظهر فقط إذا كان touched[field] === true." },
    { type: "qa", question: "لماذا نستخدم useId مع BaseInput؟", answer: "useId (Vue 3.5) يولّد ID فريداً مستقراً لكل instance من الـ component. نستخدمه لربط <label :for=\"id\"> مع <input :id=\"id\"> — ضروري للـ accessibility (الضغط على الـ label يُركّز الـ input) وآمن مع SSR." },
  ],
  contentEn: [
    { type: "heading", text: "Form Inputs with v-model" },
    { type: "code", code: `<script setup>
import { reactive } from 'vue'
const form = reactive({
  name: '',
  email: '',
  agree: false,
  hobbies: [],
  gender: '',
  country: '',
})
</script>

<template>
  <input v-model.trim="form.name" placeholder="Name" />
  <input v-model="form.email" type="email" />
  <textarea v-model="form.notes" />

  <!-- Single checkbox -->
  <input type="checkbox" v-model="form.agree" />

  <!-- Multiple checkboxes → array -->
  <input type="checkbox" v-model="form.hobbies" value="coding" />

  <!-- Radio -->
  <input type="radio" v-model="form.gender" value="male" />

  <!-- Select -->
  <select v-model="form.country">
    <option value="us">United States</option>
  </select>
</template>` },
    { type: "heading", text: "BaseInput with defineModel" },
    { type: "code", code: `<!-- BaseInput.vue -->
<script setup>
import { useId } from 'vue'
const model = defineModel({ type: String, default: '' })
defineProps({ label: String, error: String, type: { default: 'text' } })
const id = useId()
</script>

<template>
  <div class="field">
    <label :for="id">{{ label }}</label>
    <input
      :id :type
      :value="model"
      @input="model = $event.target.value"
      :class="{ 'error': error }"
    />
    <span v-if="error" class="error-msg">{{ error }}</span>
  </div>
</template>` },
    { type: "heading", text: "Form Validation with Touched Fields" },
    { type: "code", code: `<script setup>
import { reactive, computed } from 'vue'

const form = reactive({ name: '', email: '', password: '' })
const touched = reactive({ name: false, email: false, password: false })
const errors = reactive({ name: '', email: '', password: '' })

function validate(field) {
  if (field === 'name' || field === 'all')
    errors.name = form.name.length < 2 ? 'Name must be at least 2 characters' : ''
  if (field === 'email' || field === 'all')
    errors.email = !/^[^\s@]+@[^\s@]+/.test(form.email) ? 'Invalid email' : ''
  if (field === 'password' || field === 'all')
    errors.password = form.password.length < 8 ? 'At least 8 characters' : ''
}

function onBlur(field) {
  touched[field] = true
  validate(field)
}

const isValid = computed(() => Object.values(errors).every(e => !e))

function onSubmit() {
  Object.keys(touched).forEach(k => (touched[k] = true))
  validate('all')
  if (!isValid.value) return
  console.log('submitting', form)
}
</script>` },
    { type: "tip", text: "Show field errors only when touched[field] is true — don't show 'required' errors before the user has interacted with the field." },
    { type: "heading", text: "✅ Review" },
    { type: "qa", question: "What is the difference between v-model.number and v-model.trim?", answer: "v-model.number auto-converts the input value to a number (instead of string). v-model.trim automatically strips leading and trailing whitespace before updating the ref." },
    { type: "qa", question: "Why use defineModel in a custom input component?", answer: "defineModel simplifies v-model compatibility with the parent. Without it, you need a modelValue prop and manually emit update:modelValue on every change. defineModel handles all of that in one line." },
    { type: "qa", question: "What is the touched pattern in form validation?", answer: "touched tracks whether the user has interacted with a field. Errors are only shown when touched[field] is true — so 'Name is required' doesn't appear the moment the page loads. Errors appear after the user focuses and leaves (blur) a field." },
  ],
};
