const e={id:6,title:"أساسيات الـ Reactivity",titleEn:"Reactivity Fundamentals",level:"مبتدئ",levelEn:"Beginner",lessons:["ما هي الـ Reactivity ولماذا تحتاجها؟","ref — للقيم البسيطة والمركّبة","قراءة وتحديث الـ Refs","reactive — للكائنات والمصفوفات","ref مقابل reactive — التوصية الرسمية","toRef وtoRefs","shallowRef وshallowReactive","الـ Computed Properties","Writable Computed","watch — مراقبة صريحة","watchEffect — مراقبة تلقائية","onWatcherCleanup (Vue 3.5)","أخطاء الـ Reactivity الشائعة"],lessonsEn:["What is Reactivity and Why?","ref — for primitives and complex values","Reading & Updating Refs","reactive — for objects & arrays","ref vs reactive — Official Recommendation","toRef & toRefs","shallowRef & shallowReactive","Computed Properties","Writable Computed","watch — Explicit Watching","watchEffect — Automatic Tracking","onWatcherCleanup (Vue 3.5)","Common Reactivity Mistakes"],intro:"نظام الـ Reactivity هو قلب Vue — يعتمد على JavaScript Proxy تحت الغطاء. نتعلم ref وreactive وcomputed وwatch لبناء واجهات تتحدث تلقائياً.",introEn:"Vue's reactivity system is its heart — built on JavaScript Proxy under the hood. Learn ref, reactive, computed, and watch to build UIs that update automatically.",content:[{type:"heading",text:"ما هي الـ Reactivity؟"},{type:"paragraph",text:"الـ Reactivity تعني أن Vue يراقب البيانات، فإذا تغيّرت يُحدّث الـ Template تلقائياً بدون أن تتدخل أنت. Vue 3 يستخدم JavaScript Proxy تحت الغطاء لتتبع القراءة والكتابة."},{type:"heading",text:"ref — للقيم البسيطة"},{type:"code",code:`<script setup>
import { ref } from 'vue'

const count = ref(0)       // رقم
const name = ref('Vue')    // نص
const isOpen = ref(false)  // boolean
const list = ref([1, 2, 3]) // مصفوفة

// القراءة والتحديث داخل script تحتاج .value
console.log(count.value)  // 0
count.value++              // تحديث — يُحرّك الـ UI
count.value = 10           // تعيين مباشر

// في الـ Template لا تحتاج .value — Vue يُطبّق unwrapping
<\/script>

<template>
  <p>{{ count }}</p>
  <button @click="count++">+1</button>
</template>`},{type:"warning",text:"لا تنسَ .value عند التعامل مع ref داخل <script setup>. في الـ Template Vue يضيفها تلقائياً. هذا أكثر خطأ شائع للمبتدئين."},{type:"heading",text:"reactive — للكائنات والمصفوفات"},{type:"code",code:`<script setup>
import { reactive } from 'vue'

const user = reactive({
  name: 'مصطفى',
  age: 30,
  skills: ['Vue', 'JavaScript']
})

// التحديث مباشر بدون .value
user.name = 'أحمد'
user.age++
user.skills.push('TypeScript')

// إضافة خاصية جديدة — تعمل مع reactive
user.email = 'ahmed@example.com'
<\/script>

<template>
  <p>{{ user.name }} — {{ user.age }}</p>
  <li v-for="s in user.skills" :key="s">{{ s }}</li>
</template>`},{type:"heading",text:"ref مقابل reactive — التوصية الرسمية"},{type:"list",items:["ref: لقيم بسيطة (string, number, boolean) أو لـ arrays وobjects تريد إعادة تعيينها بالكامل","reactive: لكائنات معقدة لا تحتاج إعادة تعيين كاملة","التوجيه الرسمي: استخدم ref دائماً — أبسط وأكثر اتساقاً في الكود","لا تُفكّك (destructure) reactive مباشرة — تفقد الـ reactivity"]},{type:"code",code:`// ❌ خطأ — تفقد reactivity عند التفكيك
const { name } = reactive({ name: 'Vue' })

// ✅ صحيح — استخدم toRefs للتفكيك الآمن
import { reactive, toRefs } from 'vue'
const state = reactive({ name: 'Vue', age: 10 })
const { name, age } = toRefs(state)
// الآن name وage هما refs تحافظ على الـ reactivity`},{type:"heading",text:"الـ Computed Properties"},{type:"code",code:`<script setup>
import { ref, computed } from 'vue'

const firstName = ref('مصطفى')
const lastName = ref('سقلى')

// computed تُحسب مرة وتُخزن مؤقتاً حتى تتغير المدخلات
const fullName = computed(() => firstName.value + ' ' + lastName.value)

const items = ref([1, 2, 3, 4, 5])
const evenItems = computed(() => items.value.filter(n => n % 2 === 0))
const total = computed(() => items.value.reduce((s, n) => s + n, 0))

// Writable computed
const count = ref(0)
const double = computed({
  get: () => count.value * 2,
  set: (val) => { count.value = val / 2 }
})
// double.value = 10 → count.value = 5
<\/script>`},{type:"tip",text:"computed يُخزّن النتيجة مؤقتاً (cache) — لا يُعيد الحساب إلا إذا تغيّرت المدخلات. Method عادية تُنفَّذ في كل رسم. استخدم computed للاشتقاقات المبنية على بيانات reactive."},{type:"heading",text:"watch — مراقبة صريحة"},{type:"code",code:`<script setup>
import { ref, watch } from 'vue'

const query = ref('')
const results = ref([])

// مراقبة ref واحدة
watch(query, async (newVal, oldVal) => {
  if (newVal.length < 2) { results.value = []; return }
  results.value = await searchAPI(newVal)
})

// مراقبة عدة مصادر
const a = ref(1), b = ref(2)
watch([a, b], ([newA, newB], [oldA, oldB]) => {
  console.log('تغيّر a:', oldA, '→', newA)
})

// immediate: يُنفَّذ مباشرة عند التسجيل
watch(query, (val) => { /* ... */ }, { immediate: true })

// deep: مراقبة التغييرات العميقة في الكائنات
const user = ref({ name: 'Vue', nested: { x: 1 } })
watch(user, (newVal) => { /* ... */ }, { deep: true })
<\/script>`},{type:"heading",text:"watchEffect — مراقبة تلقائية"},{type:"code",code:`<script setup>
import { ref, watchEffect } from 'vue'

const id = ref(1)

// يُنفَّذ فوراً ويتتبع كل reactive dependency تستخدمها
watchEffect(async () => {
  const data = await fetch('/api/users/' + id.value)
  // يُعاد التنفيذ كلما تغيّرت id.value تلقائياً
})

// إيقاف watch يدوياً
const stop = watchEffect(() => { /* ... */ })
stop() // إيقاف
<\/script>`},{type:"heading",text:"onWatcherCleanup (Vue 3.5)"},{type:"code",code:`import { ref, watch, onWatcherCleanup } from 'vue'

const id = ref(1)

watch(id, (newId) => {
  const controller = new AbortController()

  onWatcherCleanup(() => {
    controller.abort() // يُلغي الطلب القديم قبل تنفيذ الـ watcher مجدداً
  })

  fetch('/api/users/' + newId, { signal: controller.signal })
    .then(r => r.json())
    .then(data => console.log(data))
})`},{type:"tip",text:"onWatcherCleanup (Vue 3.5) يحل مشكلة race conditions في الـ watchers — إذا تغير id قبل اكتمال الطلب الأول، يُلغيه تلقائياً ويبدأ طلباً جديداً."},{type:"heading",text:"✅ مراجعة"},{type:"qa",question:"لماذا تحتاج .value مع ref داخل script لكن ليس في template؟",answer:"Vue يُغلّف القيمة داخل كائن ref لجعلها reactive. في الـ template، Vue يُطبّق unwrapping تلقائياً بفضل الـ compiler. في الـ script تتعامل مع الكائن مباشرة لذا تحتاج .value."},{type:"qa",question:"ما الفرق بين watch وwatchEffect؟",answer:"watch تستمع لمصادر محددة تصرّح بها وتحصل على القيم القديمة والجديدة. watchEffect تتتبع كل reactive dependency تستخدمها تلقائياً وتُنفَّذ فوراً. استخدم watch عندما تحتاج الـ old value أو تريد تحكماً أدق."},{type:"qa",question:"ما الفرق بين computed وmethod في Vue؟",answer:"computed تُخزّن النتيجة مؤقتاً — لا تُعاد معالجتها إلا إذا تغيّرت المدخلات الـ reactive. method تُنفَّذ من جديد في كل إعادة رسم للـ template. للاشتقاقات المعقدة، computed أكثر كفاءة."},{type:"qa",question:"لماذا لا تُفكّك reactive مباشرة؟",answer:"reactive يُعيد Proxy يتتبع الوصول لخصائص الكائن. عند التفكيك (destructuring)، الخصائص تُنسخ كقيم عادية وتفقد الاتصال بالـ Proxy — لا reactivity. الحل: استخدم toRefs لتحويل كل خاصية إلى ref قبل التفكيك."}],contentEn:[{type:"heading",text:"ref — for Reactive Values"},{type:"code",code:`<script setup>
import { ref } from 'vue'
const count = ref(0)
// In script, always use .value
count.value++
// In template, Vue unwraps automatically
<\/script>

<template>
  <p>{{ count }}</p>
  <button @click="count++">+1</button>
</template>`},{type:"warning",text:"Don't forget .value when working with refs inside <script setup>. In the template, Vue adds it automatically."},{type:"heading",text:"reactive — for Objects"},{type:"code",code:`<script setup>
import { reactive, toRefs } from 'vue'
const user = reactive({ name: 'Mostafa', age: 30, skills: ['Vue'] })
// Update directly — no .value needed
user.name = 'Ahmed'
user.skills.push('TypeScript')

// Safe destructure with toRefs
const { name, age } = toRefs(user)
<\/script>`},{type:"heading",text:"Computed Properties"},{type:"code",code:`<script setup>
import { ref, computed } from 'vue'
const firstName = ref('Mostafa')
const lastName = ref('Saqly')

// cached — only recomputes when inputs change
const fullName = computed(() => firstName.value + ' ' + lastName.value)

// Writable computed
const count = ref(0)
const double = computed({
  get: () => count.value * 2,
  set: (val) => { count.value = val / 2 }
})
<\/script>`},{type:"tip",text:"computed caches its result and only recomputes when its reactive dependencies change — unlike a plain method which re-runs on every render."},{type:"heading",text:"watch vs watchEffect"},{type:"code",code:`// watch — explicit sources, old + new values available
watch(query, (newVal, oldVal) => {
  console.log(oldVal, '→', newVal)
}, { immediate: true })

// watchEffect — auto-tracks, runs immediately
watchEffect(() => {
  console.log('id changed to', id.value)
  // id.value is tracked automatically
})`},{type:"heading",text:"onWatcherCleanup (Vue 3.5)"},{type:"code",code:`import { ref, watch, onWatcherCleanup } from 'vue'

const id = ref(1)

watch(id, (newId) => {
  const controller = new AbortController()
  onWatcherCleanup(() => controller.abort()) // cancel previous request
  fetch('/api/users/' + newId, { signal: controller.signal })
})`},{type:"heading",text:"✅ Review"},{type:"qa",question:"Why do you need .value with ref inside script but not in template?",answer:"Vue wraps the value in a ref object to make it reactive. The compiler auto-unwraps refs in templates. In script you work with the object directly, so .value is required."},{type:"qa",question:"What is the difference between watch and watchEffect?",answer:"watch listens to explicitly declared sources and gives you old and new values. watchEffect auto-tracks every reactive dependency it reads and runs immediately. Use watch when you need the old value or finer control."},{type:"qa",question:"What is the difference between computed and a method?",answer:"computed caches its result — it only recomputes when reactive dependencies change. A method re-runs on every render. For derived values based on reactive data, computed is more efficient."}]};export{e as default};
