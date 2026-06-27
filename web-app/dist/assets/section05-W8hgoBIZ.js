const e={id:5,title:"الـ Directives",titleEn:"Directives",level:"مبتدئ",levelEn:"Beginner",lessons:["ما هي الـ Directives؟","v-bind","v-on","v-model","v-if","v-else وv-else-if","v-show","v-for","v-pre وv-once وv-memo"],lessonsEn:["What are Directives?","v-bind","v-on","v-model","v-if","v-else & v-else-if","v-show","v-for","v-pre, v-once & v-memo"],intro:"الـ Directives هي سمات خاصة تبدأ بـ v- تمنح الـ Template قوى إضافية — من العرض الشرطي إلى قوائم ديناميكية.",introEn:"Directives are special attributes starting with v- that give the template extra powers — from conditional rendering to dynamic lists.",content:[{type:"heading",text:"ما هي الـ Directives؟"},{type:"paragraph",text:"الـ Directives هي تعليمات خاصة تضيفها في الـ Template وتبدأ بـ v-. Vue ينفّذها وقت رسم الـ DOM."},{type:"heading",text:"v-model — الربط الثنائي"},{type:"code",code:`<script setup>
import { ref } from 'vue'
const name = ref('')
const age = ref(0)
const agreed = ref(false)
<\/script>

<template>
  <input v-model="name" placeholder="الاسم" />
  <input v-model.number="age" type="number" />
  <input v-model.trim="name" />
  <input type="checkbox" v-model="agreed" />
  <p>{{ name }} — {{ age }} — {{ agreed }}</p>
</template>`},{type:"tip",text:"v-model له Modifiers مفيدة: .number (تحويل لرقم)، .trim (إزالة المسافات)، .lazy (تحديث عند blur بدلاً من كل ضغطة)."},{type:"heading",text:"v-if / v-else-if / v-else"},{type:"code",code:`<script setup>
import { ref } from 'vue'
const score = ref(75)
<\/script>

<template>
  <p v-if="score >= 90">ممتاز 🎉</p>
  <p v-else-if="score >= 70">جيد جداً ✅</p>
  <p v-else>يحتاج مراجعة ⚠️</p>
</template>`},{type:"heading",text:"v-show — الإخفاء بـ CSS"},{type:"code",code:`<!-- v-show يبقي العنصر في DOM ويستخدم display:none -->
<div v-show="isVisible">هذا النص يُخفى بـ CSS</div>

<!-- v-if يُزيل العنصر من DOM كلياً -->
<div v-if="isVisible">هذا النص يُزال من DOM</div>`},{type:"tip",text:"استخدم v-show إذا كنت تُبدّل الرؤية كثيراً (أداء أفضل). استخدم v-if إذا كان الشرط نادراً يتغير."},{type:"heading",text:"v-for — القوائم الديناميكية"},{type:"code",code:`<script setup>
import { ref } from 'vue'
const items = ref([
  { id: 1, name: 'Vue', emoji: '💚' },
  { id: 2, name: 'React', emoji: '⚛️' },
  { id: 3, name: 'Angular', emoji: '🅰️' },
])
<\/script>

<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.emoji }} {{ item.name }}
    </li>
  </ul>

  <!-- مع index -->
  <li v-for="(item, index) in items" :key="item.id">
    {{ index + 1 }}. {{ item.name }}
  </li>
</template>`},{type:"warning",text:"دائماً ضع :key مع v-for. Vue يستخدمها لتتبع العناصر بكفاءة. استخدم ID فريداً وليس index إذا كانت القائمة تتغير."},{type:"heading",text:"v-once وv-memo"},{type:"code",code:`<!-- v-once: يُعرض مرة واحدة ولا يتحدث -->
<h1 v-once>{{ title }}</h1>

<!-- v-memo: يُعيد الرسم فقط إذا تغيرت القيم المحددة -->
<div v-memo="[item.id, item.name]">...</div>`},{type:"heading",text:"✅ مراجعة"},{type:"qa",question:"ما الفرق بين v-if وv-show؟",answer:"v-if يُزيل ويضيف العنصر من DOM فعلياً — تكلفة أعلى عند التبديل المتكرر. v-show يُبقي العنصر ويستخدم display:none — أسرع للتبديل المتكرر."},{type:"qa",question:"لماذا يجب استخدام :key مع v-for؟",answer:"Vue يستخدم :key لتتبع العناصر في القائمة. بدونها قد تحدث أخطاء في ترتيب العناصر أو بياناتها عند التحديث."}],contentEn:[{type:"heading",text:"v-model — Two-Way Binding"},{type:"code",code:`<script setup>
import { ref } from 'vue'
const name = ref('')
const agreed = ref(false)
<\/script>

<template>
  <input v-model="name" placeholder="Name" />
  <input v-model.number="age" type="number" />
  <input type="checkbox" v-model="agreed" />
</template>`},{type:"heading",text:"v-if / v-else-if / v-else"},{type:"code",code:`<p v-if="score >= 90">Excellent!</p>
<p v-else-if="score >= 70">Good</p>
<p v-else>Needs work</p>`},{type:"heading",text:"v-for — Dynamic Lists"},{type:"code",code:`<ul>
  <li v-for="item in items" :key="item.id">
    {{ item.name }}
  </li>
</ul>`},{type:"warning",text:"Always add :key with v-for. Use a unique ID, not the index, when the list can change."},{type:"heading",text:"✅ Review"},{type:"qa",question:"What is the difference between v-if and v-show?",answer:"v-if removes/adds the element from DOM — higher cost for frequent toggling. v-show keeps the element and uses display:none — faster for frequent toggles."}]};export{e as default};
