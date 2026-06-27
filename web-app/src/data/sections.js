// sections.js — metadata للـ sidebar فقط (بدون content)
export const sections = [
  { id: 1,  title: "مقدمة الكورس",                           titleEn: "Course Introduction" },
  { id: 2,  title: "إعداد بيئة التطوير",                      titleEn: "Development Environment Setup" },
  { id: 3,  title: "أساسيات Vue",                            titleEn: "Vue Fundamentals" },
  { id: 4,  title: "قوالب الـ Template والـ Binding",          titleEn: "Template Syntax & Binding" },
  { id: 5,  title: "الـ Directives",                          titleEn: "Directives" },
  { id: 6,  title: "أساسيات الـ Reactivity",                  titleEn: "Reactivity Fundamentals" },
  { id: 7,  title: "الـ Components",                          titleEn: "Components" },
  { id: 8,  title: "الـ Slots والـ Components القابلة لإعادة الاستخدام", titleEn: "Slots & Reusable Components" },
  { id: 9,  title: "النماذج في Vue",                          titleEn: "Forms in Vue" },
  { id: 10, title: "Composition API",                         titleEn: "Composition API" },
  { id: 11, title: "دورة حياة الـ Component",                  titleEn: "Lifecycle Hooks" },
  { id: 12, title: "Routing بـ Vue Router",                   titleEn: "Routing with Vue Router" },
  { id: 13, title: "HTTP والـ APIs",                          titleEn: "HTTP & APIs" },
  { id: 14, title: "إدارة الـ State بـ Pinia",                 titleEn: "State Management with Pinia" },
  { id: 15, title: "TypeScript مع Vue",                       titleEn: "TypeScript with Vue" },
  { id: 16, title: "واجهة المستخدم والتنسيق",                  titleEn: "UI & Styling" },
  { id: 17, title: "الأداء وأفضل الممارسات",                  titleEn: "Performance & Best Practices" },
  { id: 18, title: "المشروع الأول: تطبيق إدارة المهام",         titleEn: "Project 1: Task Manager App" },
  { id: 19, title: "المشروع الثاني: لوحة عرض المنتجات",         titleEn: "Project 2: Products Dashboard" },
  { id: 20, title: "المشروع الثالث: تطبيق E-Commerce مصغّر",   titleEn: "Project 3: Mini E-Commerce App" },
  { id: 21, title: "أساسيات الاختبار",                        titleEn: "Testing Basics" },
  { id: 22, title: "النشر والـ Deployment",                   titleEn: "Deployment" },
  { id: 23, title: "المراجعة النهائية والخطوات القادمة",         titleEn: "Final Review & Next Steps" },
];

export function loadSection(id) {
  return import(`./sections/section${String(id).padStart(2, "0")}.js`).then((m) => m.default);
}
