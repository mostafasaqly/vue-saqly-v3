const e={id:9,title:"النماذج في Vue",titleEn:"Forms in Vue",level:"متوسط",levelEn:"Intermediate",lessons:["نظرة عامة على النماذج","حقول النص بـ v-model","Checkbox","Radio","Select","بناء Custom Input بـ defineModel","التحقق من المدخلات","معالجة Submit","إعادة تعيين النموذج","بناء نموذج قابل لإعادة الاستخدام"],lessonsEn:["Forms Overview","Text Inputs with v-model","Checkbox Inputs","Radio Inputs","Select Inputs","Custom Input Components with defineModel","Form Validation","Handling Form Submit","Resetting Forms","Building a Reusable Form"],intro:"نتعلم التعامل مع النماذج في Vue — من v-model البسيط إلى بناء custom inputs مع validation كامل.",introEn:"Learn forms in Vue — from basic v-model to building custom inputs with full validation.",content:[{type:"heading",text:"نظرة عامة — النماذج في Vue"},{type:"paragraph",text:"Vue يُبسّط التعامل مع النماذج عبر v-model الذي يربط حقول الإدخال ببيانات الـ component ثنائياً."},{type:"heading",text:"أنواع حقول الإدخال"},{type:"code",code:`<script setup>
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
})
<\/script>

<template>
  <!-- Text -->
  <input v-model="form.name" type="text" placeholder="الاسم" />

  <!-- Email -->
  <input v-model.trim="form.email" type="email" />

  <!-- Number -->
  <input v-model.number="form.age" type="number" />

  <!-- Checkbox واحد -->
  <input type="checkbox" v-model="form.agree" id="agree" />
  <label for="agree">أوافق على الشروط</label>

  <!-- Checkboxes متعددة -->
  <input type="checkbox" v-model="form.hobbies" value="reading" />
  <input type="checkbox" v-model="form.hobbies" value="coding" />

  <!-- Radio -->
  <input type="radio" v-model="form.gender" value="male" />
  <input type="radio" v-model="form.gender" value="female" />

  <!-- Select -->
  <select v-model="form.country">
    <option value="">اختر الدولة</option>
    <option value="sa">السعودية</option>
    <option value="eg">مصر</option>
  </select>
</template>`},{type:"heading",text:"Custom Input بـ defineModel"},{type:"code",code:`<!-- AppInput.vue -->
<script setup>
const model = defineModel({ type: String })

defineProps({
  label: String,
  error: String,
})
<\/script>

<template>
  <div class="form-group">
    <label v-if="label">{{ label }}</label>
    <input
      :value="model"
      @input="model = $event.target.value"
      :class="{ 'input--error': error }"
    />
    <span v-if="error" class="error-msg">{{ error }}</span>
  </div>
</template>

<!-- App.vue -->
<template>
  <AppInput v-model="form.name" label="الاسم" :error="errors.name" />
</template>`},{type:"heading",text:"التحقق من المدخلات (Validation)"},{type:"code",code:`<script setup>
import { reactive, computed } from 'vue'

const form = reactive({ name: '', email: '', password: '' })
const errors = reactive({})

function validate() {
  errors.name = form.name.length < 2 ? 'الاسم قصير جداً' : ''
  errors.email = !/^[^@]+@[^@]+$/.test(form.email) ? 'البريد غير صالح' : ''
  errors.password = form.password.length < 6 ? 'كلمة المرور ضعيفة' : ''
  return !Object.values(errors).some(Boolean)
}

const isValid = computed(() => Object.values(errors).every((e) => !e))

async function onSubmit() {
  if (!validate()) return
  // إرسال البيانات...
}
<\/script>

<template>
  <form @submit.prevent="onSubmit">
    <input v-model="form.name" />
    <span>{{ errors.name }}</span>
    <button type="submit" :disabled="!isValid">إرسال</button>
  </form>
</template>`},{type:"tip",text:"لمشاريع أكبر، فكّر في استخدام مكتبات مثل VeeValidate أو Zod للتحقق من المدخلات بشكل أكثر قوة."},{type:"heading",text:"إعادة تعيين النموذج"},{type:"code",code:`const initialState = { name: '', email: '', agree: false }
const form = reactive({ ...initialState })

function reset() {
  Object.assign(form, initialState)
}`},{type:"heading",text:"✅ مراجعة"},{type:"qa",question:"ما هو الفرق بين v-model.number وv-model.trim؟",answer:"v-model.number يحوّل قيمة الحقل إلى رقم تلقائياً. v-model.trim يزيل المسافات من بداية ونهاية النص تلقائياً."},{type:"qa",question:"لماذا نستخدم defineModel في Custom Input Components؟",answer:"defineModel يُبسّط التوافق مع v-model في الـ parent، بدلاً من الكتابة اليدوية لـ prop modelValue وemit update:modelValue."}],contentEn:[{type:"heading",text:"Form Inputs with v-model"},{type:"code",code:`<script setup>
import { reactive } from 'vue'
const form = reactive({ name: '', email: '', agree: false, hobbies: [] })
<\/script>

<template>
  <input v-model.trim="form.name" placeholder="Name" />
  <input v-model="form.email" type="email" />
  <input type="checkbox" v-model="form.agree" />
  <input type="checkbox" v-model="form.hobbies" value="coding" />
  <select v-model="form.country">
    <option value="us">United States</option>
  </select>
</template>`},{type:"heading",text:"Form Validation"},{type:"code",code:`function validate() {
  errors.name = form.name.length < 2 ? 'Name too short' : ''
  errors.email = !/^[^@]+@[^@]+$/.test(form.email) ? 'Invalid email' : ''
  return !Object.values(errors).some(Boolean)
}`},{type:"heading",text:"✅ Review"},{type:"qa",question:"What is the difference between v-model.number and v-model.trim?",answer:"v-model.number automatically converts the input value to a number. v-model.trim automatically strips leading/trailing whitespace."}]};export{e as default};
