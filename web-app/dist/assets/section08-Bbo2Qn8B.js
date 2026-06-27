const e={id:8,title:"الـ Slots والـ Components القابلة لإعادة الاستخدام",titleEn:"Slots & Reusable Components",level:"متوسط",levelEn:"Intermediate",lessons:["ما هي الـ Slots؟","الـ Default Slot","الـ Named Slots","الـ Scoped Slots","بناء Card Component","بناء Modal Component","بناء Button Component","أفضل ممارسات تصميم الـ Components"],lessonsEn:["What are Slots?","Default Slots","Named Slots","Scoped Slots","Building a Card Component","Building a Modal Component","Building a Button Component","Component Design Best Practices"],intro:"الـ Slots تجعل Components مرنة وقابلة للتخصيص — نتعلم كيف نبني مكتبة components قابلة لإعادة الاستخدام.",introEn:"Slots make components flexible and customizable — learn how to build a library of reusable components.",content:[{type:"heading",text:"ما هي الـ Slots؟"},{type:"paragraph",text:"الـ Slots تسمح للـ parent بتمرير محتوى HTML أو components أخرى داخل الـ child component — مثل 'ثغرات' في التصميم تملؤها."},{type:"heading",text:"Default Slot"},{type:"code",code:`<!-- Card.vue -->
<template>
  <div class="card">
    <slot /> <!-- المحتوى يأتي من الـ parent هنا -->
  </div>
</template>

<!-- App.vue -->
<template>
  <Card>
    <h2>عنوان البطاقة</h2>
    <p>هذا المحتوى سيظهر داخل Card</p>
  </Card>
</template>`},{type:"heading",text:"Named Slots — فتحات مُسمَّاة"},{type:"code",code:`<!-- Layout.vue -->
<template>
  <div class="layout">
    <header>
      <slot name="header">
        <!-- محتوى افتراضي -->
        <h1>العنوان الافتراضي</h1>
      </slot>
    </header>
    <main>
      <slot /> <!-- default slot -->
    </main>
    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>

<!-- App.vue -->
<template>
  <Layout>
    <template #header>
      <h1>عنواني المخصص</h1>
    </template>

    <p>المحتوى الرئيسي</p>

    <template #footer>
      <p>© 2025</p>
    </template>
  </Layout>
</template>`},{type:"heading",text:"Scoped Slots — البيانات من الـ Child"},{type:"code",code:`<!-- List.vue -->
<script setup>
defineProps({ items: Array })
<\/script>

<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <!-- نُمرّر item للـ parent عبر slot -->
      <slot :item="item" :index="index" />
    </li>
  </ul>
</template>

<!-- App.vue -->
<template>
  <List :items="products" v-slot="{ item }">
    <span>{{ item.name }} — {{ item.price }} ر.س</span>
  </List>
</template>`},{type:"heading",text:"بناء BaseButton Component"},{type:"code",code:`<!-- BaseButton.vue -->
<script setup>
defineProps({
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'md' },
  disabled: Boolean,
})
defineEmits(['click'])
<\/script>

<template>
  <button
    :class="['btn', \`btn--\${variant}\`, \`btn--\${size}\`]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>`},{type:"heading",text:"بناء BaseModal Component"},{type:"code",code:`<!-- BaseModal.vue -->
<script setup>
const model = defineModel({ type: Boolean })
<\/script>

<template>
  <Teleport to="body">
    <div v-if="model" class="modal-overlay" @click.self="model = false">
      <div class="modal">
        <slot name="header" />
        <slot />
        <slot name="footer">
          <button @click="model = false">إغلاق</button>
        </slot>
      </div>
    </div>
  </Teleport>
</template>

<!-- App.vue -->
<template>
  <BaseModal v-model="showModal">
    <template #header><h2>عنوان النافذة</h2></template>
    <p>محتوى النافذة</p>
  </BaseModal>
</template>`},{type:"tip",text:"استخدم Teleport لنقل الـ Modal إلى body مباشرة — يحل مشاكل z-index وoverflow."},{type:"heading",text:"✅ مراجعة"},{type:"qa",question:"ما الفرق بين Default Slot وNamed Slot؟",answer:"Default slot هو فتحة واحدة غير مُسمّاة. Named slots تتيح عدة فتحات مُسمّاة في نفس الـ component، مما يمنح قدرة تخصيص أكبر."},{type:"qa",question:"ما هي Scoped Slots ومتى تستخدمها؟",answer:"Scoped slots تُمكّن الـ child من تمرير بياناته للـ parent عبر الـ slot. تستخدمها عندما تحتاج الـ parent أن تتحكم في كيفية عرض بيانات الـ child."}],contentEn:[{type:"heading",text:"Default Slot"},{type:"code",code:`<!-- Card.vue -->
<template>
  <div class="card"><slot /></div>
</template>

<!-- Usage -->
<Card>
  <h2>Title</h2>
  <p>Content goes here</p>
</Card>`},{type:"heading",text:"Named Slots"},{type:"code",code:`<!-- Layout.vue -->
<template>
  <header><slot name="header" /></header>
  <main><slot /></main>
  <footer><slot name="footer" /></footer>
</template>

<!-- Usage -->
<Layout>
  <template #header><h1>My Header</h1></template>
  <p>Main content</p>
  <template #footer><p>Footer</p></template>
</Layout>`},{type:"heading",text:"Scoped Slots"},{type:"code",code:`<!-- List.vue -->
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <slot :item="item" />
    </li>
  </ul>
</template>

<!-- Usage -->
<List :items="products" v-slot="{ item }">
  {{ item.name }} — {{ item.price }}
</List>`},{type:"heading",text:"✅ Review"},{type:"qa",question:"What are Scoped Slots and when do you use them?",answer:"Scoped slots let the child pass its data back up to the parent through the slot. Use them when the parent needs to control how the child's data is rendered."}]};export{e as default};
