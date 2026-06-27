# القسم 8: الـ Slots والمكونات القابلة لإعادة الاستخدام
# Section 8: Slots & Reusable Components

> **Vue 3 Course — 23 Sections** | القسم 8 من 23

## الدروس | Lessons

| # | بالعربية | In English |
|---|---------|------------|
| 1 | ما هي الـ Slots؟ | What are Slots? |
| 2 | Default Slot | Default Slot — Basic Content Projection |
| 3 | Named Slots | Named Slots — Multiple Content Areas |
| 4 | Scoped Slots | Scoped Slots — Data from Child to Parent |
| 5 | بناء BaseButton | Building a Reusable BaseButton |
| 6 | بناء BaseCard | Building a Reusable BaseCard |
| 7 | بناء BaseModal مع Teleport | Building BaseModal with Teleport |
| 8 | أفضل ممارسات | Best Practices for Reusable Components |

## المفاهيم الرئيسية | Key Concepts

- **`<slot />`** — يسمح للـ Parent بحقن محتوى داخل المكون / Allows the parent to inject content into the component.
- **`<slot name="x">`** — Named Slots تتيح مناطق متعددة للمحتوى / Named slots allow multiple content injection points.
- **`v-slot="{ item }"`** — Scoped Slots تُرسل بيانات من الـ Child للـ Parent / Scoped slots send data from child to parent.
- **`<slot>Default</slot>`** — محتوى افتراضي إذا لم يُقدَّم slot / Default content shown when no slot is provided.
- **Teleport** — ينقل المحتوى لمكان آخر في DOM مثل `<body>` / Moves content to another DOM location like `<body>`.

## أمثلة مرجعية | Code Reference

```vue
<!-- BaseCard.vue — Default + Named slots -->
<template>
  <div class="card">
    <header v-if="$slots.header">
      <slot name="header" />
    </header>
    <main class="card-body">
      <slot />  <!-- Default slot -->
    </main>
    <footer v-if="$slots.footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<!-- Usage in Parent -->
<BaseCard>
  <template #header>
    <h2>عنوان البطاقة</h2>
  </template>

  <p>محتوى البطاقة الرئيسي (default slot)</p>

  <template #footer>
    <button>حفظ</button>
  </template>
</BaseCard>
```

```vue
<!-- Scoped Slot Example -->
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <slot :item="item" :index="index" />
    </li>
  </ul>
</template>

<!-- Parent usage -->
<ItemList :items="products">
  <template v-slot="{ item, index }">
    <span>{{ index + 1 }}. {{ item.name }} — {{ item.price }} جنيه</span>
  </template>
</ItemList>
```

```vue
<!-- Teleport — BaseModal -->
<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay">
      <div class="modal">
        <slot />
      </div>
    </div>
  </Teleport>
</template>
```

## أسئلة المراجعة | Review Q&A

**س: ما الفرق بين Default Slot و Named Slot؟**
ج: Default Slot يقبل أي محتوى دون اسم. Named Slot يستخدم `<slot name="x">` ليسمح بمناطق متعددة للمحتوى في نفس المكون.

**Q: What is the difference between Default Slot and Named Slot?**
A: Default Slot accepts any un-named content. Named Slot uses `<slot name="x">` to allow multiple distinct content areas in the same component.

**س: ما هو Scoped Slot ومتى نستخدمه؟**
ج: Scoped Slot يسمح للـ Child بتمرير بيانات للـ Parent لتُستخدم في الـ slot. مفيد لبناء قوائم مرنة حيث المكون يوفر البيانات ولكن الـ Parent يتحكم في التصميم.

**Q: What is a Scoped Slot and when do we use it?**
A: A Scoped Slot allows the child to pass data to the parent to use in the slot. Useful for flexible list components where the component provides the data but the parent controls the rendering.

## مجلد الأمثلة | Examples Folder

راجع `examples/` للأكواد التشغيلية لكل درس.
See `examples/` for runnable code for each lesson.

---

**السابق | Prev:** Section 07 — الـ Components / Components  
**التالي | Next:** Section 09 — النماذج / Forms in Vue
