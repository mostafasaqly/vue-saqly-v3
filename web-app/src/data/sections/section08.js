export default {
  id: 8,
  title: "الـ Slots والـ Components القابلة لإعادة الاستخدام",
  titleEn: "Slots & Reusable Components",
  level: "متوسط",
  levelEn: "Intermediate",
  lessons: [
    "ما هي الـ Slots؟",
    "Default Slot",
    "Named Slots",
    "Slot Fallback Content",
    "Scoped Slots",
    "بناء BaseCard Component",
    "بناء BaseModal مع Teleport",
    "بناء DataList بـ Scoped Slot",
    "بناء BaseButton Component",
    "أفضل ممارسات تصميم الـ Components",
  ],
  lessonsEn: [
    "What are Slots?",
    "Default Slot",
    "Named Slots",
    "Slot Fallback Content",
    "Scoped Slots",
    "Building a BaseCard Component",
    "Building a BaseModal with Teleport",
    "Building a DataList with Scoped Slot",
    "Building a BaseButton Component",
    "Component Design Best Practices",
  ],
  intro: "الـ Slots تجعل Components مرنة وقابلة للتخصيص — نتعلم كيف نبني مكتبة components قابلة لإعادة الاستخدام بكل أنواع الـ Slots.",
  introEn: "Slots make components flexible and customizable — learn how to build a reusable component library with all slot types.",
  content: [
    { type: "heading", text: "ما هي الـ Slots؟" },
    { type: "paragraph", text: "الـ Slots تسمح للـ parent بتمرير محتوى HTML أو components أخرى داخل الـ child component — مثل 'ثغرات' في التصميم تملؤها حسب الحاجة. بدون Slots ستكون components كالصناديق المغلقة." },
    { type: "heading", text: "Default Slot" },
    { type: "code", code: `<!-- BaseCard.vue -->
<script setup>
defineProps({
  shadow: { type: Boolean, default: true },
  rounded: { type: Boolean, default: true },
})
</script>

<template>
  <div :class="['card', { 'card--shadow': shadow, 'card--rounded': rounded }]">
    <slot /> <!-- المحتوى يأتي من الـ parent هنا -->
  </div>
</template>

<style scoped>
.card { padding: 1.5rem; background: white; }
.card--shadow { box-shadow: 0 2px 8px rgba(0,0,0,.1); }
.card--rounded { border-radius: 12px; }
</style>` },
    { type: "code", code: `<!-- App.vue -->
<template>
  <BaseCard>
    <h2>مصطفى سقلى</h2>
    <p>مطور Vue 3</p>
  </BaseCard>

  <!-- محتوى افتراضي يظهر عند عدم تمرير slot -->
  <BaseCard>
    <!-- لم يُمرَّر محتوى — يظهر المحتوى الافتراضي -->
  </BaseCard>
</template>` },
    { type: "heading", text: "Named Slots — فتحات مُسمَّاة" },
    { type: "code", code: `<!-- AppLayout.vue -->
<template>
  <div class="layout">
    <header class="layout__header">
      <slot name="header">
        <!-- محتوى افتراضي إذا لم يُمرَّر #header -->
        <h1>عنوان الموقع</h1>
      </slot>
    </header>

    <nav class="layout__nav">
      <slot name="nav" />
    </nav>

    <main class="layout__main">
      <slot /> <!-- default slot -->
    </main>

    <footer class="layout__footer">
      <slot name="footer">
        <p>© 2025</p>
      </slot>
    </footer>
  </div>
</template>` },
    { type: "code", code: `<!-- App.vue — استخدام Named Slots -->
<template>
  <AppLayout>
    <template #header>
      <h1>تطبيقي الجميل</h1>
      <span>مرحباً، مصطفى</span>
    </template>

    <template #nav>
      <RouterLink to="/">الرئيسية</RouterLink>
      <RouterLink to="/about">عنا</RouterLink>
    </template>

    <!-- default slot — بدون #name -->
    <router-view />

    <!-- #footer يُستخدم footer المخصص، وإلا يظهر الافتراضي -->
  </AppLayout>
</template>` },
    { type: "heading", text: "Scoped Slots — البيانات من الـ Child" },
    { type: "code", code: `<!-- DataList.vue -->
<script setup>
defineProps({
  items: { type: Array, required: true },
  keyField: { type: String, default: 'id' },
})
</script>

<template>
  <ul class="data-list">
    <li v-for="item in items" :key="item[keyField]" class="data-list__item">
      <!-- نُمرّر item وindex للـ parent عبر scoped slot -->
      <slot :item="item" :index="items.indexOf(item)" />
    </li>
  </ul>
</template>` },
    { type: "code", code: `<!-- App.vue — استخدام Scoped Slot -->
<script setup>
const products = [
  { id: 1, name: 'كرسي', price: 250, inStock: true },
  { id: 2, name: 'طاولة', price: 890, inStock: false },
]
</script>

<template>
  <DataList :items="products" v-slot="{ item, index }">
    <span>{{ index + 1 }}. {{ item.name }}</span>
    <span>{{ item.price }} ر.س</span>
    <span v-if="!item.inStock" class="badge--sold-out">نفدت</span>
  </DataList>
</template>` },
    { type: "heading", text: "BaseModal مع Teleport" },
    { type: "code", code: `<!-- BaseModal.vue -->
<script setup>
const model = defineModel({ type: Boolean, default: false })

defineProps({
  title: String,
  size: { type: String, default: 'md' },
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="model" class="modal-overlay" @click.self="model = false">
        <div :class="['modal', 'modal--' + size]">
          <header class="modal__header">
            <slot name="header">
              <h2>{{ title }}</h2>
            </slot>
            <button class="modal__close" @click="model = false">✕</button>
          </header>

          <div class="modal__body">
            <slot />
          </div>

          <footer class="modal__footer">
            <slot name="footer">
              <button @click="model = false">إغلاق</button>
            </slot>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal { background: white; border-radius: 12px; padding: 1.5rem; min-width: 320px; }
.modal--sm { max-width: 400px; }
.modal--md { max-width: 600px; }
.modal--lg { max-width: 900px; }
.modal-enter-active, .modal-leave-active { transition: opacity .2s; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>` },
    { type: "code", code: `<!-- App.vue -->
<script setup>
import { ref } from 'vue'
const showConfirm = ref(false)
</script>

<template>
  <button @click="showConfirm = true">حذف العنصر</button>

  <BaseModal v-model="showConfirm" title="تأكيد الحذف">
    <p>هل أنت متأكد من حذف هذا العنصر؟</p>

    <template #footer>
      <button @click="showConfirm = false">إلغاء</button>
      <button @click="confirmDelete">حذف</button>
    </template>
  </BaseModal>
</template>` },
    { type: "tip", text: "Teleport ينقل الـ Modal إلى body مباشرة — يحل مشاكل z-index وoverflow: hidden الموروثة من الـ parent elements." },
    { type: "heading", text: "✅ مراجعة" },
    { type: "qa", question: "ما الفرق بين Default Slot وNamed Slot؟", answer: "Default slot هو فتحة واحدة غير مُسمّاة — المحتوى بين tags الـ component يذهب إليها. Named slots تتيح عدة فتحات مُسمّاة (<slot name=\"header\">) في نفس الـ component، مما يمنح قدرة تخصيص أكبر." },
    { type: "qa", question: "ما هي Scoped Slots ومتى تستخدمها؟", answer: "Scoped slots تُمكّن الـ child من تمرير بياناته للـ parent عبر الـ slot (<slot :item=\"item\">). تستخدمها عندما تحتاج الـ parent أن تتحكم في كيفية عرض بيانات الـ child — مثال: DataTable component يُمرّر data لكن يترك للـ parent تحديد كيف تُعرض كل خلية." },
    { type: "qa", question: "لماذا نستخدم Teleport مع المودال؟", answer: "المودال يحتاج z-index عالياً ولا يتأثر بـ overflow: hidden. إذا كان داخل parent element فيه overflow: hidden أو z-index منخفض، سيُقطع أو يختفي. Teleport يُحرّكه لـ body مباشرة بحيث يكون فوق كل شيء." },
    { type: "qa", question: "ما هو Slot Fallback Content وكيف يعمل؟", answer: "هو المحتوى الموجود داخل <slot>...</slot> في الـ child component. يظهر فقط إذا لم يُمرّر الـ parent أي محتوى لذلك الـ slot. مثال: <slot>لا يوجد محتوى</slot> — 'لا يوجد محتوى' يظهر عند الاستخدام بدون slot content." },
  ],
  contentEn: [
    { type: "heading", text: "Default Slot" },
    { type: "code", code: `<!-- BaseCard.vue -->
<template>
  <div class="card">
    <slot />
  </div>
</template>

<!-- Usage -->
<BaseCard>
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</BaseCard>` },
    { type: "heading", text: "Named Slots" },
    { type: "code", code: `<!-- AppLayout.vue -->
<template>
  <header><slot name="header"><h1>Default Title</h1></slot></header>
  <main><slot /></main>
  <footer><slot name="footer"><p>© 2025</p></slot></footer>
</template>

<!-- Usage -->
<AppLayout>
  <template #header><h1>My Header</h1></template>
  <router-view />
  <!-- footer uses default fallback content -->
</AppLayout>` },
    { type: "heading", text: "Scoped Slots" },
    { type: "code", code: `<!-- DataList.vue -->
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <slot :item="item" :index="items.indexOf(item)" />
    </li>
  </ul>
</template>

<!-- Parent controls rendering -->
<DataList :items="products" v-slot="{ item, index }">
  <span>{{ index + 1 }}. {{ item.name }}</span>
  <span>{{ item.price }}</span>
</DataList>` },
    { type: "heading", text: "BaseModal with Teleport" },
    { type: "code", code: `<!-- BaseModal.vue -->
<script setup>
const model = defineModel({ type: Boolean })
</script>

<template>
  <Teleport to="body">
    <div v-if="model" class="modal-overlay" @click.self="model = false">
      <div class="modal">
        <slot name="header"><h2>Modal Title</h2></slot>
        <slot />
        <slot name="footer">
          <button @click="model = false">Close</button>
        </slot>
      </div>
    </div>
  </Teleport>
</template>` },
    { type: "tip", text: "Teleport moves the modal to body directly — this solves z-index and overflow:hidden inheritance problems from parent elements." },
    { type: "heading", text: "✅ Review" },
    { type: "qa", question: "What is the difference between Default and Named Slots?", answer: "Default slot is a single unnamed slot — content between the component tags goes there. Named slots allow multiple named openings (<slot name=\"header\">) in the same component for richer customization." },
    { type: "qa", question: "What are Scoped Slots and when do you use them?", answer: "Scoped slots let the child pass its data back through the slot (<slot :item=\"item\">). Use them when the parent needs to control how the child's data is rendered — e.g. a DataTable that passes row data but lets the parent decide how each cell looks." },
  ],
};
