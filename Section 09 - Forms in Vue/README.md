# القسم 9: النماذج في Vue
# Section 9: Forms in Vue

> **Vue 3 Course — 23 Sections** | القسم 9 من 23

## الدروس | Lessons

| # | بالعربية | In English |
|---|---------|------------|
| 1 | v-model مع حقول النص | v-model with Text Inputs |
| 2 | v-model مع Checkbox و Radio | v-model with Checkbox & Radio |
| 3 | v-model مع Select | v-model with Select |
| 4 | Custom Input بـ defineModel | Custom Input Component with defineModel |
| 5 | التحقق من المدخلات | Form Validation (Reactive) |
| 6 | معالجة Submit | Handling Form Submit |
| 7 | إعادة تعيين النموذج | Resetting the Form |

## المفاهيم الرئيسية | Key Concepts

- **`v-model`** — يعمل مع text, checkbox, radio, select, textarea / Works with all input types.
- **`defineModel`** — لبناء Custom Input Components تعمل مع `v-model` / For building custom input components that work with `v-model`.
- **Reactive Validation** — التحقق باستخدام `computed` أو `watch` / Validation using computed properties or watch.
- **`Object.assign()`** — أسرع طريقة لإعادة تعيين النموذج / The fastest way to reset a reactive form object.

## أمثلة مرجعية | Code Reference

```vue
<script setup>
import { reactive, computed, ref } from 'vue'

// Form state
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

// Initial state for reset
const initialForm = { ...form }

// Validation
const errors = computed(() => {
  const e = {}
  if (!form.name.trim()) e.name = 'الاسم مطلوب'
  if (!form.email.includes('@')) e.email = 'إيميل غير صحيح'
  if (!form.age || form.age < 18) e.age = 'يجب أن تكون 18 سنة أو أكثر'
  if (!form.acceptTerms) e.terms = 'يجب الموافقة على الشروط'
  return e
})

const isValid = computed(() => Object.keys(errors.value).length === 0)

// Submit
const handleSubmit = () => {
  if (!isValid.value) return
  console.log('Form submitted:', form)
}

// Reset
const resetForm = () => Object.assign(form, initialForm)
</script>
```

## أسئلة المراجعة | Review Q&A

**س: كيف أبني Custom Input Component يعمل مع `v-model`؟**
ج: استخدم `defineModel()` داخل الـ component وربط القيمة بـ `v-model="model"` على الـ input مباشرة.

**Q: How do I build a custom input component that works with `v-model`?**
A: Use `defineModel()` inside the component and bind the value with `v-model="model"` on the native input element.

**س: ما أفضل طريقة للتحقق من النموذج في Vue؟**
ج: استخدم `computed` property لحساب الأخطاء تلقائياً بناءً على حالة النموذج — هي تتحدث تلقائياً عند أي تغيير.

**Q: What is the best way to validate a form in Vue?**
A: Use a `computed` property to derive errors automatically from the form state — it auto-updates on any change.

## مجلد الأمثلة | Examples Folder

راجع `examples/` للأكواد التشغيلية لكل درس.
See `examples/` for runnable code for each lesson.

---

**السابق | Prev:** Section 08 — الـ Slots / Slots & Reusable Components  
**التالي | Next:** Section 10 — Composition API
